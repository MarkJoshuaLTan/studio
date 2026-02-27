"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SuggestedItem } from "@/lib/definitions";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AutocompleteInputProps {
  placeholder: string;
  suggestions: SuggestedItem[];
  onInputChange: (value: string) => void;
  onSelect: (item: SuggestedItem | null) => void;
  value: SuggestedItem | null;
  isLoading?: boolean;
  disabled?: boolean;
  onOpen?: () => void;
}

export function AutocompleteInput({
  placeholder,
  suggestions,
  onInputChange,
  onSelect,
  value,
  isLoading = false,
  disabled = false,
  onOpen,
}: AutocompleteInputProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    if (value) {
      setSearchValue(value.name);
    } else {
      setSearchValue("");
    }
  }, [value]);

  const handleInputChange = (val: string) => {
    setSearchValue(val);
    onInputChange(val);
    if (!open) setOpen(true);
  };

  const handleSelect = (item: SuggestedItem) => {
    onSelect(item);
    setSearchValue(item.name);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen && onOpen) onOpen();
      }}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              placeholder={placeholder}
              className="glass-input h-11 pr-10"
              value={searchValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => {
                setOpen(true);
                if (onOpen) onOpen();
              }}
              disabled={disabled}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-40">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ChevronsUpDown className="h-4 w-4" />
              )}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] p-0 border-white/10 bg-background/95 backdrop-blur-xl"
          onOpenAutoFocus={(e) => e.preventDefault()}
          align="start"
        >
          <ScrollArea className="h-72">
            <div className="p-1">
              {suggestions.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">No matches found.</div>
              ) : (
                suggestions.map((item) => (
                  <button
                    key={item.name}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-md flex items-center justify-between group transition-colors",
                      value?.name === item.name ? "bg-primary/20 text-primary" : "hover:bg-white/5"
                    )}
                    onClick={() => handleSelect(item)}
                  >
                    <span className="truncate">{item.name}</span>
                    {value?.name === item.name && <Check className="h-4 w-4 shrink-0" />}
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
