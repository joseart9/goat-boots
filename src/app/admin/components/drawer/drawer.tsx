"use client";

import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type DrawerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

interface CustomDrawerProps {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  side?: "left" | "right" | "top" | "bottom";
  size?: DrawerSize;
  preventClose?: boolean;
}

const sizeClasses: Record<DrawerSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  full: "sm:max-w-full",
};

export function CustomDrawer({
  trigger,
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
  className,
  side = "right",
  size = "md",
  preventClose = false,
}: CustomDrawerProps) {
  const handleOpenChange = (newOpen: boolean) => {
    if (preventClose && !newOpen) {
      return;
    }
    onOpenChange?.(newOpen);
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent
        className={cn(
          inter.className,
          "h-full w-full bg-white dark:bg-secondary-500 text-foreground",
          sizeClasses[size],
          side === "left" && "left-0 right-auto",
          side === "right" && "right-0 left-auto",
          side === "top" && "top-0 bottom-auto",
          side === "bottom" && "bottom-0 top-auto",
          className
        )}
      >
        <DrawerHeader className="border-b border-border">
          {title && (
            <DrawerTitle className="text-2xl font-bold text-dark dark:text-white">
              {title}
            </DrawerTitle>
          )}
          {description && (
            <DrawerDescription className="text-sm text-muted-foreground">
              {description}
            </DrawerDescription>
          )}
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
        {footer && (
          <DrawerFooter className="border-t border-border">
            {footer}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
