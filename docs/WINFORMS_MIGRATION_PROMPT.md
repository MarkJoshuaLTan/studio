# Migration Prompt: TaxWise Parañaque (WinForms / C#)

Copy and paste the following prompt into GitHub Copilot in Visual Studio to generate the C# code for this application.

---

**Prompt for GitHub Copilot:**

"Act as a Senior C# Developer. I want to build a professional Windows Forms (.NET) application called 'TaxWise Parañaque'. This is a Real Property Tax (RPT) calculator designed for the transition to the RPVARA (RA 12001) standards.

### 1. Data Structure
Create a `TaxSettings` class that can be serialized/deserialized from a JSON file (`tax-settings.json`). 
- `AssessmentLevels`: Dictionary<string, double>
- `TaxRates`: Dictionary<string, double>
- `TaxData`: A nested structure: Barangay Name -> Location/Subdivision Name -> { unitValue2028, unitValue2029, propertyType }.

### 2. Calculation Logic
Implement a method `CalculateTax(double area, LocationDetails selected)`:
- `MarketValue2028 = area * unitValue2028`
- `MarketValue2029 = area * unitValue2029`
- `AssessedValue2028 = MarketValue2028 * AssessmentLevel` (per property type)
- `AssessedValue2029 = MarketValue2029 * AssessmentLevel`
- `CurrentTax = AssessedValue2028 * TaxRate`
- `FullTax2029 = AssessedValue2029 * TaxRate`
- `YearlyTax2028 (Capped) = CurrentTax * 1.06` (The increase is limited to 6% per RPVARA guidelines).

