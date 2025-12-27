export function validateImageFile(file: File) {
  const MAX_SIZE = 40 * 1024 * 1024; // 2MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  if (!file) {
    throw new Error("Avatar is required");
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only JPG, PNG, and WEBP images are allowed");
  }

  if (file.size > MAX_SIZE) {
    throw new Error("Image size must be less than 2MB");
  }
}
