using System;
using TaxWiseParanaque.Models;

namespace TaxWiseParanaque.Services
{
    public class TaxCalculatorService
    {
        public CalculationResults Calculate(double area, string barangayName, string locationName, LocationDetails details, TaxSettings settings)
        {
            string propertyType = details.PropertyType;
            
            if (!settings.AssessmentLevels.ContainsKey(propertyType) || !settings.TaxRates.ContainsKey(propertyType))
            {
                throw new Exception("Invalid property type or missing tax configuration.");
            }

            double assessmentLevel = settings.AssessmentLevels[propertyType];
            double taxRate = settings.TaxRates[propertyType];

            double uv2029 = details.UnitValue2029;
            double uv2028 = details.UnitValue2028;

            double mv2029 = uv2029 * area;
            double mv2028 = uv2028 * area;

            double av2029 = mv2029 * assessmentLevel;
            double tax2029 = av2029 * taxRate;

            double av2028 = mv2028 * assessmentLevel;
            double currentTax = av2028 * taxRate; // This is the base tax before the RPVARA cap
            double realTax2028 = currentTax * 1.06; // RPVARA 6% increase limit

            return new CalculationResults
            {
                Barangay = barangayName,
                Location = locationName,
                PropertyType = propertyType,
                LotArea = area,
                UnitValue2029 = uv2029,
                MarketValue2029 = mv2029,
                UnitValue2028 = uv2028,
                MarketValue2028 = mv2028,
                AssessmentLevel = assessmentLevel,
                AssessedValue2029 = av2029,
                YearlyTax2029 = tax2029,
                AssessedValue2028 = av2028,
                CurrentTax = currentTax,
                RealYearlyTax2028 = realTax2028
            };
        }
    }
}