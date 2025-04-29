"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface CustomInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  className?: string;
  asTextarea?: boolean;
  rows?: number;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
}

export function CustomInput({
  label,
  error,
  helperText,
  fullWidth = true,
  className,
  asTextarea = false,
  rows = 3,
  value,
  onChange,
  ...props
}: CustomInputProps) {
  const Component = asTextarea ? Textarea : Input;
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    onChange?.(e);
  };

  React.useEffect(() => {
    if (asTextarea && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, asTextarea]);

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label className="text-sm font-medium text-black dark:text-white">
          {label}
        </label>
      )}
      {asTextarea ? (
        <Textarea
          ref={textareaRef}
          className={cn(
            "transition-colors text-black dark:text-white",
            error && "border-red-500 focus-visible:ring-red-500",
            "min-h-[80px] resize-none",
            className
          )}
          rows={rows}
          value={value}
          onChange={handleTextareaChange}
          {...props}
        />
      ) : (
        <Input
          className={cn(
            "transition-colors text-black dark:text-white",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
      {(error || helperText) && (
        <p
          className={`text-sm ${
            error ? "text-red-500" : "text-muted-foreground"
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
