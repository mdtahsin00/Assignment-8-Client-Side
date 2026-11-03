/** Shape of the data the client sends when requesting a booking. */
export interface NewBookingInput {
  studioId: string;
  bookingDate: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  hours: number;
}

/** Shape of a booking as returned by the API (read side). */
export interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  bookingDate: string;
  startTime: string;
  hours: number;
  hourlyRate: number;
  securityDeposit: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

/** Validates the booking payload and returns a list of human-readable problems. */
export function validateBookingInput(
  input: Partial<NewBookingInput>
): string[] {
  const errors: string[] = [];

  if (!input.studioId || typeof input.studioId !== "string") {
    errors.push("Studio is required.");
  }

  if (!input.bookingDate || !/^\d{4}-\d{2}-\d{2}$/.test(input.bookingDate)) {
    errors.push("A valid booking date is required.");
  } else if (input.bookingDate < new Date().toISOString().split("T")[0]) {
    errors.push("Booking date cannot be in the past.");
  }

  if (!input.startTime || !/^([01]\d|2[0-3]):[0-5]\d$/.test(input.startTime)) {
    errors.push("A valid start time is required.");
  }

  if (
    typeof input.hours !== "number" ||
    !Number.isInteger(input.hours) ||
    input.hours < 1 ||
    input.hours > 24
  ) {
    errors.push("Booking duration must be a whole number of 1 to 24 hours.");
  }

  return errors;
}
