"use client";

import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
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
import { Settings, Loader2, ArrowLeft, X, Maximize2, Minimize2, Save, LogOut } from "lucide-react";
import type { TaxSettings, LocationDetails, PropertyType, SuggestedItem } from "@/lib/definitions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AutocompleteInput } from "./autocomplete-input";
import { cn } from "@/lib/utils";

export function AdminPanelDialog({ settings, onSettingsChange }: { settings: TaxSettings | null, onSettingsChange: (newSettings: TaxSettings) => void }) {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [hasUnappliedChanges, setHasUnappliedChanges] = useState(false);

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
    localStorage.removeItem("admin-auth");
    handleClose();
  };

  const onDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
      handleClose();
    } else {
      setOpen(true);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onDialogChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Admin Panel" title="Admin Panel">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent 
        showClose={false}
        className={cn(
          "p-0 border-none transition-all duration-500 ease-in-out overflow-hidden shadow-none",
          isAuthenticated 
            ? "max-w-[98vw] w-[98vw] h-[96vh] rounded-[2rem] bg-[#141E19]/65 backdrop-blur-[30px] border border-primary/15 shadow-[0_0_50px_rgba(34,197,94,0.1)]"
            : "max-w-md w-[calc(100vw-2rem)] h-auto max-h-[85vh] rounded-[2.5rem] bg-white dark:bg-[#0B0F1B]/95 border border-black/[0.06] dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] shadow-primary/20"
        )}
      >
          {/* Mesh Gradient Background for Authenticated State */}
          {isAuthenticated && (
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
              <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
              <div className="absolute bottom-[-20%] right-[-5%] w-[60%] h-[60%] bg-emerald-500/5 rounded-full blur-[120px] animate-[pulse_10s_infinite]" />
            </div>
          )}

          {!isAuthenticated && (
            <DialogClose className="absolute right-6 top-6 rounded-full border border-primary/50 p-1.5 opacity-70 transition-all hover:opacity-100 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary z-50">
              <X className="h-5 w-5 text-primary" />
              <span className="sr-only">Close</span>
            </DialogClose>
          )}

          <div className={cn("flex flex-col h-full relative z-10", !isAuthenticated ? "p-10" : "p-0")}>
            {!isAuthenticated && (
              <div className="mb-10 space-y-1">
                <DialogTitle className="text-4xl font-extrabold tracking-tight text-foreground">Admin Panel</DialogTitle>
                <DialogDescription className="text-muted-foreground font-medium text-base">
                  Please log in to continue.
                </DialogDescription>
              </div>
            )}

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
    <div className="w-full p-8 rounded-[2.5rem] border border-black/[0.06] dark:border-white/10 bg-white dark:bg-white/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
      <form onSubmit={handleLogin} className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-foreground tracking-tight">Login</h3>
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-[0.2em]">
            Access secure admin controls
          </p>
        </div>
        
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-muted-foreground text-sm font-semibold ml-1">Username</Label>
            <Input
              id="username"
              type="text"
              required
              className="glass-input h-14 rounded-2xl border-black/[0.1] dark:border-white/20 bg-background/50 dark:bg-black/40"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-muted-foreground text-sm font-semibold ml-1">Password</Label>
            <Input
              id="password"
              type="password"
              required
              className="glass-input h-14 rounded-2xl border-black/[0.1] dark:border-white/20 bg-background/50 dark:bg-black/40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full btn-ios-green h-16 rounded-[1.25rem] text-lg tracking-wide shadow-lg" 
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Sign in"}
        </Button>
      </form>
    </div>
  )
}

