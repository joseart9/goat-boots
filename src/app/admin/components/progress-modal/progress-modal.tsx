"use client";

import * as React from "react";
import { CustomProgress } from "@/app/admin/components/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProgressModalProps {
  isOpen: boolean;
  progress: number;
  title?: string;
  description?: string;
}

export function ProgressModal({
  isOpen,
  progress,
  title = "Procesando",
  description = "Por favor espere mientras se procesa su solicitud...",
}: ProgressModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <CustomProgress
            value={progress}
            label="Progreso"
            showValue
            size="lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
