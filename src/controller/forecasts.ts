import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import pool from '../db/connection';

const forecasts = expressAsyncHandler( (req: Request, res: Response) => {
  const { city_id } = req.params;
    
      const selectQuery = `SELECT min, max FROM "Temperatures"
      WHERE "city_id" = '${city_id}';`;
    
      pool.query(selectQuery, async (err: any, result: any) => {
        if (!err) {
          const forecasts = result.rows;
          let avgMin = 0;
          let avgMax = 0;
          forecasts.forEach((element: any) => {
            avgMin += Number(element.min)
            avgMax += Number(element.max)
          });
          avgMin = avgMin / forecasts.length;
          avgMax = avgMax / forecasts.length;
          
          res.status(200).json({city_id, max: avgMax.toFixed(1), min: avgMin.toFixed(1), sample: forecasts.length});
        } else {
          res.status(500).json({ msg: 'An error occurred.' });
        }
      });

});

export default forecasts;
