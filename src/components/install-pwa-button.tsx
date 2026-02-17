"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const { toast, dismiss } = useToast();
  const toastIdRef = useRef<string | null>(null);

  const handleInstallClick = useCallback(async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        if (toastIdRef.current) {
          dismiss(toastIdRef.current);
        }
      }
    }
  }, [deferredPrompt, dismiss]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      if (toastIdRef.current) {
        dismiss(toastIdRef.current);
      }
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [dismiss]);


  useEffect(() => {
    // Ensure we only show the toast once
    if (deferredPrompt && !toastIdRef.current) {
      const { id } = toast({
        title: "Install TaxWise App",
        description: "For a better experience, install the app on your desktop.",
        duration: 120000, // Stays for 2 minutes or until action
        action: (
          <ToastAction altText="Install" onClick={handleInstallClick}>
            <Download className="mr-2 h-4 w-4" />
            Install
          </ToastAction>
        ),
      });
      toastIdRef.current = id;
    }
  }, [deferredPrompt, toast, handleInstallClick]);
  
  // This component now only handles logic and doesn't render a button itself.
  return null;
}
