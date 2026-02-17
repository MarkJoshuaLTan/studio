"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { SuggestedItem } from "@/lib/definitions";

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
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    setInputValue(value?.name || "");
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onInputChange(newValue);
    if (!open) {
      setOpen(true);
    }
  };

  const handleSelect = (item: SuggestedItem) => {
    setInputValue(item.name);
    onSelect(item);
    setOpen(false);
  };

  const handleClear = () => {
    setInputValue("");
    onInputChange("");
    onSelect(null);
  };
  
  const displayedValue = value?.name || "";

  return (
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
          className="w-full justify-between"
          disabled={disabled}
        >
          <span className="truncate">
            {value ? displayedValue : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
        style={{maxHeight: 'var(--radix-popover-content-available-height)'}}
      >
        <div className="flex items-center border-b px-3">
          <Input
            placeholder={placeholder}
            className="h-10 flex-1 min-w-0 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            value={inputValue}
            onChange={handleInputChange}
          />
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </div>
        <ScrollArea className="h-auto">
          <div className="p-1">
          {suggestions.length === 0 && !isLoading && inputValue.length > 0 && (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">No results found.</div>
            )}
            {suggestions.map((item) => (
              <Button
                variant="ghost"
                key={item.name}
                onClick={() => handleSelect(item)}
                className="w-full justify-start font-normal h-auto whitespace-normal text-left"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 shrink-0",
                    value?.name === item.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
