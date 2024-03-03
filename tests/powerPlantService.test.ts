import path from 'path';
import dotenv from 'dotenv';
import { powerPlantService } from '../src/services/powerPlantService';

dotenv.config();

describe('PowerPlantService', () => {
  beforeAll(async () => {
    const filePath = path.join(__dirname, '..', 'static', process.env.EXCEL_FILE_NAME);
    await powerPlantService.parsePowerPlantExcelData(filePath);
  });

  it('should correctly parse plant data from an Excel file', () => {
    expect(powerPlantService.plantsData.length).toBeGreaterThan(0);
    const hasValidStructure = powerPlantService.plantsData.every(
      (plant) => 'name' in plant && 'state' in plant && 'netGeneration' in plant
    );
    expect(hasValidStructure).toBeTruthy();
  });

  it('should correctly calculate state totals after parsing', () => {
    expect(powerPlantService.stateTotals.size).toBeGreaterThan(0);
    for (let [state, data] of powerPlantService.stateTotals) {
      expect(data.totalNetGeneration).toBeGreaterThan(0);
      expect(data.plants.length).toBeGreaterThan(0);
    }
  });

  it('should return the top N plants', () => {
    const topPlants = powerPlantService.getTopPlants(5);
    expect(topPlants.length).toBe(5);
  });

  it('should filter by state and calculate percentages correctly', () => {
    const state = 'CA';
    const topPlantsByState = powerPlantService.getTopPlants(5, state);
    expect(topPlantsByState.length).toBeLessThanOrEqual(5);
    topPlantsByState.forEach((plant) => {
      expect(plant).toHaveProperty('percentage');
    });
  });
});
