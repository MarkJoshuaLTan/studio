"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings, Loader2, ArrowLeft } from "lucide-react";
import type { TaxSettings, LocationDetails, PropertyType } from "@/lib/definitions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdminPanelDialog({ settings, onSettingsChange }: { settings: TaxSettings | null, onSettingsChange: (newSettings: TaxSettings) => void }) {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("admin-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoadingAuth(false);
  }, []);

  useEffect(() => {
    if (open) {
      const auth = localStorage.getItem("admin-auth");
      setIsAuthenticated(auth === "true");
    }
  }, [open]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("admin-auth", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin-auth");
    setOpen(false); // This will close the dialog and return to the app
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Admin Panel" title="Admin Panel">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent showClose={false} className="max-w-7xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Admin Panel</DialogTitle>
            <DialogDescription>
              {isAuthenticated ? "Manage application settings." : "Please login to continue."}
            </DialogDescription>
          </DialogHeader>
          <AdminPanel 
            isAuthenticated={isAuthenticated}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
            isLoadingAuth={isLoadingAuth}
            onClose={() => setOpen(false)}
            settings={settings}
            onSettingsChange={onSettingsChange}
          />
      </DialogContent>
    </Dialog>
  );
}


function AdminPanel({ isAuthenticated, onLoginSuccess, onLogout, isLoadingAuth, onClose, settings, onSettingsChange }: { isAuthenticated: boolean; onLoginSuccess: () => void; onLogout: () => void; isLoadingAuth: boolean; onClose: () => void; settings: TaxSettings | null, onSettingsChange: (newSettings: TaxSettings) => void }) {
  if (isLoadingAuth) {
     return <div className="flex-1 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  return (
      <div className="flex-1 overflow-hidden pt-4">
        {isAuthenticated ? (
            <AdminTabs onLogout={onLogout} onClose={onClose} settings={settings} onSettingsChange={onSettingsChange} />
        ) : (
            <LoginForm onLoginSuccess={onLoginSuccess} />
        )}
      </div>
  );
}


function LoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (username === "admin" && password === "admin2026") {
      toast({ title: "Login successful!" });
      onLoginSuccess();
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid username or password.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleLogin}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin panel.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

function AdminTabs({ onLogout, onClose, settings, onSettingsChange }: { onLogout: () => void; onClose: () => void; settings: TaxSettings | null, onSettingsChange: (newSettings: TaxSettings) => void; }) {
  return (
    <div className="h-full flex flex-col">
       <Tabs defaultValue="dashboard" className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center pr-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="calibrate">Calibrate</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={onClose}><ArrowLeft className="mr-2 h-4 w-4"/> Back to App</Button>
            <Button variant="outline" onClick={onLogout}>Logout</Button>
          </div>
        </div>
        <TabsContent value="dashboard" className="flex-1 overflow-y-auto mt-4 pr-4">
            {settings && <AdminDashboard settings={settings} onSettingsChange={onSettingsChange} />}
        </TabsContent>
        <TabsContent value="calibrate" className="flex-1 overflow-y-auto mt-4 pr-4">
            {settings && <CalibrateSettings settings={settings} onSettingsChange={onSettingsChange} />}
        </TabsContent>
      </Tabs>
    </div>
  )
}


