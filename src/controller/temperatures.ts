import { Request, Response } from 'express';
import { tempValidator } from '../utils/validator';
import expressAsyncHandler from 'express-async-handler';
import pool from '../db/connection';
import axios from 'axios';

const temperatures = expressAsyncHandler((req: Request, res: Response) => {
  const data = tempValidator.parse(req.body);
  const { city_id, max, min } = data;
  const timestamp = Date.now();

  const insertQuery = `INSERT into "Temperatures" (max, min, "city_id", "timestamp")
    values ('${max}', '${min}', '${city_id}', '${timestamp}')
  `;

  pool.query(insertQuery, async (err: any, result: any) => {
    if (!err) {
      const fetchWebhooks = `SELECT "callback_url" FROM "Webhooks" WHERE "city_id" = '${city_id}'`;

      pool.query(fetchWebhooks, async (err: any, result: any) => {
        if (!err) {
          const webhooks = result.rows;

          for (const webhook of webhooks) {
            const { callback_url } = webhook;

            axios
              .post(callback_url, { ...data, timestamp })
              .then(() => console.log('success'))
              .catch((err) => console.log('error occurred', err.message));
          }
        } else {
          console.log(err);
        }
      });

      res.status(201).json({ ...data, timestamp });
    } else {
      console.log(err);

      res.status(500).json({ msg: 'An error occurred.' });
    }
  });
});

export default temperatures;
