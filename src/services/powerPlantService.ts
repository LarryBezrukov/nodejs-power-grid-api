import ExcelJS from 'exceljs';
import { PlantData, StateTotal } from 'types/powerPlantTypes';

class PowerPlantService {
  plantsData: PlantData[] = [];
  stateTotals: Map<string, StateTotal> = new Map();

  /**
   * Parses the power plant Excel data file and initializes the plant data and state totals.
   * @param {string} filePath - The file path to the Excel file.
   */
  public async parsePowerPlantExcelData(filePath: string): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(2);

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber <= 2) return;

      const plantData: PlantData = {
        name: row.getCell('D').text,
        state: row.getCell('C').text,
        netGeneration: parseFloat(row.getCell('M').text.replace(/,/g, '')) || 0,
      };

      this.addPlantData(plantData);
    });

    this.sortData();
  }

  /**
   * Adds a plant's data to the service's state and recalculates state totals.
   * @param {PlantData} plantData - The data for the plant to be added.
   */
  private addPlantData(plantData: PlantData): void {
    this.plantsData.push(plantData);
    this.calculateStateTotals(plantData);
  }

  /**
   * Calculates the total net generation for a plant's state and updates the state's data.
   * @param {PlantData} plant - The plant data to be added to the state totals.
   */
  private calculateStateTotals(plant: PlantData): void {
    let stateData = this.stateTotals.get(plant.state);

    if (!stateData) {
      stateData = { totalNetGeneration: 0, plants: [] };
      this.stateTotals.set(plant.state, stateData);
    }

    stateData.totalNetGeneration += plant.netGeneration;
    stateData.plants.push(plant);
  }

  /**
   * Sorts the plants data by net generation in descending order.
   */
  private sortData(): void {
    this.plantsData.sort((a, b) => b.netGeneration - a.netGeneration);
    this.stateTotals.forEach((stateData) => {
      stateData.plants.sort((a, b) => b.netGeneration - a.netGeneration);
    });
  }

  /**
   * Retrieves the top N power plants, optionally filtered by a state.
   * @param {number} [top=plantsData.length] - The number of top plants to return.
   * @param {string} [state] - An optional state to filter the power plants by.
   * @returns {PlantData[]} An array of PlantData objects, each with an optional percentage property if filtered by state.
   */
  public getTopPlants(top: number = this.plantsData.length, state?: string): PlantData[] {
    if (state) {
      const stateData = this.stateTotals.get(state);
      if (!stateData) return [];

      return stateData.plants.slice(0, top).map((plant) => ({
        ...plant,
        percentage: ((plant.netGeneration / stateData.totalNetGeneration) * 100).toFixed(2) + '%',
      }));
    }

    return this.plantsData.slice(0, top);
  }
}

export const powerPlantService = new PowerPlantService();
