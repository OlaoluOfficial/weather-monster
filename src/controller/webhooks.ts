import { Request, Response } from 'express';
import { webhooksValidator } from '../utils/validator';
import expressAsyncHandler from 'express-async-handler';
import pool from '../db/connection';

const createWebhooks = expressAsyncHandler((req: Request, res: Response) => {
  const data = webhooksValidator.parse(req.body);
  const { city_id, callback_url } = data;

  const insertQuery = `INSERT into "Webhooks" ("city_id", "callback_url") 
  values ('${city_id}', '${callback_url}')
`;

  pool.query(insertQuery, async (err: any, result: any) => {
    if (!err) {
      res.status(201).json(data);
    } else {
      console.log(err);

      res.status(500).json({ msg: 'An error occurred.' });
    }
  });
});

const deleteWebhook = expressAsyncHandler((req: Request, res: Response) => {
  const { id } = req.params;

  const deleteQuery = `DELETE FROM "Webhooks" WHERE id = '${id}';`;

  pool.query(deleteQuery, async (err: any, result: any) => {
    if (!err) {
      res.status(200).json({ msg: 'Webhook deleted successfully.' });
    } else {
      res.status(500).json({ msg: 'An error occurred.' });
    }
  });
});

export { createWebhooks, deleteWebhook };
