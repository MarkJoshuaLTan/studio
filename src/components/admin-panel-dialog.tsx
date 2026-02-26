"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings, Loader2, ArrowLeft, X, Maximize2, Minimize2 } from "lucide-react";
import type { TaxSettings, LocationDetails, PropertyType } from "@/lib/definitions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function AdminPanelDialog({ settings, onSettingsChange }: { settings: TaxSettings | null, onSettingsChange: (newSettings: TaxSettings) => void }) {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [hasUnappliedChanges, setHasUnappliedChanges] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

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

  const handleSaveSuccess = () => {
    setHasUnappliedChanges(true);
  };

  const handleClose = () => {
    if (hasUnappliedChanges) {
      window.location.reload();
    } else {
      setOpen(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsMaximized(false);
    localStorage.removeItem("admin-auth");
    handleClose();
  };

  const onDialogClose = (isOpen: boolean) => {
    if (!isOpen) {
      handleClose();
      setIsMaximized(false);
    } else {
      setOpen(true);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onDialogClose}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Admin Panel" title="Admin Panel">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent 
        showClose={false}
        className={cn(
          "p-0 border-none transition-all duration-300 ease-in-out overflow-hidden shadow-2xl",
          isAuthenticated 
            ? isMaximized
              ? "max-w-full w-full h-full max-h-full left-0 top-0 translate-x-0 translate-y-0 rounded-none bg-background" 
              : "max-w-6xl w-[calc(100vw-2rem)] h-[85vh] rounded-2xl bg-background/95 backdrop-blur-2xl border border-white/10"
            : "max-w-md w-[calc(100vw-2rem)] h-auto max-h-[85vh] rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 text-white backdrop-blur-3xl border border-white/5"
        )}
      >
          {!isAuthenticated ? (
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-green-500 z-50">
              <X className="h-5 w-5 text-neutral-400 hover:text-white" />
              <span className="sr-only">Close</span>
            </DialogClose>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-green-500 z-50 text-neutral-400 hover:text-foreground"
              onClick={() => setIsMaximized(!isMaximized)}
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              <span className="sr-only">{isMaximized ? "Restore" : "Maximize"}</span>
            </Button>
          )}

          <div className={cn("flex flex-col h-full", !isAuthenticated && "p-8")}>
            <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-6", isAuthenticated && "px-6 pt-6")}>
              <DialogTitle className="text-2xl font-bold tracking-tight">Admin Panel</DialogTitle>
              <DialogDescription className="text-sm text-neutral-400">
                {isAuthenticated ? "Manage application settings." : "Please log in to continue."}
              </DialogDescription>
            </div>

            <AdminPanel 
              isAuthenticated={isAuthenticated}
              onLoginSuccess={handleLoginSuccess}
              onLogout={handleLogout}
              isLoadingAuth={isLoadingAuth}
              onClose={handleClose}
              settings={settings}
              onSettingsChange={onSettingsChange}
              onSaveSuccess={handleSaveSuccess}
            />
          </div>
      </DialogContent>
    </Dialog>
  );
}


function AdminPanel({ isAuthenticated, onLoginSuccess, onLogout, isLoadingAuth, onClose, settings, onSettingsChange, onSaveSuccess }: { isAuthenticated: boolean; onLoginSuccess: () => void; onLogout: () => void; isLoadingAuth: boolean; onClose: () => void; settings: TaxSettings | null, onSettingsChange: (newSettings: TaxSettings) => void; onSaveSuccess: () => void; }) {
  if (isLoadingAuth) {
     return <div className="flex-1 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-green-500" /></div>
  }

  return (
      <div className="flex-1 overflow-hidden">
        {isAuthenticated ? (
            <AdminTabs onLogout={onLogout} onClose={onClose} settings={settings} onSettingsChange={onSettingsChange} onSaveSuccess={onSaveSuccess} />
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
      <Card className="w-full bg-black/40 border-white/10 shadow-2xl rounded-2xl backdrop-blur-xl">
        <form onSubmit={handleLogin}>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Login</CardTitle>
            <CardDescription className="text-neutral-400">
              Enter your credentials to access the admin panel.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-neutral-300">Username</Label>
              <Input
                id="username"
                type="text"
                required
                className="bg-neutral-900/50 border-neutral-700 text-white focus-visible:ring-green-500 transition-all h-11"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-neutral-300">Password</Label>
              <Input
                id="password"
                type="password"
                required
                className="bg-neutral-900/50 border-neutral-700 text-white focus-visible:ring-green-500 transition-all h-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-8">
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold transition-all rounded-xl h-12 shadow-lg shadow-green-900/20" 
              disabled={isLoading}
            >
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : "Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

function AdminTabs({ onLogout, onClose, settings, onSettingsChange, onSaveSuccess }: { onLogout: () => void; onClose: () => void; settings: TaxSettings | null, onSettingsChange: (newSettings: TaxSettings) => void; onSaveSuccess: () => void; }) {
  return (
    <div className="h-full flex flex-col px-6 pb-6">
       <Tabs defaultValue="dashboard" className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="h-11">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="calibrate">Calibrate</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={onClose}><ArrowLeft className="mr-2 h-4 w-4"/> Back to App</Button>
            <Button variant="outline" className="glass-card" onClick={onLogout}>Logout</Button>
          </div>
        </div>
        <TabsContent value="dashboard" className="flex-1 overflow-y-auto pr-2">
            {settings && <AdminDashboard settings={settings} onSettingsChange={onSettingsChange} onSaveSuccess={onSaveSuccess} />}
        </TabsContent>
        <TabsContent value="calibrate" className="flex-1 overflow-y-auto pr-2">
            {settings && <CalibrateSettings settings={settings} onSettingsChange={onSettingsChange} onSaveSuccess={onSaveSuccess} />}
        </TabsContent>
      </Tabs>
    </div>
  )
}


function AdminDashboard({ settings: settingsProp, onSettingsChange, onSaveSuccess }: { settings: TaxSettings, onSettingsChange: (newSettings: TaxSettings) => void; onSaveSuccess: () => void; }) {
  const { toast } = useToast();
  const [editedSettings, setEditedSettings] = useState<TaxSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedBarangay, setSelectedBarangay] = useState<string>('');
  const [locationSearch, setLocationSearch] = useState('');

  useEffect(() => {
    if (settingsProp) {
        setIsLoading(true);
        setEditedSettings(JSON.parse(JSON.stringify(settingsProp))); 
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
              return newSettings; 
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
      onSaveSuccess();
      toast({ title: 'Success!', description: 'Settings have been saved. They will be applied when you close the panel.' });

    } catch (error: any) {
       toast({ variant: "destructive", title: "Error", description: error.message || "Could not save settings." });
    } finally {
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
    <div className="space-y-8 pb-8">
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle>Unit Value Tax Data</CardTitle>
            <CardDescription>Select a barangay and search for a location to edit its values.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="w-full md:w-1/2">
                    <Label className="mb-1.5 block">Barangay</Label>
                    <Select onValueChange={(value) => { setSelectedBarangay(value); setLocationSearch(''); }} value={selectedBarangay}>
                        <SelectTrigger className="glass-input h-11"><SelectValue placeholder="Select a Barangay" /></SelectTrigger>
                        <SelectContent className="glass-container">
                            {editedSettings && Object.keys(editedSettings.taxData).sort().map(b => <SelectItem key={b} value={b} className="focus:bg-primary/20">{b}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full md:w-1/2">
                    <Label className="mb-1.5 block">Search Location</Label>
                    <Input placeholder="Filter locations..." className="glass-input h-11" value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} disabled={!selectedBarangay} />
                </div>
            </div>
            <ScrollArea className="h-[40vh] rounded-xl border border-white/5 bg-black/20 p-4">
                <div className="space-y-4">
                    {filteredLocations.length > 0 ? filteredLocations.map(([locationName, details]) => (
                        <Card key={locationName} className="glass-card border-white/5 bg-white/5">
                            <CardHeader className="pb-2"><CardTitle className="text-lg">{locationName}</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                    <div className="space-y-2">
                                        <Label htmlFor={`uv2028-${locationName}`}>Unit Value (Current)</Label>
                                        <Input id={`uv2028-${locationName}`} type="text" inputMode="decimal" className="glass-input" value={details.unitValue2028} onChange={e => handleLocationDataChange(locationName, 'unitValue2028', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`uv2029-${locationName}`}>Unit Value (RPVARA)</Label>
                                        <Input id={`uv2029-${locationName}`} type="text" inputMode="decimal" className="glass-input" value={details.unitValue2029} onChange={e => handleLocationDataChange(locationName, 'unitValue2029', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`pt-${locationName}`}>Property Type</Label>
                                        <Select value={details.propertyType} onValueChange={(value: PropertyType) => handleLocationDataChange(locationName, 'propertyType', value)}>
                                            <SelectTrigger id={`pt-${locationName}`} className="glass-input"><SelectValue /></SelectTrigger>
                                            <SelectContent className="glass-container">
                                                <SelectItem value="Residential" className="focus:bg-primary/20">Residential</SelectItem>
                                                <SelectItem value="Commercial" className="focus:bg-primary/20">Commercial</SelectItem>
                                                <SelectItem value="Industrial" className="focus:bg-primary/20">Industrial</SelectItem>
                                                <SelectItem value="Commercial / Industrial" className="focus:bg-primary/20">Commercial / Industrial</SelectItem>
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
       <div className="flex justify-end pt-4">
          <Button onClick={handleSaveUnitValues} className="h-11 px-8 font-bold" disabled={isSaving}>
            {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Unit Values'}
          </Button>
        </div>
    </div>
  )
}

function CalibrateSettings({ settings: settingsProp, onSettingsChange, onSaveSuccess }: { settings: TaxSettings, onSettingsChange: (newSettings: TaxSettings) => void; onSaveSuccess: () => void; }) {
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
                if (formValues.assessmentLevels[key] === '' || isNaN(val)) val = 0;
                updatedSettings.assessmentLevels[key] = val / 100;
            }
            for (const key in formValues.taxRates) {
                let val = parseFloat(formValues.taxRates[key]);
                if (formValues.taxRates[key] === '' || isNaN(val)) val = 0;
                updatedSettings.taxRates[key] = val / 100;
            }

            onSettingsChange(updatedSettings);
            onSaveSuccess();

            toast({ title: 'Success!', description: 'Settings have been saved. They will be applied when you close this panel.' });
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message || "Could not save settings." });
        } finally {
            setIsSaving(false);
        }
    };
    
    if (isLoading) {
        return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="space-y-8 pb-8">
            <div className="grid gap-8 md:grid-cols-2">
                <Card className="glass-card border-white/5">
                <CardHeader>
                    <CardTitle>Assessment Levels</CardTitle>
                    <CardDescription>Set the assessment level percentage (e.g., 20 for 20%).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {formValues && Object.entries(formValues.assessmentLevels).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between space-x-4">
                            <Label htmlFor={`assessment-${key}`} className="font-medium">{key}</Label>
                            <Input id={`assessment-${key}`} type="text" inputMode="decimal" className="w-32 text-right glass-input h-10" value={value as string} onChange={(e) => handleSettingChange('assessmentLevels', key, e.target.value)} />
                        </div>
                    ))}
                </CardContent>
                </Card>
                <Card className="glass-card border-white/5">
                <CardHeader>
                    <CardTitle>Tax Rates</CardTitle>
                    <CardDescription>Set the tax rate percentage (e.g., 2 for 2%).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {formValues && Object.entries(formValues.taxRates).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between space-x-4">
                            <Label htmlFor={`taxrate-${key}`} className="font-medium">{key}</Label>
                            <Input id={`taxrate-${key}`} type="text" inputMode="decimal" className="w-32 text-right glass-input h-10" value={value as string} onChange={(e) => handleSettingChange('taxRates', key, e.target.value)} />
                        </div>
                    ))}
                </CardContent>
                </Card>
            </div>
            <div className="flex justify-end pt-4">
                <Button onClick={handleSave} className="h-11 px-8 font-bold" disabled={isSaving}>
                    {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Calibrations'}
                </Button>
            </div>
        </div>
    )
}