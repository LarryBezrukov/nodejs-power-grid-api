import { Router } from 'express';
import { getTopNPlants } from '../controllers/powerPlantController';

const powerPlantRouter = Router();

powerPlantRouter.get('/plants', getTopNPlants);
powerPlantRouter.get('/plants/state/:state', getTopNPlants);

export default powerPlantRouter;
