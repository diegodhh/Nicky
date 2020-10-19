export function createNewZone() {
  return {
    _id: ObjectId(),
    name: "",
    type: "generic",
    stamps: [],
    routines: [],
    reminders: [],
    addedTime: 0,
    budget: 0,
  };
}

export const zones = [
  {
    _id: ObjectId(),
    name: "Working",
    type: "generic",
    stamps: [],
    routines: [],
    reminders: [],
    addedTime: 0,
    budget: 7,
  },
  {
    _id: ObjectId(),
    name: "Stuff",
    type: "generic",
    stamps: [],
    routines: [],
    reminders: [],
    addedTime: 0,
    budget: 3,
  },
  {
    _id: ObjectId(),
    name: "Dailyroutines",
    type: "generic",
    stamps: [],
    addedTime: 0,
    budget: 2,
    routines: [
      {
        finished: false,
        name: "meditation",
        _id: ObjectId(),
      },
      {
        finished: false,
        name: "gtd",
        _id: ObjectId(),
      },
      {
        finished: false,
        name: "language training",
        _id: ObjectId(),
      },
    ],
    reminders: [],
  },
  {
    _id: ObjectId(),
    name: "Working Out",
    type: "generic",
    stamps: [],
    addedTime: 0,
    routines: [],
    reminders: [],
    budget: 1,
  },
  {
    _id: ObjectId(),
    name: "Relaxing",
    type: "generic",
    stamps: [],
    routines: [],
    reminders: [],
    addedTime: 0,
    budget: 1,
  },
  {
    _id: ObjectId(),
    name: "Off",
    type: "off",
    stamps: [{ time: Date.now() }],
    routines: [],
    reminders: [],
    addedTime: 0,
    budget: 0,
  },
];

function ObjectId(
  m = Math,
  d = Date,
  h = 16,
  s = (s) => m.floor(s).toString(h)
) {
  return (
    s(d.now() / 1000) + " ".repeat(h).replace(/./g, () => s(m.random() * h))
  );
}
