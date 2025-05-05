import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { CustomButton } from "../button";

interface ImageData {
  id: string;
  url: string;
}

interface UpdateImageUploadProps {
  existingImages: ImageData[];
  onExistingImagesChange: (images: ImageData[]) => void;
  newImages: File[];
  onNewImagesChange: (images: File[]) => void;
}

export function UpdateImageUpload({
  existingImages,
  onExistingImagesChange,
  newImages,
  onNewImagesChange,
}: UpdateImageUploadProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Create preview URLs for new images
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);

    // Add new files to the state
    onNewImagesChange([...newImages, ...files]);
  };

  const removeExistingImage = (imageId: string) => {
    onExistingImagesChange(existingImages.filter((img) => img.id !== imageId));
  };

  const removeNewImage = (index: number) => {
    const newFiles = [...newImages];
    newFiles.splice(index, 1);
    onNewImagesChange(newFiles);

    // Remove preview URL
    const newPreviewUrls = [...previewUrls];
    URL.revokeObjectURL(newPreviewUrls[index]);
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Existing Images */}
        {existingImages.map((image) => (
          <div key={image.id} className="relative group">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src={image.url}
                alt="Product image"
                fill
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => removeExistingImage(image.id)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {/* New Images */}
        {previewUrls.map((url, index) => (
          <div key={url} className="relative group">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src={url}
                alt="New product image"
                fill
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => removeNewImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {/* Upload Button */}
        <label className="aspect-square relative rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-500 transition-colors cursor-pointer flex items-center justify-center">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="text-center">
            <p className="text-sm text-gray-500">Click to upload</p>
            <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
          </div>
        </label>
      </div>
    </div>
  );
}
