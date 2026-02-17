"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings, Loader2, ArrowLeft, Mail, Trash2, Eye, EyeOff } from "lucide-react";
import type { TaxSettings, LocationDetails, PropertyType, Report } from "@/lib/definitions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export function AdminPanelDialog() {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    // This effect runs once on mount to check the initial state on the client.
    const auth = localStorage.getItem("admin-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoadingAuth(false);
  }, []);

  // When dialog opens, recheck auth in case it changed in another tab.
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
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Admin Panel" title="Admin Panel">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Admin Panel</DialogTitle>
            <DialogDescription>
              {isAuthenticated ? "Manage application settings and view reports." : "Please login to continue."}
            </DialogDescription>
          </DialogHeader>
          <AdminPanel 
            isAuthenticated={isAuthenticated}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
            isLoadingAuth={isLoadingAuth}
            onClose={() => setOpen(false)}
          />
      </DialogContent>
    </Dialog>
  );
}


function AdminPanel({ isAuthenticated, onLoginSuccess, onLogout, isLoadingAuth, onClose }: { isAuthenticated: boolean; onLoginSuccess: () => void; onLogout: () => void; isLoadingAuth: boolean; onClose: () => void; }) {
  if (isLoadingAuth) {
     return <div className="flex-1 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  return (
      <div className="flex-1 overflow-hidden pt-4">
        {isAuthenticated ? (
            <AdminTabs onLogout={onLogout} onClose={onClose} />
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

function AdminTabs({ onLogout, onClose }: { onLogout: () => void; onClose: () => void; }) {
  return (
    <div className="h-full flex flex-col">
       <Tabs defaultValue="dashboard" className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center pr-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="calibrate">Calibrate</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={onClose}><ArrowLeft className="mr-2 h-4 w-4"/> Back to App</Button>
            <Button variant="outline" onClick={() => { onLogout(); onClose(); }}>Logout</Button>
          </div>
        </div>
        <TabsContent value="dashboard" className="flex-1 overflow-y-auto mt-4 pr-4">
            <AdminDashboard />
        </TabsContent>
        <TabsContent value="calibrate" className="flex-1 overflow-y-auto mt-4 pr-4">
            <CalibrateSettings />
        </TabsContent>
        <TabsContent value="reports" className="flex-1 overflow-y-auto mt-4 pr-4">
            <ViewReports />
        </TabsContent>
      </Tabs>
    </div>
  )
}


function AdminDashboard() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedBarangay, setSelectedBarangay] = useState<string>('');
  const [locationSearch, setLocationSearch] = useState('');

  useEffect(() => {
      const fetchSettings = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('/api/settings');
          if (!response.ok) throw new Error("Failed to fetch settings.");
          const data = await response.json();
          setSettings(data);
          if (data?.taxData && !selectedBarangay) {
            setSelectedBarangay(Object.keys(data.taxData)[0] || '');
          }
        } catch (error) {
          toast({ variant: "destructive", title: "Error", description: "Could not load settings." });
        } finally {
          setIsLoading(false);
        }
      };
      fetchSettings();
  }, [toast]);
  
  const handleLocationDataChange = (locationName: string, field: keyof LocationDetails, value: string) => {
    if (!settings || !selectedBarangay) return;

    setSettings((prev: TaxSettings) => {
      if (!prev) return null;
      const newSettings = JSON.parse(JSON.stringify(prev));
      const location = newSettings.taxData[selectedBarangay][locationName];
      
      if (field === 'unitValue2028' || field === 'unitValue2029') {
        const currentVal = location[field];
        if (currentVal === "0" && value.length > 1 && !value.startsWith("0.")) {
            location[field] = value.substring(1);
        } else {
            location[field] = value;
        }

      } else {
        location[field] = value;
      }
      return newSettings;
    });
  };
  
  const handleSaveUnitValues = async () => {
    setIsSaving(true);
    try {
      if(!settings) return;
      
      const settingsToSave = JSON.parse(JSON.stringify(settings));
      
      for (const barangay in settingsToSave.taxData) {
          for (const location in settingsToSave.taxData[barangay]) {
              const details = settingsToSave.taxData[barangay][location];
              if (details.unitValue2028 === '' || isNaN(parseFloat(details.unitValue2028))) {
                  details.unitValue2028 = 0;
              } else {
                  details.unitValue2028 = parseFloat(details.unitValue2028);
              }
              if (details.unitValue2029 === '' || isNaN(parseFloat(details.unitValue2029))) {
                  details.unitValue2029 = 0;
              } else {
                  details.unitValue2029 = parseFloat(details.unitValue2029);
              }
          }
      }

      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: settingsToSave, password: 'admin2026' }),
      });
      if (!response.ok) throw new Error('Failed to save settings.');
      setSettings(settingsToSave);
      toast({ title: 'Success!', description: 'Settings have been saved.' });
    } catch (error: any) {
       toast({ variant: "destructive", title: "Error", description: error.message || "Could not save settings." });
    } finally {
      setIsSaving(false);
    }
  };


  const filteredLocations = settings && selectedBarangay && settings.taxData[selectedBarangay]
    ? Object.entries(settings.taxData[selectedBarangay]).filter(([name]) =>
        name.toLowerCase().includes(locationSearch.toLowerCase())
      )
    : [];

  if (isLoading) {
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
                            {settings && Object.keys(settings.taxData).sort().map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
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

function CalibrateSettings() {
    const { toast } = useToast();
    const [settings, setSettings] = useState<any>(null);
    const [fullSettings, setFullSettings] = useState<TaxSettings | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            setIsLoading(true);
            try {
            const response = await fetch('/api/settings');
            if (!response.ok) throw new Error("Failed to fetch settings.");
            const data: TaxSettings = await response.json();
            
            const initialSettings: any = { assessmentLevels: {}, taxRates: {} };
             Object.entries(data.assessmentLevels).forEach(([key, value]) => {
                initialSettings.assessmentLevels[key] = (value * 100).toString();
            });
            Object.entries(data.taxRates).forEach(([key, value]) => {
                initialSettings.taxRates[key] = (value * 100).toString();
            });

            setSettings(initialSettings);
            setFullSettings(data);
            } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Could not load settings." });
            } finally {
            setIsLoading(false);
            }
        };
        fetchSettings();
    }, [toast]);

    const handleSettingChange = ( category: 'assessmentLevels' | 'taxRates', key: string, value: string) => {
        if (settings === null) return;
        
        let finalValue = value;
        const currentVal = settings[category][key];

        if (currentVal === "0" && value.length > 1 && !value.startsWith("0.")) {
           finalValue = value.substring(1);
        }
        
        if (finalValue === '' || /^\d*\.?\d*$/.test(finalValue)) {
            setSettings((prevSettings: any) => {
                if (!prevSettings) return null;
                const newCategory = { ...prevSettings[category], [key]: finalValue };
                return { ...prevSettings, [category]: newCategory };
            });
        }
    };
    
    const handleSave = async () => {
        setIsSaving(true);
        try {
            if(!settings || !fullSettings) return;

            const updatedSettings = JSON.parse(JSON.stringify(fullSettings));

            for (const key in settings.assessmentLevels) {
                let val = parseFloat(settings.assessmentLevels[key]);
                if (isNaN(val)) val = 0;
                updatedSettings.assessmentLevels[key] = val / 100;
            }
            for (const key in settings.taxRates) {
                let val = parseFloat(settings.taxRates[key]);
                if (isNaN(val)) val = 0;
                updatedSettings.taxRates[key] = val / 100;
            }

            const response = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ settings: updatedSettings, password: 'admin2026' }),
            });
            if (!response.ok) throw new Error('Failed to save settings.');
            toast({ title: 'Success!', description: 'Settings have been saved.' });
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
        <div className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                <CardHeader>
                    <CardTitle>Assessment Levels</CardTitle>
                    <CardDescription>Set the assessment level percentage (e.g., 20 for 20%).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {settings && Object.entries(settings.assessmentLevels).map(([key, value]) => (
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
                    {settings && Object.entries(settings.taxRates).map(([key, value]) => (
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


function ViewReports() {
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReports = useCallback(async () => {
    try {
      const response = await fetch('/api/report');
      if (!response.ok) throw new Error("Failed to fetch reports.");
      const data: Report[] = await response.json();
      setReports(data);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not load reports." });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);
  
  const handleToggleRead = async (id: string) => {
    try {
      const response = await fetch('/api/report', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password: 'admin2026' }),
      });
      if (!response.ok) throw new Error("Failed to update report status.");
      await fetchReports();
    } catch(error: any) {
       toast({ variant: "destructive", title: "Error", description: error.message || "Could not update report." });
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/report', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password: 'admin2026' }),
      });
      if (!response.ok) throw new Error("Failed to delete report.");
      toast({ title: "Success", description: "Report deleted."});
      await fetchReports();
    } catch(error: any) {
       toast({ variant: "destructive", title: "Error", description: error.message || "Could not delete report." });
    }
  }

  if (isLoading) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      {reports.length > 0 ? (
        reports.map((report) => (
            <Card key={report.id} className={!report.read ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                             <Mail className="h-5 w-5 text-muted-foreground" />
                            {report.email}
                        </CardTitle>
                        <CardDescription>
                            {format(new Date(report.createdAt), "PPP p")}
                        </CardDescription>
                    </div>
                    {!report.read && <Badge>Unread</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{report.message}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => handleToggleRead(report.id)}>
                  {report.read ? <EyeOff className="mr-2 h-4 w-4"/> : <Eye className="mr-2 h-4 w-4"/>}
                  {report.read ? 'Mark as Unread' : 'Mark as Read'}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4"/>Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the report.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(report.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
        ))
      ) : (
        <div className="text-center text-muted-foreground py-20 border-2 border-dashed rounded-lg">
          <p>No reports found.</p>
        </div>
      )}
    </div>
  );
}
