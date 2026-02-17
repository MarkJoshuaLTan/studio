"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Headset, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ContactSupportButton() {
  const email = "taxwise.dev@gmail.com";
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const onCopy = () => {
    navigator.clipboard.writeText(email);
    setHasCopied(true);
    toast({
      title: "Email address copied!",
      duration: 2000,
    });
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Contact Support"
          title="Contact Support"
        >
          <Headset className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Contact Support</h4>
          <p className="text-sm text-muted-foreground">
            For any concerns or problems, please email us.
          </p>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Input
            value={email}
            readOnly
            className="h-9 flex-1"
          />
          <Button variant="outline" size="icon" className="h-9 px-3" onClick={onCopy}>
            <span className="sr-only">Copy</span>
            {hasCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
