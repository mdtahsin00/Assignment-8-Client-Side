export const CATEGORIES = [
  { name: "Photo Studio", label: "Photo Studios", blurb: "Cyc walls and daylight lofts" },
  { name: "Film Stage", label: "Sound Stages", blurb: "Grids, green screens, loading docks" },
  { name: "Podcast Lounge", label: "Podcast Rooms", blurb: "Treated rooms with broadcast mics" },
  { name: "Music Suite", label: "Music Suites", blurb: "Live rooms and vocal booths" },
  { name: "Workshop", label: "Art Workshops", blurb: "Open floors for making things" },
];
export const AMENITIES = ["Wi-Fi", "Air conditioning", "Parking", "Sound proofing", "Lighting grid", "Green screen", "Cyc wall", "Mixing desk", "Vocal booth", "Makeup station", "Green room", "Coffee bar", "Props", "Natural light"];
export const STATUS_STYLE: Record<string, string> = {
  Pending: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Confirmed: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  Completed: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  Cancelled: "bg-red-500/15 text-red-600 dark:text-red-400",
};
