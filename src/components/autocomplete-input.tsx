"use client";

import * as React from "react";
import { Check, Search, ChevronsUpDown, Loader2, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  const [internalSearch, setInternalSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Focus search input and reset parent list when popover opens
  React.useEffect(() => {
    if (open) {
      onInputChange("");
      setInternalSearch("");
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open, onInputChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalSearch(newValue);
    onInputChange(newValue);
  };

  const handleSelect = (item: SuggestedItem) => {
    onSelect(item);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(null);
    onInputChange("");
    setInternalSearch("");
  };

  const displayedValue = value?.name || "";

  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen && onOpen) {
          onOpen();
        }
      }}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between h-12 px-4 rounded-2xl transition-all duration-300",
              "border-black/[0.08] dark:border-white/10 bg-background hover:bg-accent/50",
              "shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.03)] dark:shadow-none",
              open && "ring-2 ring-primary/20 border-primary/30"
            )}
            disabled={disabled}
          >
            <span className={cn(
              "truncate font-medium text-[15px]",
              !value && "text-muted-foreground/60"
            )}>
              {value ? displayedValue : placeholder}
            </span>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              {value && !disabled && (
                <div 
                  onClick={handleClear}
                  className="p-1 rounded-full hover:bg-muted transition-colors text-muted-foreground/40 hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </div>
              )}
              <ChevronsUpDown className="h-4 w-4 opacity-40" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          sideOffset={8}
          avoidCollisions={true}
          className={cn(
            "w-[var(--radix-popover-trigger-width)] p-0 overflow-hidden border-none z-[100]",
            "rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]",
            "bg-white dark:bg-[#0F131E] border border-black/[0.06] dark:border-white/[0.08]"
          )}
        >
          {/* Sticky Search Header */}
          <div className="sticky top-0 z-10 bg-muted/30 dark:bg-white/[0.03] backdrop-blur-md border-b border-black/[0.05] dark:border-white/[0.05] px-3 flex items-center h-12">
            <Search className="h-4 w-4 text-muted-foreground/50 shrink-0 ml-1" />
            <input
              ref={inputRef}
              placeholder={`Search ${placeholder.toLowerCase().replace('search for a ', '').replace('...', '')}...`}
              className="flex-1 bg-transparent border-0 px-3 py-2 text-sm focus:outline-none focus:ring-0 placeholder:text-muted-foreground/40 font-medium"
              value={internalSearch}
              onChange={handleInputChange}
            />
            {isLoading && <Loader2 className="h-4 w-4 animate-spin text-primary/60 mr-1" />}
          </div>

          {/* List Area with strict height constraint */}
          <ScrollArea className="max-h-[280px]">
            <div className="p-1.5 space-y-0.5">
              {suggestions.length === 0 && !isLoading && (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground/60 italic font-medium">
                  No matches found.
                </div>
              )}
              {suggestions.map((item) => {
                const isSelected = value?.name === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-left group",
                      isSelected 
                        ? "bg-primary/10 text-primary" 
                        : "text-foreground/70 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] hover:text-foreground"
                    )}
                  >
                    <span className="truncate flex-1 pr-2">{item.name}</span>
                    {isSelected && (
                      <Check className="h-4 w-4 shrink-0 stroke-[3] animate-in zoom-in-50 duration-200" />
                    )}
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
