"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SuggestedItem } from "@/lib/definitions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

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
  const [localSearch, setLocalSearch] = React.useState("");
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Clear internal search when popover closes
  React.useEffect(() => {
    if (!open) {
      setLocalSearch("");
      onInputChange("");
    }
  }, [open, onInputChange]);

  const handleSearchChange = (val: string) => {
    setLocalSearch(val);
    onInputChange(val);
  };

  const handleSelect = (item: SuggestedItem) => {
    onSelect(item);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen && onOpen) onOpen();
      }}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full h-12 px-4 justify-between font-medium text-left transition-all duration-300 rounded-[14px] border-white/5",
              "bg-[#0B0F0E] hover:bg-[#121615] text-foreground",
              "focus:ring-2 focus:ring-primary/30 focus:border-primary/50",
              !value && "text-muted-foreground",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            disabled={disabled}
          >
            <span className="truncate flex-1 mr-2">
              {value ? value.name : placeholder}
            </span>
            <div className="flex items-center gap-1.5 opacity-40 shrink-0">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ChevronsUpDown className="h-4 w-4" />
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] p-0 border border-white/5 bg-[#0B0F0E] shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-[16px] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          onOpenAutoFocus={(e) => {
            searchInputRef.current?.focus();
          }}
          align="start"
          side="bottom"
          sideOffset={8}
        >
          <div className="flex items-center px-4 border-b border-white/5 bg-white/[0.02]">
            <Search className="h-4 w-4 shrink-0 opacity-40 mr-2 text-primary" />
            <input
              ref={searchInputRef}
              className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/50 text-foreground"
              placeholder={`Search...`}
              value={localSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {localSearch && (
              <button 
                onClick={() => handleSearchChange("")}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-3 w-3 opacity-40" />
              </button>
            )}
          </div>

          <ScrollArea className="h-72 premium-scrollbar">
            <div className="p-2">
              {suggestions.length === 0 ? (
                <div className="p-8 text-center text-sm text-muted-foreground/50 italic">No results found.</div>
              ) : (
                suggestions.map((item) => (
                  <button
                    key={item.name}
                    className={cn(
                      "w-full text-left px-4 py-3.5 text-sm rounded-[12px] flex items-center justify-between group transition-all duration-200 mb-1 font-medium",
                      value?.name === item.name 
                        ? "bg-gradient-to-r from-[#14532D] to-[#166534] text-white shadow-[inset_0_0_10px_rgba(34,197,94,0.2)]" 
                        : "hover:bg-white/5 text-foreground/80 hover:text-white"
                    )}
                    onClick={() => handleSelect(item)}
                  >
                    <span className="truncate flex-1 mr-3">
                      {item.name}
                    </span>
                    {value?.name === item.name && (
                      <Check className="h-4 w-4 shrink-0 text-white animate-in fade-in zoom-in-75 duration-200" />
                    )}
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