function AdminTabs({ onLogout, onClose, settings, onSettingsChange, onSaveSuccess }: { onLogout: () => void; onClose: () => void; settings: TaxSettings | null, onSettingsChange: (newSettings: TaxSettings) => void; onSaveSuccess: () => void; }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const dashboardRef = useRef<{ save: () => Promise<void> } | null>(null);
  const calibrateRef = useRef<{ save: () => Promise<void> } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleGlobalSave = async () => {
    setIsSaving(true);
    try {
      if (activeTab === "dashboard" && dashboardRef.current) {
        await dashboardRef.current.save();
      } else if (activeTab === "calibrate" && calibrateRef.current) {
        await calibrateRef.current.save();
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-full flex flex-col px-12 pt-12 pb-10">
       <Tabs defaultValue="dashboard" onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          <div className="space-y-6 flex-1">
            <div className="space-y-1">
              <h1 className="text-5xl font-black tracking-tighter text-foreground">Admin Dashboard</h1>
              <p className="text-lg font-medium text-muted-foreground/70">Manage application settings and data.</p>
            </div>
            <TabsList className="h-14 bg-black/40 dark:bg-black/60 p-1.5 rounded-2xl border border-white/5 shadow-inner">
              <TabsTrigger 
                value="dashboard" 
                className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg px-8 py-2.5 font-bold transition-all duration-300"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="calibrate" 
                className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg px-8 py-2.5 font-bold transition-all duration-300"
              >
                Calibrate
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex items-center gap-3 p-2 bg-black/20 rounded-[2rem] border border-white/5 backdrop-blur-md">
            <Button 
              onClick={handleGlobalSave} 
              disabled={isSaving}
              className="btn-ios-green h-12 px-8 rounded-2xl active:scale-95 transition-transform"
            >
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
            <Button variant="ghost" onClick={onClose} className="h-12 px-6 rounded-2xl hover:bg-white/5 text-foreground/80 transition-all font-semibold">
              <ArrowLeft className="mr-2 h-4 w-4"/> Back to App
            </Button>
            <div className="w-px h-8 bg-white/10 mx-1" />
            <Button 
              variant="outline" 
              className="h-12 px-6 rounded-2xl border-white/10 bg-white/5 hover:bg-destructive/20 hover:border-destructive/30 hover:text-destructive-foreground transition-all active:scale-95 font-bold" 
              onClick={onLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <TabsContent value="dashboard" className="flex-1 overflow-y-auto pr-2 m-0 focus-visible:ring-0">
            {settings && <AdminDashboard ref={dashboardRef} settings={settings} onSettingsChange={onSettingsChange} onSaveSuccess={onSaveSuccess} />}
        </TabsContent>
        <TabsContent value="calibrate" className="flex-1 overflow-y-auto pr-2 m-0 focus-visible:ring-0">
            {settings && <CalibrateSettings ref={calibrateRef} settings={settings} onSettingsChange={onSettingsChange} onSaveSuccess={onSaveSuccess} />}
        </TabsContent>
      </Tabs>
    </div>
  )
}


const AdminDashboard = forwardRef(({ settings: settingsProp, onSettingsChange, onSaveSuccess }: { settings: TaxSettings, onSettingsChange: (newSettings: TaxSettings) => void; onSaveSuccess: () => void; }, ref) => {
  const { toast } = useToast();
  const [editedSettings, setEditedSettings] = useState<TaxSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBarangay, setSelectedBarangay] = useState<string>('');
  const [barangaySearch, setBarangaySearch] = useState("");
  const [locationSearch, setLocationSearch] = useState('');

  useEffect(() => {
    if (settingsProp) {
        if (!editedSettings) {
          setIsLoading(true);
        }
        setEditedSettings(JSON.parse(JSON.stringify(settingsProp))); 
        if (!selectedBarangay) {
            setSelectedBarangay(Object.keys(settingsProp.taxData).sort()[0] || '');
        }
        setIsLoading(false);
    }
  }, [settingsProp]);

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
      toast({ title: 'Success!', description: 'Valuation data has been saved locally.' });

    } catch (error: any) {
       toast({ variant: "destructive", title: "Error", description: error.message || "Could not save settings." });
       throw error;
    }
  };

  useImperativeHandle(ref, () => ({
    save: handleSaveUnitValues
  }));

  const filteredLocations = editedSettings && selectedBarangay && editedSettings.taxData[selectedBarangay]
    ? Object.entries(editedSettings.taxData[selectedBarangay]).filter(([name]) =>
        name.toLowerCase().includes(locationSearch.toLowerCase())
      )
    : [];

  const barangaySuggestions: SuggestedItem[] = editedSettings 
    ? Object.keys(editedSettings.taxData).sort().map(name => ({ name, type: 'barangay' }))
    : [];

  const filteredBarangaySuggestions = barangaySuggestions.filter(b => 
    b.name.toLowerCase().includes(barangaySearch.toLowerCase())
  );

  if (isLoading || !editedSettings) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-3">
                <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-primary ml-1">Select Barangay</Label>
                <AutocompleteInput
                    placeholder="Search for a barangay..."
                    suggestions={filteredBarangaySuggestions}
                    onInputChange={setBarangaySearch}
                    onSelect={(item) => {
                        if (item) setSelectedBarangay(item.name);
                    }}
                    value={selectedBarangay ? { name: selectedBarangay, type: 'barangay' } : null}
                    onOpen={() => setBarangaySearch("")}
                    disablePortal={true}
                />
            </div>
            <div className="space-y-3">
                <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-primary ml-1">Search Location</Label>
                <div className="relative">
                  <Input 
                    placeholder="Filter locations by name..." 
                    className="glass-input h-14 rounded-[18px] border-white/10 bg-black/40 px-6 focus:ring-primary/30" 
                    value={locationSearch} 
                    onChange={(e) => setLocationSearch(e.target.value)} 
                    disabled={!selectedBarangay} 
                  />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredLocations.length > 0 ? filteredLocations.map(([locationName, details]) => (
                <Card key={locationName} className="group glass-card border-white/5 bg-white/5 hover:bg-white/[0.08] transition-all duration-500 rounded-[24px] border-l-4 border-l-primary overflow-hidden shadow-xl">
                    <CardHeader className="pb-6 pt-8 px-8">
                      <CardTitle className="text-xl font-black tracking-tight text-foreground/90">{locationName}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-10">
                        <div className="grid grid-cols-3 gap-8 items-end">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">Current Value</Label>
                                <Input 
                                  type="text" 
                                  inputMode="decimal" 
                                  className="h-14 text-center text-lg font-bold rounded-2xl bg-black/40 border-white/10 focus:ring-primary/20" 
                                  value={details.unitValue2028} 
                                  onChange={e => handleLocationDataChange(locationName, 'unitValue2028', e.target.value)} 
                                />
                            </div>
                            <div className="space-y-3 relative">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary leading-none">RPVARA Value</Label>
                                <div className="absolute inset-0 top-6 bg-primary/10 blur-[20px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                <Input 
                                  type="text" 
                                  inputMode="decimal" 
                                  className="h-14 text-center text-lg font-bold rounded-2xl bg-primary/10 border-primary/20 text-primary shadow-[0_0_20px_rgba(34,197,94,0.1)] focus:ring-primary/40 relative z-10" 
                                  value={details.unitValue2029} 
                                  onChange={e => handleLocationDataChange(locationName, 'unitValue2029', e.target.value)} 
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">Type</Label>
                                <Select value={details.propertyType} onValueChange={(value: PropertyType) => handleLocationDataChange(locationName, 'propertyType', value)}>
                                    <SelectTrigger className="h-14 rounded-2xl bg-black/40 border-white/10 font-bold px-4">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="glass-container border-white/10 backdrop-blur-3xl shadow-2xl">
                                        <SelectItem value="Residential" className="focus:bg-primary/20 rounded-lg">Residential</SelectItem>
                                        <SelectItem value="Commercial" className="focus:bg-primary/20 rounded-lg">Commercial</SelectItem>
                                        <SelectItem value="Industrial" className="focus:bg-primary/20 rounded-lg">Industrial</SelectItem>
                                        <SelectItem value="Commercial / Industrial" className="focus:bg-primary/20 rounded-lg">Commercial / Industrial</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )) : (
                <div className="col-span-full py-24 text-center rounded-[2rem] border-2 border-dashed border-white/5 bg-black/20">
                    <p className="text-xl font-medium text-muted-foreground opacity-40 italic">
                        {selectedBarangay ? 'No locations found for your search.' : 'Please select a barangay to view data.'}
                    </p>
                </div>
            )}
        </div>
    </div>
  )
});
AdminDashboard.displayName = "AdminDashboard";

