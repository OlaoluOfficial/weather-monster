import { Request, Response } from 'express';
import { citiesValidator } from '../utils/validator';
import expressAsyncHandler from 'express-async-handler';
import pool from '../db/connection';

const createCity = expressAsyncHandler((req: Request, res: Response) => {
  const data = citiesValidator.parse(req.body);
  const { name, longitude, latitude } = data;

  const insertQuery = `INSERT into "Cities" (name, latitude, longitude)
  values ('${name}', '${latitude}', '${longitude}')
`;

  pool.query(insertQuery, async (err: any, result: any) => {
    if (!err) {
      res.status(201).json(data);
    } else {
      res.status(500).json({ msg: 'An error occurred.' });
    }
  });
});

const updateCity = expressAsyncHandler((req: Request, res: Response) => {
  const data = citiesValidator.parse(req.body);
  const { name, longitude, latitude } = data;
  const { id } = req.params;

  const updateQuery = `UPDATE "Cities" SET name='${name}', longitude='${longitude}', latitude='${latitude}' 
  WHERE id = '${id}';`;

  pool.query(updateQuery, async (err: any, result: any) => {
    if (!err) {
      res.status(200).json({ msg: 'City updated successfully.' });
    } else {
      res.status(500).json({ msg: 'An error occurred.' });
    }
  });
});

const deleteCity = expressAsyncHandler((req: Request, res: Response) => {
  const { id } = req.params;

  const deleteQuery = `DELETE FROM "Cities" WHERE id = '${id}';`;

  pool.query(deleteQuery, async (err: any, result: any) => {
    if (!err) {
      res.status(200).json({ msg: 'City deleted successfully.' });
    } else {
      res.status(500).json({ msg: 'An error occurred.' });
    }
  });
});

export { createCity, updateCity, deleteCity };
