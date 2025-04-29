"use client";

import * as React from "react";
import { X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageUploadProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  className?: string;
  maxFiles?: number;
}

export function ImageUpload({
  images,
  onImagesChange,
  className,
  maxFiles,
}: ImageUploadProps) {
  const [previews, setPreviews] = React.useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    // Create preview URLs for the images
    const newPreviews = images.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // Cleanup preview URLs when component unmounts or images change
    return () => {
      newPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [images]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (maxFiles && images.length + files.length > maxFiles) {
      onImagesChange([...images, ...files.slice(0, maxFiles - images.length)]);
    } else {
      onImagesChange([...images, ...files]);
    }
  };

  const handleDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onImagesChange(newImages);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (maxFiles && images.length + files.length > maxFiles) {
      onImagesChange([...images, ...files.slice(0, maxFiles - images.length)]);
    } else {
      onImagesChange([...images, ...files]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className="border-2 border-dashed border-input rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple={!maxFiles || maxFiles > 1}
          accept="image/*"
          onChange={handleFileChange}
        />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          {maxFiles === 1
            ? "Arrastra y suelta una imagen aquí o haz clic para seleccionar"
            : "Arrastra y suelta imágenes aquí o haz clic para seleccionar"}
        </p>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div
              key={preview}
              className="relative aspect-square rounded-lg overflow-hidden group"
            >
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDelete(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
