import { CustomImg } from "@/app/types/CustomImg";
import { Button, Image } from "@heroui/react";
import { useState } from "react";
import { deleteImage } from "@/server/actions/delete-image";
import { getCookie } from "cookies-next";

interface ImageUploadProps {
  images: any[];
  setImages: any;
  imagesSaved?: CustomImg[];
  setImagesSaved?: any;
  onUploadComplete?: (url: string) => void;
  isSingleImage?: boolean;
}

export default function ImageUpload({
  images,
  setImages,
  imagesSaved,
  setImagesSaved,
  onUploadComplete,
  isSingleImage = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("project_id", process.env.NEXT_PUBLIC_PROJECT_ID || "");

    try {
      setIsUploading(true);
      const token = getCookie("admin_token");
      const uploadUrl = `https://${process.env.NEXT_PUBLIC_IMG_UPLOAD_URL}`;
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      if (onUploadComplete) {
        onUploadComplete(data.data.url);
      }
      return data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }

  async function handleUpload(index: number) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      if (e.target) {
        setTimeout(async () => {
          const newImages = Array.from(
            (e.target as HTMLInputElement).files || []
          );
          if (newImages.length > 0) {
            try {
              const uploadedImage = await uploadImage(newImages[0]);
              if (isSingleImage) {
                setImages([uploadedImage.data.url]);
              } else {
                setImages((prevImages: any) => {
                  const updatedImages = [...prevImages];
                  updatedImages[index] = uploadedImage.data.url;
                  return updatedImages;
                });
                addNewUpload();
              }
            } catch (error) {
              console.error("Error handling upload:", error);
            }
          }
        }, 100);
      }
    };
    input.click();
    input.remove();
    input.value = "";
  }

  function addNewUpload() {
    if (!isSingleImage) {
      setImages((prevImages: any) => [null as any, ...prevImages]);
    }
  }

  async function handleDelete(index: any, isImgSaved?: boolean) {
    if (isImgSaved) {
      try {
        setIsDeleting(true);
        await deleteImage(index);
        setImagesSaved((prevImages: any[]) =>
          prevImages.filter((image) => image.id !== index)
        );
      } catch (error) {
        console.error("Error deleting image from database:", error);
      } finally {
        setIsDeleting(false);
      }
    } else {
      if (isSingleImage) {
        setImages([null as any]);
      } else {
        setImages((prevImages: any[]) =>
          prevImages.filter((_: any, i: number) => i !== index)
        );
      }
    }
  }

  const UploadButton = ({ index }: { index: number }) => (
    <Button
      onPress={() => handleUpload(index)}
      className="w-[200px] h-[200px] bg-secondary-500 flex items-center justify-center border-3 border-gray-300 border-dashed relative"
      disabled={isUploading}
    >
      {isUploading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <p className="flex flex-col items-center space-y-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-white w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span className="text-white">Subir Imagen</span>
        </p>
      )}
    </Button>
  );

  return (
    <div className="flex flex-row md:flex-wrap min-w-full overflow-x-auto gap-5 md:gap-5 md:space-x-0 p-2 pr-5">
      {/* Render new images */}
      {images.map((image, index) => (
        <div
          key={`new-${index}`}
          className="relative flex-shrink-0 items-center"
        >
          {image ? (
            <Image
              className="object-cover w-[200px] h-[200px]"
              src={image}
              alt={`Preview ${index + 1}`}
            />
          ) : (
            <UploadButton index={index} />
          )}
          {image && (
            <button
              onClick={() => handleDelete(index)}
              className="absolute z-10 -top-2 -right-3 font-bold bg-[#fc0303] text-white rounded-full p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 p-[2px] text-[#fff]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          )}
        </div>
      ))}

      {/* Render saved images */}
      {imagesSaved?.map((image: any) => (
        <div
          key={`saved-${image.id}`}
          className="relative flex-shrink-0 items-center"
        >
          <Image
            className="object-cover w-[200px] h-[200px]"
            src={image.url}
            alt={`Saved image ${image.id}`}
          />
          <button
            onClick={() => handleDelete(image.id, true)}
            disabled={isDeleting}
            className="absolute z-10 -top-2 -right-3 font-bold bg-[#fc0303] text-white rounded-full p-1"
          >
            {isDeleting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 p-[2px] text-[#fff]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
