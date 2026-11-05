export type Studio = {
  _id: string; title: string; category: string; hourlyRate: number; deposit: number; capacity: number;
  location: string; image: string; gallery?: string[]; amenities: string[]; overview: string; rating: number;
  reviews?: { name: string; rating: number; comment: string }[];
  ownerEmail: string; ownerName: string; ownerImage?: string; createdAt: string;
};
export type Status = "Pending" | "Confirmed" | "Completed" | "Cancelled";
export type Booking = {
  _id: string; studioId: string; studioTitle: string; studioImage: string; hostEmail: string; userEmail: string;
  userName: string; date: string; startTime: string; endTime: string; hours: number; total: number; deposit: number;
  notes?: string; status: Status; createdAt: string;
};
