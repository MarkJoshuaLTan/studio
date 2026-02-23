# TaxWise Parañaque: WinForms Implementation Guide

This folder contains the core C# files needed to clone the **TaxWise Parañaque** web app into a desktop Windows Forms application.

### Instructions to Build:

1. **Create Project**: Open Visual Studio 2022 and create a new **Windows Forms App (.NET)** project named `TaxWiseParanaque`.
2. **Add Dependencies**: Install the `Newtonsoft.Json` NuGet package for data handling.
3. **Add Models**: Copy `TaxWiseModels.cs` into your project.
4. **Add Logic**: Copy `TaxCalculatorService.cs` into your project.
5. **Implement UI**: 
   - Open `Form1.cs` (or your main form) in the Designer.
   - Add ComboBoxes for `cmbBarangay` and `cmbLocation`.
   - Add a TextBox for `txtLotArea`.
   - Add a Button for `btnCalculate`.
   - Add Labels for result display (e.g., `lblCurrentTax`, `lblTax2028`, `lblTax2029`).
6. **Apply Logic**: Copy the code from `MainFormLogic.cs` into your `MainForm.cs` file.
7. **Data Source**: Place the `src/lib/tax-settings.json` file from this web project into your WinForms `bin/Debug` (or execution) folder so the app can load the data offline.

### Features Included:
- **Offline Data**: Uses local JSON serialization for property values.
- **RPVARA Logic**: Implements the 6% tax cap for 2028.
- **Event Handling**: Full logic for barangay/location filtering and tax calculation.
