/**
 * Validates if a file is an acceptable image
 * @param file The file to validate
 * @param maxSizeMB Maximum file size in MB
 * @returns An object with validation result and error message if any
 */
export function validateImage(file: File, maxSizeMB = 5): { valid: boolean; error?: string } {
  // Check file type
  const acceptedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
  if (!acceptedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "File type not supported. Please upload a JPG, PNG, GIF, or WebP image.",
    }
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB. Please upload a smaller image.`,
    }
  }

  return { valid: true }
}

/**
 * Resizes an image to fit within maximum dimensions while maintaining aspect ratio
 * @param imageUrl URL of the image to resize
 * @param maxWidth Maximum width in pixels
 * @param maxHeight Maximum height in pixels
 * @returns A promise that resolves to a data URL of the resized image
 */
export function resizeImage(imageUrl: string, maxWidth = 1200, maxHeight = 1200): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      // Calculate new dimensions
      let width = img.width
      let height = img.height

      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }

      if (height > maxHeight) {
        width = (width * maxHeight) / height
        height = maxHeight
      }

      // Create canvas and draw resized image
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Could not get canvas context"))
        return
      }

      ctx.drawImage(img, 0, 0, width, height)

      // Convert to data URL
      resolve(canvas.toDataURL("image/jpeg", 0.85))
    }

    img.onerror = () => {
      reject(new Error("Failed to load image"))
    }

    img.src = imageUrl
  })
}
