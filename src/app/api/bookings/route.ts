import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { auth } from "@/app/lib/auth";
import { bookingsCollection, studiosCollection } from "@/app/lib/mongodb";
import {
  validateBookingInput,
  type NewBookingInput,
} from "@/app/lib/booking";

async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/** GET /api/bookings — every booking made by the signed-in user. */
export async function GET() {
  const session = await getSession();

  if (!session?.user) {
    return Response.json({ error: "You must be signed in." }, { status: 401 });
  }

  const bookings = await bookingsCollection
    .find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .toArray();

  return Response.json({
    bookings: bookings.map((booking) => ({
      ...booking,
      _id: booking._id.toString(),
    })),
  });
}

/** POST /api/bookings — create a booking request for the signed-in user. */
export async function POST(request: Request) {
  const session = await getSession();

  if (!session?.user) {
    return Response.json(
      { error: "You must be signed in to book a studio." },
      { status: 401 }
    );
  }

  let body: Partial<NewBookingInput> & { studioTitle?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const input: NewBookingInput = {
    studioId: typeof body.studioId === "string" ? body.studioId.trim() : "",
    bookingDate:
      typeof body.bookingDate === "string" ? body.bookingDate.trim() : "",
    startTime: typeof body.startTime === "string" ? body.startTime.trim() : "",
    hours: Number(body.hours),
  };

  const errors = validateBookingInput(input);
  if (errors.length > 0) {
    return Response.json({ error: errors.join(" ") }, { status: 400 });
  }

  // Look up the studio so pricing comes from the database, not the client.
  if (!ObjectId.isValid(input.studioId)) {
    return Response.json({ error: "Studio not found." }, { status: 404 });
  }

  const studio = await studiosCollection.findOne({
    _id: new ObjectId(input.studioId),
  });
  if (!studio) {
    return Response.json({ error: "Studio not found." }, { status: 404 });
  }

  const doc = {
    studioId: input.studioId,
    studioTitle: studio.title,
    userId: session.user.id,
    userName: session.user.name,
    userEmail: session.user.email,
    bookingDate: input.bookingDate,
    startTime: input.startTime,
    hours: input.hours,
    hourlyRate: studio.hourlyRate,
    securityDeposit: studio.securityDeposit,
    totalPrice: studio.hourlyRate * input.hours + studio.securityDeposit,
    status: "Pending",
    createdAt: new Date(),
  };

  const result = await bookingsCollection.insertOne(doc);

  return Response.json(
    {
      booking: { ...doc, _id: result.insertedId.toString() },
      message: "Booking request sent.",
    },
    { status: 201 }
  );
}
