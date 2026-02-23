using System;
using System.Collections.Generic;

namespace TaxWiseParanaque.Models
{
    public enum PropertyType
    {
        Residential,
        Commercial,
        Industrial,
        CommercialIndustrial
    }

    public class LocationDetails
    {
        public double UnitValue2028 { get; set; }
        public double UnitValue2029 { get; set; }
        public string PropertyType { get; set; }
    }

    public class TaxSettings
    {
        public Dictionary<string, double> AssessmentLevels { get; set; } = new Dictionary<string, double>();
        public Dictionary<string, double> TaxRates { get; set; } = new Dictionary<string, double>();
        public Dictionary<string, Dictionary<string, LocationDetails>> TaxData { get; set; } = new Dictionary<string, Dictionary<string, LocationDetails>>();
    }

    public class CalculationResults
    {
        public string Barangay { get; set; }
        public string Location { get; set; }
        public string PropertyType { get; set; }
        public double LotArea { get; set; }
        public double UnitValue2029 { get; set; }
        public double MarketValue2029 { get; set; }
        public double UnitValue2028 { get; set; }
        public double MarketValue2028 { get; set; }
        public double AssessmentLevel { get; set; }
        public double AssessedValue2029 { get; set; }
        public double YearlyTax2029 { get; set; }
        public double AssessedValue2028 { get; set; }
        public double CurrentTax { get; set; }
        public double RealYearlyTax2028 { get; set; }
    }
}