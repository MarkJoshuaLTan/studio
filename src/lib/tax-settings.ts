import type { TaxSettings } from './definitions';

export const initialTaxSettings: TaxSettings = {
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
      "DR. A SANTOS AVE": {
        "unitValue2028": 3000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "BF HOMES PH 1 (COMMERCIAL AREA)": {
        "unitValue2028": 1500,
        "propertyType": "Commercial",
        "unitValue2029": 64400
      },
      "B.F (INDUSTRIAL) VILLONGCO AVE.": {
        "unitValue2028": 1500,
        "propertyType": "Industrial",
        "unitValue2029": 48700
      },
      "LOYOLA MEMORIAL PARK": {
        "unitValue2028": 1000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "MANILA MEMORIAL PARK": {
        "unitValue2028": 1000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "B.F HOMES SUBD. PH 2,3,5 & 6": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "Aguirre Avenue": {
        "unitValue2028": 1500,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "Concha Cruz Drive": {
        "unitValue2028": 1500,
        "propertyType": "Commercial",
        "unitValue2029": 48700
      },
      "El Grande Avenue": {
        "unitValue2028": 1500,
        "propertyType": "Commercial",
        "unitValue2029": 48700
      },
      "Elizalde Avenue": {
        "unitValue2028": 1500,
        "propertyType": "Commercial",
        "unitValue2029": 64400
      },
      "President's Avenue": {
        "unitValue2028": 1500,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "SOUTHBAY GARDEN SUBD.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 62300
      },
      "TAHANAN VILLAGE": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 62300
      },
      "CAMELLA HOMES SUBD.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "GOODWILL SUBD 2": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "IRENEVILLE SUBD": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "Dona Irenea Avenue": {
        "unitValue2028": 1000,
        "propertyType": "Commercial",
        "unitValue2029": 36800
      },
      "JACKIELOU VILLE SUBD.": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "MAYWOOD VILLAGE": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "RGV HOMES ": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "STA RITA VILLAGE": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "TEOVILLE SUBD.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "MASVILLE SUCAT": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "DEVELOPMENT AREAS INTENDED FOR SOCIALIZED HOUSING": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      }
    },
    "BARANGAY BACLARAN": {
      "ASEANA BUSINESS PARK/BLVD 2000 Aseana , Bradco & J.W. Diokno Avenue": {
        "unitValue2028": 6000,
        "propertyType": "Commercial",
        "unitValue2029": 228900
      },
      "D. MACAPAGAL BLVD. Tambo Bdry to Pasay Bdry": {
        "unitValue2028": 12000,
        "propertyType": "Commercial",
        "unitValue2029": 228900
      },
      "ROXAS BOULEVARD T. Alonzo Street to Pasay": {
        "unitValue2028": 12000,
        "propertyType": "Commercial",
        "unitValue2029": 228900
      },
      "AIRPORT ROAD Paranaque River to Roxas Blvd.": {
        "unitValue2028": 5000,
        "propertyType": "Commercial",
        "unitValue2029": 130900
      },
      "F.B HARRISON": {
        "unitValue2028": 5000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "QUIRINO AVENUE T. Alonzo Street to Pasay Bdry.": {
        "unitValue2028": 5000,
        "propertyType": "Commercial",
        "unitValue2029": 130900
      },
      "REDEMTORIST ROAD": {
        "unitValue2028": 5000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "TAFT AVE. EXTENSION": {
        "unitValue2028": 5000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "M. ROXAS STREET": {
        "unitValue2028": 2000,
        "propertyType": "Commercial",
        "unitValue2029": 36800
      },
      "T. CLAUDIO STREET": {
        "unitValue2028": 2000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "A. GUARRA STREET": {
        "unitValue2028": 2000,
        "propertyType": "Commercial",
        "unitValue2029": 48700
      },
      "BAYANIHAN STREET": {
        "unitValue2028": 2000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "C. RIVERA ST.": {
        "unitValue2028": 1500,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "DIMASALANG STREET / RIMAS STREET": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "G.G. CRUZ STREET": {
        "unitValue2028": 1500,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "J. CORREA STREET": {
        "unitValue2028": 1500,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "DR. J. GABRIEL STREET": {
        "unitValue2028": 1500,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "L. GABRIEL STREET": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "LAPU-LAPU STREET": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 45800
      },
      "LT. GARCIA STREET": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 45800
      },
      "MACTAN STREET": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "O. PENA STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "PINAGLABANAN STREET": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 53400
      },
      "R. CUSTODIO STREET (KALIWANAGAN)": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "REDEMPTORIST STREET": {
        "unitValue2028": 2000,
        "propertyType": "Residential",
        "unitValue2029": 53400
      },
      "EVANGELISTA STREET": {
        "unitValue2028": 2000,
        "propertyType": "Residential",
        "unitValue2029": 53400
      },
      "T. ALONZO STREET": {
        "unitValue2028": 2000,
        "propertyType": "Residential",
        "unitValue2029": 53400
      },
      "UNIDA STREET": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "12 DE JUNIO STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "17 DE MARZO STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "22 DE MAYO STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "4 DE JULIO STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "ARAGON STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 45800
      },
      "BAGONG BUHAY STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "BAGONG ILOG STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "BAGONG ISLA STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "BAGONG LIPUNAN STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "BAGONG PAG-ASA STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "BAGONG SIKAT STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "BAGONG SILANG STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "E RODRIGUEZ STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "ESPIRITU STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "J. VIZCARRA STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "MABUHAY STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "RIVERSIDE STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "SANCHEZ STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "SANTIAGO STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "ST. JOSEPH STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "STA MARIA (STA. RITA EXT'N) STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "STA. RITA STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "ALL OTHER STRETS UNDER CAA": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      }
    },
    "BARANGAY DON BOSCO": {
      "DOÑA SOLEDAD AVENUE SSHi-way to France St.": {
        "unitValue2028": 1500,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "DOÑA SOLEDAD AVENUE France St. to Russia St.": {
        "unitValue2028": 1500,
        "propertyType": "Commercial",
        "unitValue2029": 64400
      },
      "DOÑA SOLEDAD AVENUE Russia St. to Moonwalk Bdry.": {
        "unitValue2028": 1000,
        "propertyType": "Commercial",
        "unitValue2029": 64400
      },
      "AEROPARK SUBD": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "ALSEA HOMES": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "BETTER LIVING SUBDIVISION (Annex-1,3,5,6,7,8,12,15,16,17,18,23,27,28,36,40)": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "REMMANVILLE (Annex 29,30,32,35,42,43)": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "BETTER LIVING SUBDIVISION (Section I, II, III, IV, V, VII)": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "BUENSUCESO HOMES": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "CAMELLA HOMES CLASSIC SUBD": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "CHATEAU VILLE SUBD.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "DON BOSCO VILLAGE": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "INA EXEC HOMES I": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "LEVITOWN SUBD/ROYALE / VILLAS": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "NAYONG MAHARLIKA": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "SARMIENTO COMPD.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "SAVIO HOMES": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "SCIENCEVILLE SUBD.": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "VALLE VISTA": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "EL DORADO HOMES/VILLAS": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "MANHATTAN VILLAS": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "AGRO CPD / PHILTRUST CPD.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "PRINCE COURT I, II": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "SANCHEZ HOMES": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "ANNEX 46, REMMANVILLE": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "VILLA AURORA": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "EL DORADO-DULO": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "THE ALCOVE": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 53400
      },
      "SANTOS COMPOUND (San Lorenzo)": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "HAMILTON RESIDENCES": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "GK PROJECT DEVELOPMENT AREAS, etc.": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "DEVELOPMENT AREAS INTENDED FOR SOCIALIZED HOUSING": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      }
    },
    "BARANGAY DONGALO": {
      "MACAPAGAL AVENUE (Tambo Bdry to Paranaque River)": {
        "unitValue2028": 12000,
        "propertyType": "Commercial",
        "unitValue2029": 228900
      },
      "AGUINALDO HIGHWAY (Tambo Bdry to Paranaque River)": {
        "unitValue2028": 6000,
        "propertyType": "Commercial",
        "unitValue2029": 130900
      },
      "QUIRINO AVENUE (Tambo Bdry to Don Galo Bridge)": {
        "unitValue2028": 3000,
        "propertyType": "Commercial",
        "unitValue2029": 130900
      },
      "PACIFIC AVENUE-Marina Subd.": {
        "unitValue2028": 6000,
        "propertyType": "Commercial",
        "unitValue2029": 130900
      },
      "MARINA BAYTOWN SOUTH": {
        "unitValue2028": 4000,
        "propertyType": "Residential",
        "unitValue2029": 91900
      },
      "PALM COAST MARINA & BAYSIDE RESIDENCES": {
        "unitValue2028": 4000,
        "propertyType": "Residential",
        "unitValue2029": 91900
      },
      "A. MABINI ST. (Dr. J. Gabriel St. to Balagtas St.)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "BALAGTAS STREET (Coastal Road to Quirino Ave.)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "D. CAMPOS STREET (Coastal Road to Quirino Ave.)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "DIMATIMBANGAN ST. (Coastal Road to Quirino Ave.)": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "DR. J. GABRIEL ST. (Coastal Road to Quirino Ave.)": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "FACTOR COMPOUND": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "S. DE GUZMANT ST. (Dr. J. Gabriel St. to Balagtas St.)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "STA. MONICA ST. (Quirino Ave. to Balagtas St.)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "1896 STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "BUENCAMINO STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "GEN LUNA STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "MALVAR STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "MAYUGA STREET": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "REGALADO STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "WATAWAT STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      }
    },
    "BARANGAY LA HUERTA": {
      "AGUINALDO HIGHWAY (La Huerta Coastal Bridge to San Dionisio Bdry.)": {
        "unitValue2028": 6000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "NINOY AQUINO AVE. (M.R.R.)": {
        "unitValue2028": 3000,
        "propertyType": "Commercial",
        "unitValue2029": 130900
      },
      "QUIRINO AVENUE (La Huerta - Don Galo Bridge to J. De Leon St.)": {
        "unitValue2028": 3000,
        "propertyType": "Commercial",
        "unitValue2029": 130900
      },
      "A. BONIFACIO STREET (P. Dandan to J. De Leon St.)": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "M.H DEL PILAR STREET (La Huerta - Don Galo Bridge to J. De Leon St.)": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "P. BURGOS STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "P. DANDAN STREET (Paranaque River to Coastal Road)": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "CALLEJON LUNA ST (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "ESPIRITU STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "ISAGANI STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "J. DE LEON ST (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "J. FERRER STREET (ALLEY)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "J.P. RIZAL STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "JUAN LUNA STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "KAPT. FLAVIANO": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "KAPT. PATRICIO STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "KAPT. TINOY STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "MARIA CLARA STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "N DE LEON STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "N DOMINGO STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "N RODRIGUEZ STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "NAZARENO STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "P. GOMEZ STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "PARANCILLO STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "SAN NICOLAS STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      }
    },
    "BARANGAY MARCELO GREEN": {
      "SOUTH SUPER HIGHWAY (West Service Road) - Industrial": {
        "unitValue2028": 2500,
        "propertyType": "Industrial",
        "unitValue2029": 85200
      },
      "SOUTH SUPER HIGHWAY (West Service Road) - Commercial": {
        "unitValue2028": 2500,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "INTERIOR INDUSTRIAL LOTS": {
        "unitValue2028": 1500,
        "propertyType": "Industrial",
        "unitValue2029": 64400
      },
      "SEVERINA INDUSTRIAL SUBD": {
        "unitValue2028": 1500,
        "propertyType": "Industrial",
        "unitValue2029": 85200
      },
      "UPS IV - INDUSTRIAL": {
        "unitValue2028": 1500,
        "propertyType": "Industrial",
        "unitValue2029": 64400
      },
      "ACSIE ROAD": {
        "unitValue2028": 1500,
        "propertyType": "Industrial",
        "unitValue2029": 85200
      },
      "ARMELA COMPOUND": {
        "unitValue2028": 1500,
        "propertyType": "Industrial",
        "unitValue2029": 85200
      },
      "CERVANTES COMPOUND": {
        "unitValue2028": 1500,
        "propertyType": "Industrial",
        "unitValue2029": 85200
      },
      "ANNEX 31, REMMANVILLE": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "BUENSUCESO HOMES III": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "EQUITY HOMES / SAVVY 25": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "GREENVALE SUBD. 1 & 2": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "IRENEVILLE II/AQUINO VILLAGE": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "MARCELO GREEN VILLAGE": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "MAYWOOD VILLAGE II": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "MILBRAE ESTATES": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "RAMONA VILLE / UNIVERSAL SOLID HOMES": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "SEVERINA DIAMOND SUDB.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "SOUTH GREEN PARK V": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "SUPERVILLE SUBD.": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "UNITED PARAÑAQUE SUBD. IV": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "WESTBOROUGH HOMES": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "SITIO FATIMA, MANGGAHAN-KAWAYANAN, AROMA, SAMPAGUITA, ILANG-ILANG etc.": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "DEVELOPMENT AREAS INTENDED FOR SOCIALIZED HOUSING - MARCELO GREEN": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 18300
      }
    },
    "BARANGAY MERVILLE": {
      "SOUTH SUPER HIGHWAY - West Service Road Merville Access Road to Edison Ave. - Industrial": {
        "unitValue2028": 2500,
        "propertyType": "Industrial",
        "unitValue2029": 85200
      },
      "SOUTH SUPER HIGHWAY - West Service Road Merville Access Road to Edison Ave. - Commercial": {
        "unitValue2028": 2500,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "EDISON AVENUE (South Admiral Village to West Service Rd.)": {
        "unitValue2028": 1500,
        "propertyType": "Industrial",
        "unitValue2029": 48700
      },
      "L. MARQUEZ STREET": {
        "unitValue2028": 700,
        "propertyType": "Commercial",
        "unitValue2029": 64400
      },
      "MERVILLE PARK SUBD": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 62300
      },
      "MOLAVE PARK SUBD.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 62300
      },
      "SOUTH ADMIRAL VILLAGE": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 62300
      },
      "WOODSVILLE RESIDENCES": {
        "unitValue2028": 2500,
        "propertyType": "Residential",
        "unitValue2029": 91900
      },
      "BUENAVIDA HOMES": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 62300
      },
      "BUENSUCESO HOMES SUBD. III": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 62300
      },
      "BURGOS COMPD.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 62300
      },
      "CAMELLA HOMES SUBD.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 45800
      },
      "CANAAN HOMES/VELCO PROP.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "REGENCY PLACE MERVILLE": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 62300
      },
      "CITY SQAURE COUNTRY HOMES": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 53400
      },
      "CUBIC HOMES SUBD.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 45800
      },
      "FORTMAX / LEONARDO COMPOUND": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 53400
      },
      "GREENVILLE SUBD": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 53400
      },
      "INLAND EXEC. HAVEN": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 53400
      },
      "SHENANDOAH HOMES SUBD.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 62300
      },
      "SOUTH GREEN PARK VILLAGE 7": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 62300
      },
      "MIRALESTE GROVE": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 72700
      },
      "SOUTH POINTE TOWNHOMES I, II": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 62300
      },
      "VILLAS ON THE GREEN": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 62300
      },
      "BALIWAG (OUTSIDE SUBD. PROPER)": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "DEVELOPMENT AREAS INTENDED FOR SOCIALIZED HOUSING - MERVILLE": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      }
    },
    "BARANGAY MOONWALK": {
      "C-5 SOUTHLINK EXPRESSWAY": {
        "unitValue2028": 3000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "ARMSTRONG AVENUE": {
        "unitValue2028": 700,
        "propertyType": "Commercial",
        "unitValue2029": 48700
      },
      "DAANG BATANG STREET": {
        "unitValue2028": 700,
        "propertyType": "Commercial",
        "unitValue2029": 48700
      },
      "E. RODRIGUEZ AVENUE": {
        "unitValue2028": 700,
        "propertyType": "Commercial",
        "unitValue2029": 48700
      },
      "FASTRACK AVENUE": {
        "unitValue2028": 700,
        "propertyType": "Commercial",
        "unitValue2029": 48700
      },
      "MUTINATIONAL VILLAGE": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 45800
      },
      "TIMOTHY HOMES": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 45800
      },
      "BRENTWOOD HEIGHTS TH": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "ISABELLE GARDEN HOMES": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "MULTINATIONAL PH4-PSPQ": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 45800
      },
      "SHERWOOD HEIGHTS TH": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 45800
      },
      "SILVER HOMES SUBD. 1 & 2": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 45800
      },
      "VERDANT HEIGHTS": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 45800
      },
      "AIRPORT VILLAGE": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "AIRPORTVIEW SUBD.": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "BRICKTOWN SUBD. 1, 2, & 3": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "CRISTINA VILLAGE": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "DONNASVILLE TOWNHOMES": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "ERIBERTA COURT SUBD.": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "HIYAS VILLE": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "LAS CASAS 100 TOWNHOUSE": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "MARIANO CENTERPOINT TOWNHOMES": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "MOONWALK SUBD. I, II, III": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "PARKVIEW TOWNHOMES": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "SAN AGUSTIN VILLAGE": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "SCARLET HOMES": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "ST. FRANCIS SUBDIVISION": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "STA CECILIA VILLAGE": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "TLR CLASSIC TOWNHOUSE": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "WAWA, LIBJO, etc": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "DEVELOPMENT AREAS INTENDED FOR SOCIALIZED HOUSING - MOONWALK": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      }
    },
    "BARANGAY SAN ANTONIO": {
      "DR. A SANTOS AVENUE": {
        "unitValue2028": 3000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "FINASIA HOMES/FIL-HOMES SUBD": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "SAN ANTONIO VALLEY I": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "San Antonio Avenue": {
        "unitValue2028": 900,
        "propertyType": "Commercial",
        "unitValue2029": 48700
      },
      "SEACOM-SAN VICTORES COMPOUND": {
        "unitValue2028": 3000,
        "propertyType": "Commercial",
        "unitValue2029": 36800
      },
      "CAMELLA TOWNHOMES CLASSIC": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "JESTRA VILLAGE I & II": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "BARANGAY VILLAGE": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "CASA FILIPINA/ RAYMONDVILLE EXEC VILL.": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "DON AGUEDO BERNABE SUBD": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "DREAMLAND SUBD": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "EL PUENTEBELLO SUBD.": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "EQUITY HOMES": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "FOURTH ESTATE SUBD": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "GARCIA HEIGHTS SUBD": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "GOODWILL SUBD. 3": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "INA EXEC HOMES": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "JARN COMPD": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "MALACAÑANG VILLAGE": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "MELITON ESPIRITU COMPD.": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "MON-EL SUBD.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "PASCUAL COMPD": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "S.A.V 3,5,7,8,9,10 & 11": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "SANTIAGO HOMES": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "ST. MARTIN VILLAGE": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "WELCOME VILLAGE": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "DEVELOPMENT AREAS INTENDED FOR SOCIALIZED HOUSING - SAN ANTONIO": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      }
    },
    "BARANGAY SAN DIONISIO": {
      "AGUINALDO HIGHWAY (La Huerta Bdry to Las Piñas City Bdry)": {
        "unitValue2028": 6000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "AMVEL BUSINESS PARK": {
        "unitValue2028": 700,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "Calang-calangan": {
        "unitValue2028": 700,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "GLOBAL AIRPORT BUSINESS PARK": {
        "unitValue2028": 700,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "C-5 EXTENSION": {
        "unitValue2028": 3000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "DR. A SANTOS AVENUE - SAN DIONISIO": {
        "unitValue2028": 3000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "NINOY AQUINO AVENUE - SAN DIONISIO": {
        "unitValue2028": 3000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "QUIRINO AVENUE - SAN DIONISIO": {
        "unitValue2028": 3000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "CANAYNAY AVENUE": {
        "unitValue2028": 1500,
        "propertyType": "Commercial",
        "unitValue2029": 48700
      },
      "JUANITA DE LEON ST": {
        "unitValue2028": 3000,
        "propertyType": "Commercial",
        "unitValue2029": 48700
      },
      "KABIHASNAN FAST TRACK": {
        "unitValue2028": 1500,
        "propertyType": "Commercial",
        "unitValue2029": 64400
      },
      "PALANYAG ROAD/GATCHALIAN AVE": {
        "unitValue2028": 1500,
        "propertyType": "Commercial",
        "unitValue2029": 48700
      },
      "JALEVILLE SUBD": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 45800
      },
      "AURENINA/RODRIGUEZ COMPD": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "CH WOODSROW SUBD": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "DON JOSE GREEN COURT SUBD": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "R. MEDINA SUBD.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "TUDOR GARDENS/GARDENVALE SUBD.": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 45800
      },
      "VILLANUEVA VILLAGE": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "GATCHALIAN SUBD 1& 2-C": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "BERNABE SUBD. 1": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "A. BONIFACIO STREET - SAN DIONISIO": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "BERNABE SUBD. PH 3": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "COOPERATIVE VILLAGE": {
        "unitValue2028": 3000,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "P BURGOS STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "PELAEZ STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "BUENAVENTURA STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "CAPISTRANO STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "EL FILIBUSTERISMO STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "ESPIRITU COMPD - SAN DIONISIO": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "H. RODRIGUEZ STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "HOLY FAMILY COMPOUND": {
        "unitValue2028": 3000,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "LOPEZ JAENA STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "MAMAMANTE STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "MORAS STREET": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "N.T. GARCIA STREET": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "NHA AREA / TRAMO STREET": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "RAMOS STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "ROMERO STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "SALINAS STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "SALVADOR STREET (ALLEY)": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "TRAMO WAKAS 1 & 2": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "VITALES STREET": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "DEVELOPMENT AREAS INTENDED FOR SOCIALIZED HOUSING - SAN DIONISIO": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      }
    },
    "BARANGAY SAN ISIDRO": {
      "DR. A SANTOS AVENUE - SAN ISIDRO": {
        "unitValue2028": 3000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "CAMELLA HOMES III": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "CLARMEN VILLAGE": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "EL PASEO DE FORTUNATA": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "EQUITY HOMES 1 & 2": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "FILINVEST CLASSIC ESTATE": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "FORTUNATA VILLAGE": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "GARDEN CITY SUBD": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "GREENHEIGHTS VILLAGE": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "GUERRERO CMPD": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "JUSTINA VILLAGE": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "KRAUSE'S VILLAGE": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "LOPEZ VILLAGE": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "Lopez Avenue": {
        "unitValue2028": 1000,
        "propertyType": "Commercial",
        "unitValue2029": 36800
      },
      "Lopez Commercial": {
        "unitValue2028": 1000,
        "propertyType": "Commercial",
        "unitValue2029": 36800
      },
      "MIHARA HOMES": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "PRIMAVERA HOMES": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "RAINBOW VILLAGE 2": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "SALVADOR ESTATE SUBD": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "SAN DIONISIO VILLAGE": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "SAV 2,6,12,13,14 & 15": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "ST. CATHERINE SUBD.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "TOPLAND SUBD": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "UPS V": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "VALENTINO EXEC. HOMES": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "VERAVILLE HOMES": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "VILLA MENDOZA SUBD": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "BELISARIO COMPOUND": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "CRUZ COMPOUND": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "DELA CRUZ COMPOUND": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "ESPIRITU COMPOUND": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "FC SANTOS COMPOUND": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "GRAND MONACO SOUTHPOINT": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "NERSAN COMPOUND": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "PASCUAL COMPOUND - SAN ISIDRO": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "SANDIVILLE SUBD": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "SIMPLICIO CRUZ COMPOUND": {
        "unitValue2028": 3000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "VILLA LOURDES SUBD.": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "VITALEZ COMPD": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "KAY BIGA, MATATDO, etc.": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "DEVELOPMENT AREAS INTENDED FOR SOCIALIZED HOUSING - SAN ISIDRO": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      }
    },
    "BARANGAY SAN MARTIN": {
      "EAST SERVICE ROAD (IBA STREET)": {
        "unitValue2028": 2500,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "EAST SERVICE ROAD / SSHI-WAY": {
        "unitValue2028": 2500,
        "propertyType": "Industrial",
        "unitValue2029": 85200
      },
      "BAEZ STREET / DAAN HARI - Industrial": {
        "unitValue2028": 1200,
        "propertyType": "Industrial",
        "unitValue2029": 64400
      },
      "DAAN HARI - Commercial": {
        "unitValue2028": 1200,
        "propertyType": "Commercial",
        "unitValue2029": 64400
      },
      "MARIAN PARK INDUSTRIAL SUBD.": {
        "unitValue2028": 1200,
        "propertyType": "Industrial",
        "unitValue2029": 64400
      },
      "MARIAN LAKEVIEW SUBD.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 45800
      },
      "MAKATI SOUTH HILLS SUBD.": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "UNITED HILLS VILLAGE I, II, & III (Before - United Pque Subd. (UPS))": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "TINZEL HOMES": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "DEVELOPMENT AREAS INTENDED FOR SOCIALIZED HOUSING - SAN MARTIN": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      }
    },
    "BARANGAY STO NINO": {
      "NINOY AQUINO AVENUE (MIA Road to La Huerta Bridge)": {
        "unitValue2028": 3000,
        "propertyType": "Commercial / Industrial",
        "unitValue2029": 85200
      },
      "KAINGIN ROAD / C-5 EXPRESSWAY (Multinational Drive to E. Rodriguez Ave.)": {
        "unitValue2028": 1000,
        "propertyType": "Commercial / Industrial",
        "unitValue2029": 85200
      },
      "MULTINATIONAL DRIVE-LIBJO (N. Aquino Ave. to Multinational Village)": {
        "unitValue2028": 1000,
        "propertyType": "Commercial / Industrial",
        "unitValue2029": 64400
      },
      "PASCOR VILLA /QUEENSWAY COML (Pascor Drive, Del Bros, Sta Agueda, Johann St)": {
        "unitValue2028": 1000,
        "propertyType": "Commercial / Industrial",
        "unitValue2029": 64400
      },
      "PACIFIC GRAND VILLA": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "STO. NIÑO SUBD.": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "Dahlia Street": {
        "unitValue2028": 700,
        "propertyType": "Commercial",
        "unitValue2029": 31500
      },
      "COL. E. DE LEON ST. / DAMAYAN ST.": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "E. RODRIGUEZ AVENUE - STO NINO": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "JP RIZAL STREET": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "GOMBURZA STREET": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "ISAROG STREET": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "MAYON STREET": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "1st to 21st STREET": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "BERNABE COMPOUND": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "BERNARDO COMPOUND": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "CRUZ COMPOUND - STO NINO": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "DANDAN STREET": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "GREEN TOWERS STREET": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "HALIK ALON COMPOUND": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "KAINGIN, LIBJO, BULI,WAWA, etc.": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "MAXIM STREET": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "SANTOS DE LEON STREET": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "SORIANO COMPOUND": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "STA AGUEDA COMPOUND": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "STA ANA COMPOUND": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "VALENZUELA COMPOUND": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      },
      "DEVELOPMENT AREAS INTENDED FOR SOCIALIZED HOUSING - STO NINO": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      }
    },
    "BARANGAY SUN VALLEY": {
      "SOUTH SUPER HIGHWAY (WEST SERVICE ROAD) - Industrial": {
        "unitValue2028": 2500,
        "propertyType": "Industrial",
        "unitValue2029": 85200
      },
      "SOUTH SUPER HIGHWAY (WEST SERVICE ROAD) - Commercial": {
        "unitValue2028": 2500,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "EDISON AVENUE - Commercial": {
        "unitValue2028": 1500,
        "propertyType": "Commercial",
        "unitValue2029": 64400
      },
      "EDISON AVENUE - Industrial": {
        "unitValue2028": 1500,
        "propertyType": "Industrial",
        "unitValue2029": 64400
      },
      "STA ANA DRIVE": {
        "unitValue2028": 1200,
        "propertyType": "Commercial",
        "unitValue2029": 36800
      },
      "GARVILLE SUBD / CUL DE SAC - Commercial": {
        "unitValue2028": 800,
        "propertyType": "Commercial",
        "unitValue2029": 36800
      },
      "GARVILLE SUBD / CUL DE SAC - Residential": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "EXECUTIVE HEIGHTS SUBD": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "MOONVILLE SUBDIVISION": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "SUN VALLEY SUBDIVISION": {
        "unitValue2028": 900,
        "propertyType": "Residential",
        "unitValue2029": 45800
      },
      "ANNEX 41, 45": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "COUNTRYSIDE VILLAGE PH. 1-5": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "HAPPY GLENN LOOP": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "MARIMAR VILLAGE PH. 1 & 2": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "MONTEVILLA DE MONSOD": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "KASA BERDE TOWNHOMES": {
        "unitValue2028": 1200,
        "propertyType": "Residential",
        "unitValue2029": 53400
      },
      "PARKVIEW HOMES 1-4": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "RAMOS VILLAGE": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "ST. LOUIS COMPOUND": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "STA ANA SUBD.": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "BROTHERHOOD CMPD.": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "DEVELOPMENT AREAS INTENDED FOR SOCIALIZED HOUSING - SUN VALLEY": {
        "unitValue2028": 700,
        "propertyType": "Residential",
        "unitValue2029": 18300
      }
    },
    "BARANGAY TAMBO": {
      "ASEANA BUSINESS PARK /ASEANA CITY/BLVD 2000": {
        "unitValue2028": 12000,
        "propertyType": "Commercial",
        "unitValue2029": 228900
      },
      "MACAPAGAL AVENUE (Aseana Ave to Dongalo Boundary)": {
        "unitValue2028": 12000,
        "propertyType": "Commercial",
        "unitValue2029": 228900
      },
      "ROXAS BOULEVARD (T. Alonzo to MIA Road)": {
        "unitValue2028": 12000,
        "propertyType": "Commercial",
        "unitValue2029": 228900
      },
      "NAIA ROAD (MIA ROAD / SEASIDE DRIVE)": {
        "unitValue2028": 5000,
        "propertyType": "Commercial",
        "unitValue2029": 130900
      },
      "AGUINALDO HIGHWAY (Coastal Road)": {
        "unitValue2028": 6000,
        "propertyType": "Commercial",
        "unitValue2029": 228900
      },
      "QUIRINO AVENUE (T. Alonzo to Meralco Compound)": {
        "unitValue2028": 5000,
        "propertyType": "Commercial",
        "unitValue2029": 130900
      },
      "QUIRINO AVENUE (Meralco Compound to Brgy Don Galo Bdry.)": {
        "unitValue2028": 5000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "QUIRINO AVENUE (Interior)": {
        "unitValue2028": 5000,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "BAYSIDE COURT (Meralco Compound)": {
        "unitValue2028": 2000,
        "propertyType": "Residential",
        "unitValue2029": 58200
      },
      "BAYVIEW GARDEN HOMES 1, 2 & 3": {
        "unitValue2028": 12000,
        "propertyType": "Residential",
        "unitValue2029": 58200
      },
      "CONCORDE SUBDVISION": {
        "unitValue2028": 2000,
        "propertyType": "Residential",
        "unitValue2029": 91900
      },
      "GOODWILL SUBD. I": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "LOS TAMARAOS VILL. (SUNSET VILLAGE)": {
        "unitValue2028": 2000,
        "propertyType": "Residential",
        "unitValue2029": 91900
      },
      "MARINA BAYTOWN EAST SUBD": {
        "unitValue2028": 4000,
        "propertyType": "Residential",
        "unitValue2029": 91900
      },
      "Pacific Avenue": {
        "unitValue2028": 12000,
        "propertyType": "Commercial",
        "unitValue2029": 228900
      },
      "PASCUAL COMPOUND": {
        "unitValue2028": 5000,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "TAMARAW COURT": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "VILLA CAROLINA": {
        "unitValue2028": 12000,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "16TH STREET": {
        "unitValue2028": 1500,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "AGRIPINA STREET": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "ARIAS COMPOUND": {
        "unitValue2028": 1500,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "BALUYOT STREET (ALLEY)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "BATAAN STREET": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "BAYVIEW DRIVE": {
        "unitValue2028": 2000,
        "propertyType": "Residential",
        "unitValue2029": 91900
      },
      "C. SANTOS STREET": {
        "unitValue2028": 1500,
        "propertyType": "Residential",
        "unitValue2029": 72700
      },
      "G. MENDOZA STREET (ALLEY)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "GABRIEL STREET": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "GEN SEGUNDO STREET (ALLEY)": {
        "unitValue2028": 1000,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "JALANDONI STREET": {
        "unitValue2028": 1500,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "JUAN FERMIN STREET (ALLEY)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "KABESANG CILIO STREET (ALLEY)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "KATIGBAK DRIVE": {
        "unitValue2028": 2000,
        "propertyType": "Residential",
        "unitValue2029": 28900
      },
      "L. AVELINO ST.": {
        "unitValue2028": 2000,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "LOPEZ DE LEON STREET (ALLEY)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "M. DELOS SANTOS STREET": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 39300
      },
      "MAYUGA STREET (ALLEY)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "MCDONOUGH STREET": {
        "unitValue2028": 1500,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "P. DE JESUS ST. (ALLEY)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "P. DE LEON ST. (ALLEY)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "P. MACABUAG STREET (ALLEY)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "P. MAYUGA STREET": {
        "unitValue2028": 3500,
        "propertyType": "Residential",
        "unitValue2029": 33700
      },
      "P. VERGEL STREET (ALLEY)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "PAULINO STREET (ALLEY)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "PINAGLABANAN STREET (ALLEY) - TAMBO": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "RIVERVIEW COMPOUND": {
        "unitValue2028": 1500,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "SANDEJAS STREET (ALLEY)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "SUNRISE STREET near Concorde Vill": {
        "unitValue2028": 1500,
        "propertyType": "Residential",
        "unitValue2029": 91900
      },
      "T. ALONZO ST.": {
        "unitValue2028": 2000,
        "propertyType": "Residential",
        "unitValue2029": 91900
      },
      "TROPICANA VILLA-VALENZUELA CMPD": {
        "unitValue2028": 5000,
        "propertyType": "Residential",
        "unitValue2029": 72700
      },
      "VILLAMAR 1ST & 2ND STREET": {
        "unitValue2028": 1500,
        "propertyType": "Residential",
        "unitValue2029": 72700
      }
    },
    "BARANGAY VITALEZ": {
      "N.A.I.A COMPOUND": {
        "unitValue2028": 3000,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "AIRLANE VILLAGE": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "AIRPORT VILLAGE (Before Baltao Subd)": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "Urma Drive": {
        "unitValue2028": 800,
        "propertyType": "Commercial",
        "unitValue2029": 85200
      },
      "GAT MENDOZA SUBD": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "JETLANE VILLAGE": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      },
      "VITALEZ COMPOUND": {
        "unitValue2028": 800,
        "propertyType": "Residential",
        "unitValue2029": 23100
      }
    }
  }
};
