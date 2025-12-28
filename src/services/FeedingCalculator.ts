import ResearchTables from '../assets/ResearchTables.json';

export interface FeedingPlan {
  totalDailyRationG: number;
  cyclesPerDay: number;
  gramsPerCycle: number;
  pelletSize: string;
  schedule: string[];
  warnings: string[];
  stage: string;
}

export interface CalculationInput {
  species: string;
  fishCount: number;
  avgWeightG: number;
  temperatureC?: number; // Optional temp modifier
  customRatePct?: number; // User override
  calibrationFlowRate?: number; // Grams per second
  batteryVoltage?: number; // Volts for Low Power Mode
}

/**
 * Core Feeding Calculation Logic
 * 
 * Determines optimal feeding schedule based on biological species data.
 * Implements safeguards for overfeeding and temperature stress.
 * 
 * @param input - The biological and environmental parameters (Species, Count, Weight, Temp).
 * @returns FeedingPlan - Complete schedule with daily totals and warnings.
 */
export const calculateFeedingPlan = (input: CalculationInput): FeedingPlan => {
  const { species, fishCount, avgWeightG, temperatureC, customRatePct } = input;
  const warnings: string[] = [];
  
  const speciesKey = species.toLowerCase() as keyof typeof ResearchTables;
  const table = ResearchTables[speciesKey];
  
  if (!table) {
    throw new Error(`Species ${species} not found.`);
  }

  // 1. Find Life Stage
  const stageData = table.stages.find(
    (s) => avgWeightG >= s.min_weight_g && avgWeightG < s.max_weight_g
  ) || table.stages[table.stages.length - 1]; // Fallback to last stage

  // 2. Determine Rate
  let useRate = customRatePct ?? stageData.daily_rate_pct;

  // Safety Check
  if (useRate > 15) {
    warnings.push("Warning: High feed rate (>15%) can crash water quality.");
  }

  // 3. Temperature Modifier
  if (temperatureC !== undefined) {
    if (temperatureC < 22) {
      useRate *= 0.8; // Reduce by 20%
      warnings.push("Low Temp (<22°C): Ration reduced by 20%.");
    } else if (temperatureC > 32) {
      useRate *= 0.7; // Reduce by 30%
      warnings.push("High Temp (>32°C): Ration reduced by 30% to save Oxygen.");
    }
  }

  // 4. Calculate Totals
  const biomassG = fishCount * avgWeightG;
  let totalDailyRationG = biomassG * (useRate / 100);

  // 5. Frequency & Schedule (Safe Zones)
  // Default Safe Zones: 8:30, 12:00, 15:30, 17:30. Stop after 18:30.
  const allSafeTimes = ['08:30', '12:00', '15:30', '17:30'];
  let freq = stageData.freq;
  
  // Power Awareness: Low Battery (< 11.5V) -> Remove last meal
  if (input.batteryVoltage !== undefined && input.batteryVoltage < 11.5) {
     freq = Math.max(1, freq - 1);
     warnings.push("Low Battery (<11.5V): Evening feed cancelled to save power.");
  }
  
  // Cap freq at available safe slots for now
  if (freq > 4) freq = 4; // Max 4 safe zones defined for work
  
  const schedule = allSafeTimes.slice(0, freq);
  const gramsPerCycle = totalDailyRationG / freq;

  // Recalculate total based on actual cycles (if we dropped one, total should probably reflect that, or distributed? 
  // Master prompt says "Reduce feeding frequency", usually implying less food too to save power/motor time).
  totalDailyRationG = gramsPerCycle * freq;

  return {
    totalDailyRationG,
    cyclesPerDay: freq,
    gramsPerCycle,
    pelletSize: stageData.pellet_mm,
    schedule,
    warnings,
    stage: stageData.name
  };
};

export const calculateMotorDuration = (gramsTarget: number, flowRateGps: number): number => {
  if (flowRateGps <= 0) return 0;
  return gramsTarget / flowRateGps;
};
