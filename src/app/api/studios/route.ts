import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { studiosCollection } from "@/app/lib/mongodb";
import { validateStudioInput, type NewStudioInput } from "@/app/lib/studio";

async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/** GET /api/studios — every studio owned by the signed-in user. */
export async function GET() {
  const session = await getSession();

  if (!session?.user) {
    return Response.json({ error: "You must be signed in." }, { status: 401 });
  }

  const studios = await studiosCollection
    .find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .toArray();

  return Response.json({
    studios: studios.map((studio) => ({ ...studio, _id: studio._id.toString() })),
  });
}

/** POST /api/studios — create a studio listing for the signed-in user. */
export async function POST(request: Request) {
  const session = await getSession();

  if (!session?.user) {
    return Response.json(
      { error: "You must be signed in to add a studio." },
      { status: 401 }
    );
  }

  let body: Partial<NewStudioInput>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const input: NewStudioInput = {
    title: typeof body.title === "string" ? body.title.trim() : "",
    category: typeof body.category === "string" ? body.category : "",
    hourlyRate: Number(body.hourlyRate),
    securityDeposit: Number(body.securityDeposit ?? 0),
    maxCapacity: Number(body.maxCapacity),
    location: typeof body.location === "string" ? body.location.trim() : "",
    imageUrl: typeof body.imageUrl === "string" ? body.imageUrl.trim() : "",
    amenities: Array.isArray(body.amenities) ? body.amenities.map(String) : [],
    overview: typeof body.overview === "string" ? body.overview.trim() : "",
  };

  const errors = validateStudioInput(input);
  if (errors.length > 0) {
    return Response.json({ error: errors.join(" ") }, { status: 400 });
  }

  const doc = {
    ...input,
    userId: session.user.id,
    userName: session.user.name,
    userEmail: session.user.email,
    createdAt: new Date(),
  };

  const result = await studiosCollection.insertOne(doc);

  return Response.json(
    {
      studio: { ...doc, _id: result.insertedId.toString() },
      message: "Studio added successfully.",
    },
    { status: 201 }
  );
}
