export type PayFrequency = 'Hourly' | 'Daily' | 'Weekly' | 'Fortnightly' | 'Monthly' | 'Annually';

export interface TaxResult {
  grossPay: number;
  taxableIncome: number;
  tax: number;
  medicareLevy: number;
  superannuation: number;
  netPay: number;
}

// 2024-2025 Resident Tax Rates
// https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents

const MEDICARE_LEVY_RATE = 0.02;
// Medicare levy low-income thresholds (2023-24 figures as 2024-25 not fully finalized, usually indexed)
// Using standard 2% for simplicity as per plan, but implementing basic threshold logic for correctness if needed.
// For this MVP, we will apply flat 2% for incomes above the threshold to keep it simple as requested, 
// but let's be slightly more accurate: No levy below ~26k.
const MEDICARE_THRESHOLD = 26000; 

const SUPER_RATE = 0.12; // 12% for 2024-2025

// Standard working hours/days for conversion
const HOURS_PER_DAY = 7.6;
const DAYS_PER_WEEK = 5;

export const convertToAnnual = (amount: number, frequency: PayFrequency, workingWeeks: number = 52): number => {
  switch (frequency) {
    case 'Hourly':
      return amount * HOURS_PER_DAY * DAYS_PER_WEEK * workingWeeks;
    case 'Daily':
      return amount * DAYS_PER_WEEK * workingWeeks;
    case 'Weekly':
      return amount * workingWeeks;
    case 'Fortnightly':
      return amount * (workingWeeks / 2);
    case 'Monthly':
      return amount * 12;
    case 'Annually':
      return amount;
    default:
      return amount;
  }
};

export const calculateTax = (annualIncome: number): number => {
  // 2024-2025 Resident Tax Rates (Stage 3 Tax Cuts - effective 1 July 2024)
  // Source: https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents
  if (annualIncome <= 18200) return 0;
  if (annualIncome <= 45000) return (annualIncome - 18200) * 0.16;
  if (annualIncome <= 135000) return 4288 + (annualIncome - 45000) * 0.30;
  if (annualIncome <= 190000) return 31288 + (annualIncome - 135000) * 0.37;
  return 51638 + (annualIncome - 190000) * 0.45;
};

export const calculateMedicareLevy = (annualIncome: number): number => {
  if (annualIncome <= MEDICARE_THRESHOLD) return 0;
  return annualIncome * MEDICARE_LEVY_RATE;
};

export const calculateSuper = (baseIncome: number, includesSuper: boolean): number => {
  if (includesSuper) {
    // baseIncome = Salary + Super
    // Salary = baseIncome / (1 + Rate)
    // Super = baseIncome - Salary
    return baseIncome - (baseIncome / (1 + SUPER_RATE));
  }
  return baseIncome * SUPER_RATE;
};

export const calculatePay = (
  amount: number, 
  frequency: PayFrequency, 
  isContractor: boolean,
  includesSuper: boolean = false,
  workingWeeks: number = 52
): TaxResult => {
  const annualGross = convertToAnnual(amount, frequency, workingWeeks);
  
  let taxableIncome = annualGross;
  let superAmount = 0;

  if (isContractor) {
      // Contractor logic:
      // Assume input rate includes everything.
      superAmount = calculateSuper(annualGross, true);
      taxableIncome = annualGross - superAmount;
  } else {
      // Permanent logic:
      if (includesSuper) {
          // Input includes super (package rate)
          superAmount = calculateSuper(annualGross, true);
          taxableIncome = annualGross - superAmount;
      } else {
          // Input is Base Salary (super paid on top by employer)
          superAmount = calculateSuper(annualGross, false);
          taxableIncome = annualGross;
      }
  }

  const tax = calculateTax(taxableIncome);
  const medicareLevy = calculateMedicareLevy(taxableIncome);
  const netPay = taxableIncome - tax - medicareLevy;

  return {
    grossPay: annualGross,
    taxableIncome,
    tax,
    medicareLevy,
    superannuation: superAmount,
    netPay
  };
};
