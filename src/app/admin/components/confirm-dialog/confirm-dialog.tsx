"use client";

import * as React from "react";
import { Inter } from "next/font/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomButton } from "@/app/admin/components/button";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  importantText?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  importantText,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("sm:max-w-md", inter.className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {importantText && (
            <p className="text-sm font-medium text-red-500 pt-3">
              {importantText}
            </p>
          )}
        </DialogHeader>
        <DialogFooter className="flex gap-2 justify-end">
          <CustomButton
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="text-black dark:text-white bg-transparent border-none "
          >
            {cancelText}
          </CustomButton>
          <CustomButton
            variant="destructive"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