function AdminDashboard({ settings: settingsProp, onSettingsChange }: { settings: TaxSettings, onSettingsChange: (newSettings: TaxSettings) => void }) {
  const { toast } = useToast();
  const [editedSettings, setEditedSettings] = useState<TaxSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedBarangay, setSelectedBarangay] = useState<string>('');
  const [locationSearch, setLocationSearch] = useState('');

  useEffect(() => {
    if (settingsProp) {
        setIsLoading(true);
        setEditedSettings(JSON.parse(JSON.stringify(settingsProp))); // Deep copy
        if (!selectedBarangay) {
            setSelectedBarangay(Object.keys(settingsProp.taxData)[0] || '');
        }
        setIsLoading(false);
    }
  }, [settingsProp, selectedBarangay]);
  
  const handleLocationDataChange = (locationName: string, field: keyof LocationDetails, value: string) => {
    if (!editedSettings || !selectedBarangay) return;

    setEditedSettings((prev: TaxSettings | null) => {
      if (!prev) return null;
      const newSettings = JSON.parse(JSON.stringify(prev));
      const location = newSettings.taxData[selectedBarangay][locationName];
      
      let finalValue: string | number = value;
      if (field === 'unitValue2028' || field === 'unitValue2029') {
          if (value === '') {
              finalValue = '';
          } else if (!/^\d*\.?\d*$/.test(value)) {
              return newSettings; // invalid input
          } else if (location[field].toString() === "0" && value.length > 1 && !value.startsWith("0.")) {
             finalValue = value.substring(1);
          }
      }
      (location as any)[field] = finalValue;
      return newSettings;
    });
  };
  
  const handleSaveUnitValues = async () => {
    setIsSaving(true);
    try {
      if(!editedSettings) return;
      
      const settingsToSave = JSON.parse(JSON.stringify(editedSettings));
      
      for (const barangay in settingsToSave.taxData) {
          for (const location in settingsToSave.taxData[barangay]) {
              const details = settingsToSave.taxData[barangay][location];
              if (details.unitValue2028 === '' || isNaN(parseFloat(details.unitValue2028 as any))) {
                  details.unitValue2028 = 0;
              } else {
                  details.unitValue2028 = parseFloat(details.unitValue2028 as any);
              }
              if (details.unitValue2029 === '' || isNaN(parseFloat(details.unitValue2029 as any))) {
                  details.unitValue2029 = 0;
              } else {
                  details.unitValue2029 = parseFloat(details.unitValue2029 as any);
              }
          }
      }

      onSettingsChange(settingsToSave);
      toast({ title: 'Success!', description: 'Settings have been saved. Reloading...' });
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error: any) {
       toast({ variant: "destructive", title: "Error", description: error.message || "Could not save settings." });
       setIsSaving(false);
    }
  };

  const filteredLocations = editedSettings && selectedBarangay && editedSettings.taxData[selectedBarangay]
    ? Object.entries(editedSettings.taxData[selectedBarangay]).filter(([name]) =>
        name.toLowerCase().includes(locationSearch.toLowerCase())
      )
    : [];

  if (isLoading || !editedSettings) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Unit Value Tax Data</CardTitle>
            <CardDescription>Select a barangay and search for a location to edit its values.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="w-full md:w-1/2">
                    <Label>Barangay</Label>
                    <Select onValueChange={(value) => { setSelectedBarangay(value); setLocationSearch(''); }} value={selectedBarangay}>
                        <SelectTrigger><SelectValue placeholder="Select a Barangay" /></SelectTrigger>
                        <SelectContent>
                            {editedSettings && Object.keys(editedSettings.taxData).sort().map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full md:w-1/2">
                    <Label>Search Location</Label>
                    <Input placeholder="Filter locations..." value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} disabled={!selectedBarangay} />
                </div>
            </div>
            <ScrollArea className="h-[45vh] rounded-md border p-4">
                <div className="space-y-4">
                    {filteredLocations.length > 0 ? filteredLocations.map(([locationName, details]) => (
                        <Card key={locationName}>
                            <CardHeader className="pb-2"><CardTitle className="text-lg">{locationName}</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                    <div className="space-y-2">
                                        <Label htmlFor={`uv2028-${locationName}`}>Unit Value (Current)</Label>
                                        <Input id={`uv2028-${locationName}`} type="text" inputMode="decimal" value={details.unitValue2028} onChange={e => handleLocationDataChange(locationName, 'unitValue2028', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`uv2029-${locationName}`}>Unit Value (RPVARA)</Label>
                                        <Input id={`uv2029-${locationName}`} type="text" inputMode="decimal" value={details.unitValue2029} onChange={e => handleLocationDataChange(locationName, 'unitValue2029', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`pt-${locationName}`}>Property Type</Label>
                                        <Select value={details.propertyType} onValueChange={(value: PropertyType) => handleLocationDataChange(locationName, 'propertyType', value)}>
                                            <SelectTrigger id={`pt-${locationName}`}><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Residential">Residential</SelectItem>
                                                <SelectItem value="Commercial">Commercial</SelectItem>
                                                <SelectItem value="Industrial">Industrial</SelectItem>
                                                <SelectItem value="Commercial / Industrial">Commercial / Industrial</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )) : (
                        <div className="text-center text-muted-foreground py-10">
                            {selectedBarangay ? 'No locations found for your search.' : 'Please select a barangay.'}
                        </div>
                    )}
                </div>
            </ScrollArea>
          </CardContent>
        </Card>
       <div className="sticky bottom-4 flex justify-end">
          <Button onClick={handleSaveUnitValues} disabled={isSaving}>
            {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Unit Values'}
          </Button>
        </div>
    </div>
  )
}

function CalibrateSettings({ settings: settingsProp, onSettingsChange }: { settings: TaxSettings, onSettingsChange: (newSettings: TaxSettings) => void }) {
    const { toast } = useToast();
    const [formValues, setFormValues] = useState<any>({ assessmentLevels: {}, taxRates: {} });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (settingsProp) {
            setIsLoading(true);
            const initialFormValues: any = { assessmentLevels: {}, taxRates: {} };
            Object.entries(settingsProp.assessmentLevels).forEach(([key, value]) => {
                initialFormValues.assessmentLevels[key] = (value * 100).toString();
            });
            Object.entries(settingsProp.taxRates).forEach(([key, value]) => {
                initialFormValues.taxRates[key] = (value * 100).toString();
            });
            setFormValues(initialFormValues);
            setIsLoading(false);
        }
    }, [settingsProp]);

    const handleSettingChange = ( category: 'assessmentLevels' | 'taxRates', key: string, value: string) => {
        if (formValues === null) return;
        
        if (value === '') {
            setFormValues((prev: any) => ({
                ...prev,
                [category]: { ...prev[category], [key]: '' },
            }));
            return;
        }

        if (!/^\d*\.?\d*$/.test(value)) {
            return;
        }
        
        let finalValue = value;
        if (formValues[category][key] === "0" && value.length > 1 && !value.startsWith("0.")) {
           finalValue = value.substring(1);
        }
        
        setFormValues((prev: any) => {
            if (!prev) return null;
            const newCategory = { ...prev[category], [key]: finalValue };
            return { ...prev, [category]: newCategory };
        });
    };
    
    const handleSave = async () => {
        setIsSaving(true);
        try {
            if(!formValues || !settingsProp) return;

            const updatedSettings = JSON.parse(JSON.stringify(settingsProp));

            for (const key in formValues.assessmentLevels) {
                let val = parseFloat(formValues.assessmentLevels[key]);
                if (isNaN(val)) val = 0;
                updatedSettings.assessmentLevels[key] = val / 100;
            }
            for (const key in formValues.taxRates) {
                let val = parseFloat(formValues.taxRates[key]);
                if (isNaN(val)) val = 0;
                updatedSettings.taxRates[key] = val / 100;
            }

            onSettingsChange(updatedSettings);

            toast({ title: 'Success!', description: 'Settings have been saved. Reloading...' });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message || "Could not save settings." });
            setIsSaving(false);
        }
    };
    
    if (isLoading) {
        return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                <CardHeader>
                    <CardTitle>Assessment Levels</CardTitle>
                    <CardDescription>Set the assessment level percentage (e.g., 20 for 20%).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {formValues && Object.entries(formValues.assessmentLevels).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between space-x-4">
                            <Label htmlFor={`assessment-${key}`}>{key}</Label>
                            <Input id={`assessment-${key}`} type="text" inputMode="decimal" step="1" className="w-32 text-right" value={value as string} onChange={(e) => handleSettingChange('assessmentLevels', key, e.target.value)} />
                        </div>
                    ))}
                </CardContent>
                </Card>
                <Card>
                <CardHeader>
                    <CardTitle>Tax Rates</CardTitle>
                    <CardDescription>Set the tax rate percentage (e.g., 2 for 2%).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {formValues && Object.entries(formValues.taxRates).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between space-x-4">
                            <Label htmlFor={`taxrate-${key}`}>{key}</Label>
                            <Input id={`taxrate-${key}`} type="text" inputMode="decimal" step="0.1" className="w-32 text-right" value={value as string} onChange={(e) => handleSettingChange('taxRates', key, e.target.value)} />
                        </div>
                    ))}
                </CardContent>
                </Card>
            </div>
            <div className="sticky bottom-4 flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Calibrations'}
                </Button>
            </div>
        </div>
    )
}
