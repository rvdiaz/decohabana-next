"use client";

import React, { useState, useTransition } from "react";
import imageCompression from "browser-image-compression";
import { QuoteFormData } from "./quoteForm";
import { IImage } from "@/lib/interfaces";
import { uploadImageAction } from "@/lib/actions/actions";

interface QuoteInspirationProps {
  formData: QuoteFormData;
  updateFormData: (field: keyof QuoteFormData, value: any) => void;
}

interface FilePreview {
  file: File;
  tempUrl: string;
  alt: string;
  uploading?: boolean;
  uploaded?: boolean;
  error?: boolean;
}

export default function QuoteInspiration({
  formData,
  updateFormData,
}: QuoteInspirationProps) {
  const [filesPreviews, setFilesPreviews] = useState<FilePreview[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const uploadSingleImage = async (fileData: FilePreview) => {
    try {
      // Compress image
      const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const processedFile = await imageCompression(fileData.file, options);

      // Get presigned URL using server action
      const response = await uploadImageAction({
        filename: processedFile.name,
        type: processedFile.type,
        bucketPath: "quotes/inspiration",
      });

      if (!response?.getImagesUploadUrl) {
        throw new Error("Missing presigned URL data");
      }

      const { uploadUrl, fileUrl } = response.getImagesUploadUrl;

      // Upload to S3
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": processedFile.type,
        },
        body: processedFile,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to S3");
      }

      // Extract S3 key
      const s3Key = uploadUrl.split("?")[0].split(".amazonaws.com/")[1];

      return {
        url: fileUrl,
        alt: processedFile.name,
        s3Key: s3Key,
      };
    } catch (error) {
      console.error("Upload failed for file:", fileData.file.name, error);
      throw error;
    }
  };

  const onDropImage = async (acceptedFiles: File[]) => {
    setUploadError(null);

    // Create preview objects
    const previewFiles: FilePreview[] = acceptedFiles.map((file) => ({
      file,
      tempUrl: URL.createObjectURL(file),
      alt: file.name,
      uploading: true,
    }));

    setFilesPreviews((prev) => [...prev, ...previewFiles]);

    // Use startTransition for the upload process
    startTransition(async () => {
      try {
        // Process uploads in parallel
        const uploadPromises = previewFiles.map(async (fileData) => {
          try {
            const uploadedImage = await uploadSingleImage(fileData);

            // Update preview state to show success
            setFilesPreviews((prev) =>
              prev.map((p) =>
                p.tempUrl === fileData.tempUrl
                  ? { ...p, uploading: false, uploaded: true }
                  : p
              )
            );

            return uploadedImage;
          } catch (error) {
            // Update preview state to show error
            setFilesPreviews((prev) =>
              prev.map((p) =>
                p.tempUrl === fileData.tempUrl
                  ? { ...p, uploading: false, error: true }
                  : p
              )
            );
            return null;
          }
        });

        const results = await Promise.all(uploadPromises);

        // Filter out failed uploads
        const successfulUploads = results.filter(
          (img): img is IImage => img !== null
        );

        // Update form data with all uploaded images
        if (successfulUploads.length > 0) {
          updateFormData("inspirationImages", [
            ...formData.inspirationImages,
            ...successfulUploads,
          ]);
        }

        if (successfulUploads.length < previewFiles.length) {
          setUploadError(
            `${
              previewFiles.length - successfulUploads.length
            } file(s) failed to upload.`
          );
        }
      } catch (error) {
        console.error("Upload process failed:", error);
        setUploadError("Failed to upload images. Please try again.");
      }
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      onDropImage(Array.from(files));
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.inspirationImages];
    newImages.splice(index, 1);
    updateFormData("inspirationImages", newImages);
  };

  const removePreview = (tempUrl: string) => {
    setFilesPreviews((prev) => prev.filter((p) => p.tempUrl !== tempUrl));
    URL.revokeObjectURL(tempUrl);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Inspiration Images (Optional)
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Upload images that inspire your vision for the event. This helps us
          understand your style and preferences.
        </p>
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="mt-4">
          <label htmlFor="file-upload" className="cursor-pointer">
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Click to upload or drag and drop
            </span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isPending}
            />
          </label>
          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-800">{uploadError}</p>
        </div>
      )}

      {/* Preview Grid - Uploading Files */}
      {filesPreviews.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Uploading Files
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filesPreviews.map((preview) => (
              <div key={preview.tempUrl} className="relative group">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={preview.tempUrl}
                    alt={preview.alt}
                    className="w-full h-full object-cover"
                  />

                  {preview.uploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}

                  {preview.error && (
                    <div className="absolute inset-0 bg-red-500/75 flex items-center justify-center">
                      <span className="text-white text-xs">Failed</span>
                    </div>
                  )}

                  {preview.uploaded && (
                    <div className="absolute inset-0 bg-green-500/50 flex items-center justify-center">
                      <svg
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                {!preview.uploading && (
                  <button
                    onClick={() => removePreview(preview.tempUrl)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Images Grid */}
      {formData.inspirationImages.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Uploaded Images ({formData.inspirationImages.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {formData.inspirationImages.map((image, index) => (
              <div key={image.s3Key} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Message */}
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 Tip: Upload images of decorations, color schemes, table settings,
          or any visual references that capture the atmosphere you want to
          create for your event.
        </p>
      </div>
    </div>
  );
}
