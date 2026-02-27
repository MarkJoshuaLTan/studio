"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
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
              "glass-input w-full h-auto min-h-11 px-3 py-2.5 justify-between font-normal hover:bg-white/5 text-left transition-all",
              !value && "text-muted-foreground",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            disabled={disabled}
          >
            <span className="whitespace-normal break-words [overflow-wrap:anywhere] leading-snug flex-1">
              {value ? value.name : placeholder}
            </span>
            <div className="ml-2 flex items-center gap-1.5 opacity-40 shrink-0">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ChevronsUpDown className="h-4 w-4" />
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] p-0 border border-black/[0.06] dark:border-white/10 bg-white dark:bg-[#0F131E] shadow-xl rounded-2xl overflow-hidden"
          onOpenAutoFocus={(e) => {
            // Prevent standard focus behavior to avoid jumping/glitching
            // Manually focus the search input instead
            searchInputRef.current?.focus();
          }}
          align="start"
          side="bottom"
          sideOffset={8}
        >
          {/* Internal Search Bar */}
          <div className="flex items-center px-3 border-b border-black/[0.05] dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
            <Search className="h-4 w-4 shrink-0 opacity-40 mr-2" />
            <input
              ref={searchInputRef}
              className="flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={`Search ${placeholder.toLowerCase()}...`}
              value={localSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {localSearch && (
              <button 
                onClick={() => handleSearchChange("")}
                className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="h-3 w-3 opacity-40" />
              </button>
            )}
          </div>

          <ScrollArea className="h-72">
            <div className="p-1.5">
              {suggestions.length === 0 ? (
                <div className="p-6 text-center text-sm text-muted-foreground italic">No results found.</div>
              ) : (
                suggestions.map((item) => (
                  <button
                    key={item.name}
                    className={cn(
                      "w-full text-left px-3 py-3 text-sm rounded-xl flex items-start justify-between group transition-all duration-200 mb-0.5",
                      value?.name === item.name 
                        ? "bg-primary/10 text-primary font-semibold" 
                        : "hover:bg-black/[0.03] dark:hover:bg-white/5 text-foreground/80 hover:text-foreground"
                    )}
                    onClick={() => handleSelect(item)}
                  >
                    <span className="whitespace-normal break-words [overflow-wrap:anywhere] leading-relaxed flex-1 mr-3">
                      {item.name}
                    </span>
                    {value?.name === item.name && (
                      <Check className="h-4 w-4 shrink-0 mt-0.5 animate-in fade-in zoom-in-75 duration-200" />
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
