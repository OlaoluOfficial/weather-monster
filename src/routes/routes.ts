import { Router, Request, Response } from 'express';
import { createCity, updateCity, deleteCity } from '../controller/cities';
import temperatures from '../controller/temperatures';
import forecasts from '../controller/forecasts';
import { createWebhooks, deleteWebhook } from '../controller/webhooks';

const routes = (route: Router) => {
  route.get('/', (req: Request, res: Response) =>
    res.json({ message: 'Connected' })
  );
  route.post('/cities', createCity);
  route.patch('/cities/:id', updateCity);
  route.delete('/cities/:id', deleteCity);
  route.post('/temperatures', temperatures);
  route.get('/forecasts/:city_id', forecasts);
  route.post('/webhooks', createWebhooks);
  route.delete('/webhooks/:id', deleteWebhook);
};

export default routes;
