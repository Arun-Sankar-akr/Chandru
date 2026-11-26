// Edit everything about the wedding here.
export const wedding = {
  bride: "Sweatha B",
  groom: "Chandru S",
  brideShort: "Sweatha",
  groomShort: "Chandru",
  // 27 January 2027, midnight India time. Add the real muhurtham time later,
  // e.g. "2027-01-27T09:00:00+05:30"
  date: "2027-01-27T00:00:00+05:30",
  dateText: "27 · 01 · 2027",
  longDate: "Wednesday, 27 January 2027",
  time: "Time to be announced",
  groomParents: ["Sivalingam", "Anitha"],
  // TODO: replace with the real names of the bride's parents
  brideParents: ["Father Name", "Mother Name"],
  // Day-wise programme. Add or remove items; leave `time` empty to show "To be announced".
  events: [
    { ta: "முகூர்த்தம்", name: "Muhurtham", note: "The sacred wedding ceremony", time: "" },
    { ta: "விருந்து", name: "Wedding Feast", note: "Lunch with family and friends", time: "" },
    { ta: "ஆசீர்வாதம்", name: "Blessings & Photographs", note: "Meet the couple and bless them", time: "" },
  ],
  venue: {
    name: "Venue details will be shared soon.",
    mapUrl: "", // paste a Google Maps link later to show a "View on map" button
  },
};