### 3. UI Requirements (Main Form)
**Layout & Styling:**
- Use a 'Modern Green' theme (Primary: #228B22).
- Use a `TableLayoutPanel` or `SplitContainer` for a responsive 2-column layout.
- **Left Panel (Inputs):**
    - `ComboBox` for Barangay selection.
    - `ComboBox` with Autocomplete for Location/Subdivision (filtered by Barangay).
    - `NumericUpDown` for Lot Area (sq.m).
    - A 'Calculate' button styled with a green background.
- **Right Panel (Results):**
    - Use `Label` controls inside a `GroupBox` to show a detailed breakdown:
        - Market Value (Current vs RPVARA)
        - Assessed Value (Current vs RPVARA)
        - Current Yearly Tax (Bold)
        - 2028 Tax (Capped at 6%) (Highlighted)
        - 2029 Full Tax (Estimate)
- **Bottom Section (Impact Analysis):**
    - Use a `FlowLayoutPanel` to display three 'Cards' (UserControls or Panels) showing how different assessment levels (e.g., 5%, 2%, 1% for Residential) affect the 2029 tax.

### 4. Admin Panel
- **Security:** Use a simple login dialog (Username: `admin`, Password: `admin2026`).
- **Dashboard:**
    - Use a `TabControl` with two tabs: 'Unit Values' and 'Calibration'.
    - **Unit Values:** A `DataGridView` to edit all `unitValue2028`, `unitValue2029`, and `propertyType` data. Include a search/filter bar for barangays.
    - **Calibration:** `PropertyGrid` or simple `NumericUpDown` controls to update global `AssessmentLevels` and `TaxRates`.
- **Persistence:** A 'Save' button that writes the updated `TaxSettings` back to `tax-settings.json`.

### 5. Full Data Source
Use the following JSON content as the source for `tax-settings.json`:

```json
{
  "assessmentLevels": {
    "Residential": 0.2,
    "Commercial": 0.5,
    "Industrial": 0.5,
    "Commercial / Industrial": 0.5
  },
  "taxRates": {
    "Residential": 0.02,
    "Commercial": 0.03,
    "Industrial": 0.03,
    "Commercial / Industrial": 0.03
  },
  "taxData": {
    "BARANGAY BF HOMES": {
      "DR. A SANTOS AVE": { "unitValue2028": 3000, "propertyType": "Commercial", "unitValue2029": 85200 },
      "BF HOMES PH 1 (COMMERCIAL AREA)": { "unitValue2028": 1500, "propertyType": "Commercial", "unitValue2029": 64400 },
      "B.F (INDUSTRIAL) VILLONGCO AVE.": { "unitValue2028": 1500, "propertyType": "Industrial", "unitValue2029": 48700 },
      "LOYOLA MEMORIAL PARK": { "unitValue2028": 1000, "propertyType": "Commercial", "unitValue2029": 85200 },
      "MANILA MEMORIAL PARK": { "unitValue2028": 1000, "propertyType": "Commercial", "unitValue2029": 85200 },
      "B.F HOMES SUBD. PH 2,3,5 & 6": { "unitValue2028": 1000, "propertyType": "Residential", "unitValue2029": 39300 },
      "Aguirre Avenue": { "unitValue2028": 1500, "propertyType": "Commercial", "unitValue2029": 85200 },
      "Concha Cruz Drive": { "unitValue2028": 1500, "propertyType": "Commercial", "unitValue2029": 48700 },
      "El Grande Avenue": { "unitValue2028": 1500, "propertyType": "Commercial", "unitValue2029": 48700 },
      "Elizalde Avenue": { "unitValue2028": 1500, "propertyType": "Commercial", "unitValue2029": 64400 },
      "President's Avenue": { "unitValue2028": 1500, "propertyType": "Commercial", "unitValue2029": 85200 },
      "SOUTHBAY GARDEN SUBD.": { "unitValue2028": 1000, "propertyType": "Residential", "unitValue2029": 62300 },
      "TAHANAN VILLAGE": { "unitValue2028": 1000, "propertyType": "Residential", "unitValue2029": 62300 },
      "CAMELLA HOMES SUBD.": { "unitValue2028": 1000, "propertyType": "Residential", "unitValue2029": 28900 },
      "GOODWILL SUBD 2": { "unitValue2028": 1000, "propertyType": "Residential", "unitValue2029": 28900 },
      "IRENEVILLE SUBD": { "unitValue2028": 700, "propertyType": "Residential", "unitValue2029": 33700 },
      "Dona Irenea Avenue": { "unitValue2028": 1000, "propertyType": "Commercial", "unitValue2029": 36800 },
      "JACKIELOU VILLE SUBD.": { "unitValue2028": 700, "propertyType": "Residential", "unitValue2029": 33700 },
      "MAYWOOD VILLAGE": { "unitValue2028": 1000, "propertyType": "Residential", "unitValue2029": 33700 },
      "RGV HOMES ": { "unitValue2028": 700, "propertyType": "Residential", "unitValue2029": 33700 },
      "STA RITA VILLAGE": { "unitValue2028": 700, "propertyType": "Residential", "unitValue2029": 28900 },
      "TEOVILLE SUBD.": { "unitValue2028": 1000, "propertyType": "Residential", "unitValue2029": 39300 },
      "MASVILLE SUCAT": { "unitValue2028": 1000, "propertyType": "Residential", "unitValue2029": 23100 }
    },
    "BARANGAY BACLARAN": {
      "ASEANA BUSINESS PARK/BLVD 2000": { "unitValue2028": 6000, "propertyType": "Commercial", "unitValue2029": 228900 },
      "D. MACAPAGAL BLVD.": { "unitValue2028": 12000, "propertyType": "Commercial", "unitValue2029": 228900 },
      "ROXAS BOULEVARD": { "unitValue2028": 12000, "propertyType": "Commercial", "unitValue2029": 228900 },
      "AIRPORT ROAD": { "unitValue2028": 5000, "propertyType": "Commercial", "unitValue2029": 130900 },
      "F.B HARRISON": { "unitValue2028": 5000, "propertyType": "Commercial", "unitValue2029": 85200 },
      "QUIRINO AVENUE": { "unitValue2028": 5000, "propertyType": "Commercial", "unitValue2029": 130900 },
      "REDEMTORIST ROAD": { "unitValue2028": 5000, "propertyType": "Commercial", "unitValue2029": 85200 },
      "TAFT AVE. EXTENSION": { "unitValue2028": 5000, "propertyType": "Commercial", "unitValue2029": 85200 },
      "M. ROXAS STREET": { "unitValue2028": 2000, "propertyType": "Commercial", "unitValue2029": 36800 },
      "T. CLAUDIO STREET": { "unitValue2028": 2000, "propertyType": "Commercial", "unitValue2029": 85200 },
      "BAYANIHAN STREET": { "unitValue2028": 2000, "propertyType": "Residential", "unitValue2029": 33700 },
      "C. RIVERA ST.": { "unitValue2028": 1500, "propertyType": "Residential", "unitValue2029": 28900 },
      "DIMASALANG STREET": { "unitValue2028": 1200, "propertyType": "Residential", "unitValue2029": 39300 },
      "G.G. CRUZ STREET": { "unitValue2028": 1500, "propertyType": "Residential", "unitValue2029": 33700 },
      "J. CORREA STREET": { "unitValue2028": 1500, "propertyType": "Residential", "unitValue2029": 33700 },
      "DR. J. GABRIEL STREET": { "unitValue2028": 1500, "propertyType": "Residential", "unitValue2029": 33700 },
      "LAPU-LAPU STREET": { "unitValue2028": 1200, "propertyType": "Residential", "unitValue2029": 45800 },
      "PINAGLABANAN STREET": { "unitValue2028": 1200, "propertyType": "Residential", "unitValue2029": 53400 },
      "T. ALONZO STREET": { "unitValue2028": 2000, "propertyType": "Residential", "unitValue2029": 53400 }
    },
    "BARANGAY DON BOSCO": {
      "DOÑA SOLEDAD AVENUE": { "unitValue2028": 1500, "propertyType": "Commercial", "unitValue2029": 85200 },
      "AEROPARK SUBD": { "unitValue2028": 700, "propertyType": "Residential", "unitValue2029": 33700 },
      "BETTER LIVING SUBDIVISION": { "unitValue2028": 1000, "propertyType": "Residential", "unitValue2029": 33700 },
      "DON BOSCO VILLAGE": { "unitValue2028": 700, "propertyType": "Residential", "unitValue2029": 28900 },
      "LEVITOWN SUBD": { "unitValue2028": 700, "propertyType": "Residential", "unitValue2029": 28900 },
      "VALLE VISTA": { "unitValue2028": 800, "propertyType": "Residential", "unitValue2029": 28900 },
      "MANHATTAN VILLAS": { "unitValue2028": 1000, "propertyType": "Residential", "unitValue2029": 28900 }
    },
    "BARANGAY DONGALO": {
      "MACAPAGAL AVENUE": { "unitValue2028": 12000, "propertyType": "Commercial", "unitValue2029": 228900 },
      "QUIRINO AVENUE": { "unitValue2028": 3000, "propertyType": "Commercial", "unitValue2029": 130900 },
      "MARINA BAYTOWN SOUTH": { "unitValue2028": 4000, "propertyType": "Residential", "unitValue2029": 91900 },
      "PALM COAST MARINA": { "unitValue2028": 4000, "propertyType": "Residential", "unitValue2029": 91900 }
    },
    "BARANGAY LA HUERTA": {
      "NINOY AQUINO AVE.": { "unitValue2028": 3000, "propertyType": "Commercial", "unitValue2029": 130900 },
      "QUIRINO AVENUE": { "unitValue2028": 3000, "propertyType": "Commercial", "unitValue2029": 130900 },
      "M.H DEL PILAR STREET": { "unitValue2028": 1000, "propertyType": "Residential", "unitValue2029": 23100 }
    },
    "BARANGAY TAMBO": {
      "ASEANA CITY": { "unitValue2028": 12000, "propertyType": "Commercial", "unitValue2029": 228900 },
      "ROXAS BOULEVARD": { "unitValue2028": 12000, "propertyType": "Commercial", "unitValue2029": 228900 },
      "NAIA ROAD": { "unitValue2028": 5000, "propertyType": "Commercial", "unitValue2029": 130900 },
      "BAYVIEW GARDEN HOMES": { "unitValue2028": 12000, "propertyType": "Residential", "unitValue2029": 58200 },
      "CONCORDE SUBDVISION": { "unitValue2028": 2000, "propertyType": "Residential", "unitValue2029": 91900 }
    }
  }
}
```

Please provide the C# classes for the data model, the logic for `CalculateTax`, and the code for the Main Form with the layouts described above."

---
