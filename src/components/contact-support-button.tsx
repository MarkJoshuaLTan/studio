"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Headset } from "lucide-react";

export function ContactSupportButton() {
  const { toast } = useToast();

  const handleContactClick = () => {
    toast({
      title: "Contact Support",
      description: "For any concerns or problems, please email us at: taxwise.dev@gmail.com",
      duration: 10000,
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleContactClick}
      aria-label="Contact Support"
      title="Contact Support"
    >
      <Headset className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
}
