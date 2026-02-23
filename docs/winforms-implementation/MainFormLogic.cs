using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using Newtonsoft.Json; // Install via NuGet: Newtonsoft.Json
using TaxWiseParanaque.Models;
using TaxWiseParanaque.Services;

namespace TaxWiseParanaque
{
    public partial class MainForm : Form
    {
        private TaxSettings _settings;
        private TaxCalculatorService _calculator = new TaxCalculatorService();
        private const string SettingsFile = "tax-settings.json";

        public MainForm()
        {
            InitializeComponent();
            LoadSettings();
            PopulateBarangays();
        }

        private void LoadSettings()
        {
            if (File.Exists(SettingsFile))
            {
                string json = File.ReadAllText(SettingsFile);
                _settings = JsonConvert.DeserializeObject<TaxSettings>(json);
            }
            else
            {
                // Fallback or Alert
                MessageBox.Show("Settings file not found. Please ensure tax-settings.json is in the app directory.");
            }
        }

        private void PopulateBarangays()
        {
            cmbBarangay.Items.Clear();
            foreach (var barangay in _settings.TaxData.Keys.OrderBy(k => k))
            {
                cmbBarangay.Items.Add(barangay);
            }
        }

        private void cmbBarangay_SelectedIndexChanged(object sender, EventArgs e)
        {
            cmbLocation.Items.Clear();
            string selectedBarangay = cmbBarangay.SelectedItem?.ToString();
            if (!string.IsNullOrEmpty(selectedBarangay) && _settings.TaxData.ContainsKey(selectedBarangay))
            {
                foreach (var location in _settings.TaxData[selectedBarangay].Keys.OrderBy(k => k))
                {
                    cmbLocation.Items.Add(location);
                }
            }
        }

        private void btnCalculate_Click(object sender, EventArgs e)
        {
            try
            {
                string barangay = cmbBarangay.SelectedItem?.ToString();
                string location = cmbLocation.SelectedItem?.ToString();
                
                if (string.IsNullOrEmpty(barangay) || string.IsNullOrEmpty(location))
                {
                    MessageBox.Show("Please select both Barangay and Location.");
                    return;
                }

                if (!double.TryParse(txtLotArea.Text, out double area) || area <= 0)
                {
                    MessageBox.Show("Please enter a valid Lot Area.");
                    return;
                }

                var details = _settings.TaxData[barangay][location];
                var results = _calculator.Calculate(area, barangay, location, details, _settings);

                DisplayResults(results);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
        }

        private void DisplayResults(CalculationResults res)
        {
            lblCurrentTax.Text = res.CurrentTax.ToString("C2");
            lblTax2028.Text = res.RealYearlyTax2028.ToString("C2");
            lblTax2029.Text = res.YearlyTax2029.ToString("C2");
            lblPropertyType.Text = res.PropertyType;
            
            // Update labels for market values, assessed values etc.
            // Ensure you have these Label controls on your form
        }
    }
}