const CalibrateSettings = forwardRef(({ settings: settingsProp, onSettingsChange, onSaveSuccess }: { settings: TaxSettings, onSettingsChange: (newSettings: TaxSettings) => void; onSaveSuccess: () => void; }, ref) => {
    const { toast } = useToast();
    const [formValues, setFormValues] = useState<any>({ assessmentLevels: {}, taxRates: {} });
    const [isLoading, setIsLoading] = useState(true);

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

            toast({ title: 'Success!', description: 'Calibration parameters saved.' });
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message || "Could not save settings." });
            throw error;
        }
    };

    useImperativeHandle(ref, () => ({
      save: handleSave
    }));
    
    if (isLoading) {
        return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    }

    return (
        <div className="grid gap-10 md:grid-cols-2 pb-16">
            <Card className="glass-card border-white/5 bg-white/5 rounded-[32px] border-l-4 border-l-primary overflow-hidden shadow-2xl">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-2xl font-black tracking-tight">Assessment Levels</CardTitle>
                    <CardDescription className="text-sm font-medium opacity-60">Base assessment percentage per property type.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-4">
                    {formValues && Object.entries(formValues.assessmentLevels).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-primary/30 transition-all group">
                            <Label className="font-bold text-base tracking-tight text-foreground/80 group-hover:text-foreground transition-colors">{key}</Label>
                            <div className="flex items-center gap-4">
                              <Input type="text" inputMode="decimal" className="w-28 h-12 text-center text-lg font-black bg-white/5 border-white/10 rounded-xl focus:ring-primary/30" value={value as string} onChange={(e) => handleSettingChange('assessmentLevels', key, e.target.value)} />
                              <span className="text-xs font-black text-primary/40 uppercase tracking-widest">%</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
            
            <Card className="glass-card border-white/5 bg-white/5 rounded-[32px] border-l-4 border-l-primary overflow-hidden shadow-2xl">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-2xl font-black tracking-tight">Tax Rates</CardTitle>
                    <CardDescription className="text-sm font-medium opacity-60">Annual tax percentage applied to assessed value.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-4">
                    {formValues && Object.entries(formValues.taxRates).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-primary/30 transition-all group">
                            <Label className="font-bold text-base tracking-tight text-foreground/80 group-hover:text-foreground transition-colors">{key}</Label>
                            <div className="flex items-center gap-4">
                              <Input type="text" inputMode="decimal" className="w-28 h-12 text-center text-lg font-black bg-white/5 border-white/10 rounded-xl focus:ring-primary/30" value={value as string} onChange={(e) => handleSettingChange('taxRates', key, e.target.value)} />
                              <span className="text-xs font-black text-primary/40 uppercase tracking-widest">%</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
});
CalibrateSettings.displayName = "CalibrateSettings";
