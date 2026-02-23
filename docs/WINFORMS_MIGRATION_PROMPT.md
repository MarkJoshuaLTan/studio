# Migration Prompt: TaxWise Parañaque (WinForms / C#)

Copy and paste the following prompt into GitHub Copilot in Visual Studio to generate the C# code for this application.

---

**Prompt for GitHub Copilot:**

"Act as a Senior C# Developer. I want to build a Windows Forms (.NET) application called 'TaxWise Parañaque'. This is a Real Property Tax (RPT) calculator designed for the transition to the RPVARA (RA 12001) standards.

### 1. Data Structure
Create a `TaxSettings` class that can be serialized/deserialized from a JSON file (`tax-settings.json`). 
- `AssessmentLevels`: Dictionary<string, double> (Residential: 0.2, Commercial: 0.5, etc.)
- `TaxRates`: Dictionary<string, double> (Residential: 0.02, Commercial: 0.03, etc.)
- `TaxData`: A nested structure: Barangay Name -> Location/Subdivision Name -> { unitValue2028, unitValue2029, propertyType }.

### 2. Calculation Logic
Implement a method `CalculateTax(double area, LocationDetails selected)`:
- `MarketValue2028 = area * unitValue2028`
- `MarketValue2029 = area * unitValue2029`
- `AssessedValue = MarketValue * AssessmentLevel` (per property type)
- `CurrentTax = AssessedValue2028 * TaxRate`
- `FullTax2029 = AssessedValue2029 * TaxRate`
- `YearlyTax2028 (Capped) = CurrentTax * 1.06` (The increase is limited to 6% per RPVARA guidelines).

### 3. UI Requirements (Main Form)
- Use a `ComboBox` for Barangay selection (populated from keys in JSON).
- Use a `ComboBox` with Autocomplete functionality for Location/Subdivision.
- Use a `NumericUpDown` or `TextBox` for Lot Area (sq.m).
- A `Button` labeled 'Calculate Tax'.
- A results area (using `Labels` or a `Panel`) to show:
    - Current Yearly Tax
    - Estimated 2028 Tax (Capped at 6%)
    - Estimated 2029 Tax (Full Adoption)
- Use a `TabControl` to separate the Calculator from an 'About' section.

### 4. Admin Panel (Modal Dialog)
- Create a login form (Username: admin, Password: admin2026).
- If successful, show a `DataGridView` or specific inputs to edit the `unitValue2028`, `unitValue2029`, and `propertyType` for selected barangays.
- Allow updating the `AssessmentLevels` and `TaxRates`.
- A 'Save' button that writes the updated object back to `tax-settings.json`.

### 5. Styling
- Use a professional theme (Forest Green primary color #228B22).
- Ensure the form is responsive and uses anchoring/docking so it looks good when resized.

Please provide the C# code for the main `Form1.cs`, the data models, and the JSON handling logic."

---