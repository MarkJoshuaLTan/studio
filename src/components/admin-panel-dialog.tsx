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
import { Settings, Loader2, ArrowLeft, X, Save, LogOut, Search } from "lucide-react";
import type { TaxSettings, LocationDetails, PropertyType, SuggestedItem } from "@/lib/definitions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
        <Button variant="ghost" size="icon" aria-label="Admin Panel" title="Admin Panel" className="hover:bg-primary/10">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent 
        showClose={false}
        className={cn(
          "p-0 border-none transition-all duration-500 ease-in-out overflow-hidden shadow-none",
          isAuthenticated 
            ? "max-w-[98vw] w-[98vw] h-[96dvh] rounded-[2rem] bg-white/80 dark:bg-[#0D1210]/60 backdrop-blur-[20px] border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            : "max-w-[90vw] sm:max-w-md md:max-w-[500px] w-full h-auto max-h-[90dvh] rounded-[2.5rem] bg-white dark:bg-[#0B0F1B]/95 border border-black/[0.06] dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
        )}
      >
          {/* Mesh Gradient Background */}
          {isAuthenticated && (
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-[0.03] dark:opacity-[0.02] transition-opacity duration-1000">
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

          <div className={cn("flex flex-col h-full relative z-10", !isAuthenticated ? "p-6 sm:p-10" : "p-0")}>
            {isAuthenticated ? (
              <>
                <DialogTitle className="sr-only">Admin Dashboard</DialogTitle>
                <DialogDescription className="sr-only">
                  Manage application settings and data.
                </DialogDescription>
              </>
            ) : (
              <div className="mb-6 sm:mb-10 space-y-1 text-center sm:text-left">
                <DialogTitle className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">Admin Panel</DialogTitle>
                <DialogDescription className="text-muted-foreground font-medium text-sm sm:text-base">
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
     return <div className="flex-1 flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
  }

  return (
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {isAuthenticated ? (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative z-10">
              <AdminTabs onLogout={onLogout} onClose={onClose} settings={settings} onSettingsChange={onSettingsChange} onSaveSuccess={onSaveSuccess} />
            </div>
        ) : (
            <div className="flex-1 overflow-y-auto md:overflow-hidden p-1">
              <LoginForm onLoginSuccess={onLoginSuccess} />
            </div>
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
    <div className="w-full p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-black/[0.06] dark:border-white/10 bg-white dark:bg-white/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
      <form onSubmit={handleLogin} className="space-y-6 sm:space-y-8">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">Login</h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase tracking-[0.2em]">
            Access secure admin controls
          </p>
        </div>
        
        <div className="space-y-4 sm:space-y-5">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-muted-foreground text-xs sm:text-sm font-semibold ml-1">Username</Label>
            <Input
              id="username"
              type="text"
              required
              className="glass-input h-12 sm:h-14 rounded-xl sm:rounded-2xl border-black/[0.1] dark:border-white/20 bg-background/50 dark:bg-black/40"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-muted-foreground text-xs sm:text-sm font-semibold ml-1">Password</Label>
            <Input
              id="password"
              type="password"
              required
              className="glass-input h-12 sm:h-14 rounded-xl sm:rounded-2xl border-black/[0.1] dark:border-white/20 bg-background/50 dark:bg-black/40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full btn-ios-green h-14 sm:h-16 rounded-[1.25rem] text-base sm:text-lg tracking-wide shadow-lg" 
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
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
       <Tabs defaultValue="dashboard" onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Fixed Header Section */}
        <div className="px-4 md:px-12 pt-8 md:pt-12 mb-10 shrink-0">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="space-y-6 flex-1 w-full lg:w-auto">
              <div className="space-y-1">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground">Admin Dashboard</h1>
                <p className="text-base md:text-lg font-medium text-muted-foreground/70">Manage application settings and data.</p>
              </div>
              <TabsList className="h-14 bg-black/[0.05] dark:bg-black/40 p-1.5 rounded-2xl border border-black/5 dark:border-white/5 shadow-inner w-full md:w-auto">
                <TabsTrigger 
                  value="dashboard" 
                  className="flex-1 md:flex-none rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg px-4 md:px-8 py-2.5 font-bold transition-all duration-300"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="calibrate" 
                  className="flex-1 md:flex-none rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg px-4 md:px-8 py-2.5 font-bold transition-all duration-300"
                >
                  Calibrate
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex flex-wrap items-center gap-3 p-2 bg-black/[0.03] dark:bg-black/20 rounded-[2rem] border border-black/5 dark:border-white/5 backdrop-blur-md w-full lg:w-auto justify-center md:justify-end">
              <Button 
                onClick={handleGlobalSave} 
                disabled={isSaving}
                className="btn-ios-green h-12 px-6 md:px-8 rounded-2xl active:scale-95 transition-transform flex-1 md:flex-none"
              >
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Changes
              </Button>
              <Button variant="ghost" onClick={onClose} className="h-12 px-4 md:px-6 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 text-foreground/80 transition-all font-semibold">
                <ArrowLeft className="mr-2 h-4 w-4"/> Back to App
              </Button>
              <div className="hidden md:block w-px h-8 bg-black/10 dark:bg-white/10 mx-1" />
              <Button 
                variant="outline" 
                className="h-12 px-4 md:px-6 rounded-2xl border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-destructive/20 hover:border-destructive/30 hover:text-destructive-foreground transition-all active:scale-95 font-bold" 
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto premium-scrollbar scroll-smooth px-4 md:px-12 pb-16 min-h-0">
          <TabsContent value="dashboard" className="m-0 focus-visible:ring-0">
              {settings && <AdminDashboard ref={dashboardRef} settings={settings} onSettingsChange={onSettingsChange} onSaveSuccess={onSaveSuccess} />}
          </TabsContent>
          <TabsContent value="calibrate" className="m-0 focus-visible:ring-0">
              {settings && <CalibrateSettings ref={calibrateRef} settings={settings} onSettingsChange={onSettingsChange} onSaveSuccess={onSaveSuccess} />}
          </TabsContent>
        </div>
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
    <div className="space-y-10 pb-8">
        {/* Sticky Barangay/Search Section */}
        <div className="sticky top-0 z-20 -mx-4 px-4 py-6 bg-white/40 dark:bg-[#0D1210]/40 backdrop-blur-xl border-b border-black/5 dark:border-white/5 rounded-b-[2rem] transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
                      className="glass-input h-14 rounded-[18px] border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-black/40 px-6 focus:ring-primary/30" 
                      value={locationSearch} 
                      onChange={(e) => setLocationSearch(e.target.value)} 
                      disabled={!selectedBarangay} 
                    />
                    <Search className="absolute right-5 top-4 h-5 w-5 opacity-20" />
                  </div>
              </div>
          </div>
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-4">
            {filteredLocations.length > 0 ? filteredLocations.map(([locationName, details]) => (
                <Card key={locationName} className="group glass-card border-black/5 dark:border-white/5 bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/[0.08] transition-all duration-500 rounded-[24px] border-l-2 border-l-primary/40 overflow-hidden shadow-xl w-full">
                    <CardHeader className="pb-6 pt-8 px-8">
                      <CardTitle className="text-xl font-black tracking-tight text-foreground/90">{locationName}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-10">
                        <div className="grid grid-cols-3 gap-4 md:gap-8 items-end">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">Current Value</Label>
                                <Input 
                                  type="text" 
                                  inputMode="decimal" 
                                  className="h-12 md:h-14 text-center text-base md:text-lg font-bold rounded-2xl bg-black/[0.03] dark:bg-black/40 border-black/5 dark:border-white/10 focus:ring-primary/20" 
                                  value={details.unitValue2028} 
                                  onChange={e => handleLocationDataChange(locationName, 'unitValue2028', e.target.value)} 
                                />
                            </div>
                            <div className="space-y-3 relative">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary leading-none">RPVARA Value</Label>
                                <Input 
                                  type="text" 
                                  inputMode="decimal" 
                                  className="h-12 md:h-14 text-center text-base md:text-lg font-bold rounded-2xl bg-primary/[0.05] dark:bg-primary/10 border-primary/20 text-primary focus:ring-primary/40 relative z-10" 
                                  value={details.unitValue2029} 
                                  onChange={e => handleLocationDataChange(locationName, 'unitValue2029', e.target.value)} 
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">Type</Label>
                                <Select value={details.propertyType} onValueChange={(value: PropertyType) => handleLocationDataChange(locationName, 'propertyType', value)}>
                                    <SelectTrigger className="h-12 md:h-14 rounded-2xl bg-black/[0.03] dark:bg-black/40 border-black/5 dark:border-white/10 font-bold px-2 md:px-4 text-xs md:text-sm">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="glass-container border-black/10 dark:border-white/10 backdrop-blur-3xl shadow-2xl">
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
                <div className="col-span-full py-24 text-center rounded-[2rem] border-2 border-dashed border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-black/20">
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
        <div className="grid gap-6 md:grid-cols-2 pb-16 transition-all duration-500">
            <Card className="glass-card border-black/5 dark:border-white/5 bg-white/60 dark:bg-white/5 rounded-[24px] border-l-2 border-l-primary/40 overflow-hidden shadow-2xl h-fit">
                <CardHeader className="p-5 md:px-6 md:pt-6 md:pb-3">
                    <CardTitle className="text-lg md:text-xl font-black tracking-tight">Assessment Levels</CardTitle>
                    <CardDescription className="text-xs font-medium opacity-60">Base assessment percentage per property type.</CardDescription>
                </CardHeader>
                <CardContent className="p-5 md:px-6 md:pb-6 md:pt-0 space-y-2">
                    {formValues && Object.entries(formValues.assessmentLevels).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] dark:bg-black/40 border border-black/5 dark:border-white/5 hover:border-primary/30 transition-all group">
                            <Label className="font-bold text-xs md:text-sm tracking-tight text-foreground/80 group-hover:text-foreground transition-colors">{key}</Label>
                            <div className="flex items-center gap-3">
                              <Input type="text" inputMode="decimal" className="w-16 md:w-24 h-9 md:h-10 text-center text-sm md:text-base font-black bg-black/[0.03] dark:bg-white/5 border-black/5 dark:border-white/10 rounded-lg focus:ring-primary/30" value={value as string} onChange={(e) => handleSettingChange('assessmentLevels', key, e.target.value)} />
                              <span className="text-[9px] md:text-[10px] font-black text-primary/40 uppercase tracking-widest">%</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
            
            <Card className="glass-card border-black/5 dark:border-white/5 bg-white/60 dark:bg-white/5 rounded-[24px] border-l-2 border-l-primary/40 overflow-hidden shadow-2xl h-fit">
                <CardHeader className="p-5 md:px-6 md:pt-6 md:pb-3">
                    <CardTitle className="text-lg md:text-xl font-black tracking-tight">Tax Rates</CardTitle>
                    <CardDescription className="text-xs font-medium opacity-60">Annual tax percentage applied to assessed value.</CardDescription>
                </CardHeader>
                <CardContent className="p-5 md:px-6 md:pb-6 md:pt-0 space-y-2">
                    {formValues && Object.entries(formValues.taxRates).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] dark:bg-black/40 border border-black/5 dark:border-white/5 hover:border-primary/30 transition-all group">
                            <Label className="font-bold text-xs md:text-sm tracking-tight text-foreground/80 group-hover:text-foreground transition-colors">{key}</Label>
                            <div className="flex items-center gap-3">
                              <Input type="text" inputMode="decimal" className="w-16 md:w-24 h-9 md:h-10 text-center text-sm md:text-base font-black bg-black/[0.03] dark:bg-white/5 border-black/5 dark:border-white/10 rounded-lg focus:ring-primary/30" value={value as string} onChange={(e) => handleSettingChange('taxRates', key, e.target.value)} />
                              <span className="text-[9px] md:text-[10px] font-black text-primary/40 uppercase tracking-widest">%</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
});
CalibrateSettings.displayName = "CalibrateSettings";