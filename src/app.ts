import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import powerPlantRouter from './routes/powerPlantRouter';
import { powerPlantService } from './services/powerPlantService';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  try {
    const filePath = path.join(__dirname, '..', 'static', process.env.EXCEL_FILE_NAME);
    await powerPlantService.parsePowerPlantExcelData(filePath);
    app.use('/api', powerPlantRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error during application initialization:', error);
  }
}

startServer();
