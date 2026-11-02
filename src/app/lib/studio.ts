export const STUDIO_CATEGORIES = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Dance Studio",
  "Rehearsal Room",
  "Maker Space",
] as const;

export const STUDIO_AMENITIES = [
  "Wi-Fi",
  "Blackout Curtains",
  "Cyclorama Wall",
  "Green Screen",
  "Natural Light",
  "Soundproofing",
  "Parking",
  "Loading Dock",
  "Makeup Room",
  "Kitchenette",
  "Gear Rental",
  "Restrooms",
] as const;

/** Shape of the data the client sends when creating a studio. */
export interface NewStudioInput {
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  amenities: string[];
  overview: string;
}

/** Shape of a studio as returned by the API (read side). */
export interface Studio extends NewStudioInput {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  createdAt: string;
}

/** Validates the payload and returns a list of human-readable problems. */
export function validateStudioInput(
  input: Partial<NewStudioInput>
): string[] {
  const errors: string[] = [];

  if (!input.title || !input.title.trim()) {
    errors.push("Studio title is required.");
  } else if (input.title.trim().length > 100) {
    errors.push("Studio title must be 100 characters or fewer.");
  }

  if (!input.category || !STUDIO_CATEGORIES.includes(input.category as (typeof STUDIO_CATEGORIES)[number])) {
    errors.push("Please choose a valid category.");
  }

  if (typeof input.hourlyRate !== "number" || Number.isNaN(input.hourlyRate) || input.hourlyRate <= 0) {
    errors.push("Hourly rate must be a number greater than 0.");
  }

  if (
    typeof input.securityDeposit !== "number" ||
    Number.isNaN(input.securityDeposit) ||
    input.securityDeposit < 0
  ) {
    errors.push("Security deposit must be 0 or more.");
  }

  if (
    typeof input.maxCapacity !== "number" ||
    !Number.isInteger(input.maxCapacity) ||
    input.maxCapacity < 1
  ) {
    errors.push("Max capacity must be a whole number of at least 1.");
  }

  if (!input.location || !input.location.trim()) {
    errors.push("Location / address is required.");
  }

  if (!input.imageUrl || !/^https?:\/\/\S+$/i.test(input.imageUrl.trim())) {
    errors.push("Please provide a valid image URL (starting with http/https).");
  }

  if (!Array.isArray(input.amenities) || input.amenities.some((a) => !a || typeof a !== "string")) {
    errors.push("Amenities must be a list of tags.");
  }

  if (!input.overview || input.overview.trim().length < 20) {
    errors.push("Detailed overview must be at least 20 characters long.");
  }

  return errors;
}
