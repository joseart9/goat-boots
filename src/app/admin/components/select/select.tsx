"use client";

import * as React from "react";
import { Inter } from "next/font/google";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const inter = Inter({ subsets: ["latin"] });

interface CustomSelectProps {
  options: {
    label: string;
    value: string;
    group?: string;
  }[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  required?: boolean;
}

export function CustomSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  label,
  disabled = false,
  className,
  name,
  required,
}: CustomSelectProps) {
  // Group options by their group property
  const groupedOptions = options.reduce((acc, option) => {
    const group = option.group || "default";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(option);
    return acc;
  }, {} as Record<string, typeof options>);

  return (
    <div className={`w-full ${inter.className}`}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
          {label}
        </label>
      )}
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={inter.className}>
          {Object.entries(groupedOptions).map(([group, groupOptions]) => (
            <SelectGroup key={group}>
              {group !== "default" && <SelectLabel>{group}</SelectLabel>}
              {groupOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
