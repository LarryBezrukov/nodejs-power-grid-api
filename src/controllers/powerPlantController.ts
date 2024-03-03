import { Request, Response } from 'express';
import { powerPlantService } from '../services/powerPlantService';

export function getTopNPlants(req: Request, res: Response) {
  try {
    const top = parseInt(req.query.top as string, 10) || undefined;
    const { state } = req.params;

    const plants = powerPlantService.getTopPlants(top, state);

    res.json(plants);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
