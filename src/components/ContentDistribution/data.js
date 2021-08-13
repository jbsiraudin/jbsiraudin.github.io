import React from "react";

export const N_init = 20;
export const undef = {
  cid: "00",
  label: "",
  color: "#fff",
};

// const suits = ["spades", "hearts", "diamonds", "clubs"];
const suits = ["s", "h", "d", "c"];
const names = ["Spades", "Hearts", "Diamonds", "Clubs"];
function labelCard(i, j) {
  let result = "";
  if (j === 11) {
    result = "Jack of ";
  } else if (j === 12) {
    result = "Queen of ";
  } else if (j === 13) {
    result = "King of ";
  } else {
    result = `${j} of `;
  }

  result += names[i];

  return result;
}

function cidCard(i, j) {
  let result = "";
  if (j === 11) {
    result = "J";
  } else if (j === 12) {
    result = "Q";
  } else if (j === 13) {
    result = "K";
  } else {
    result = `${j}`;
  }
  result += suits[i];

  return result;
}

const init_cards = [];
for (let i = 0; i < 4; i++) {
  for (let j = 1; j < 14; j++) {
    init_cards.push({
      id: 13 * i + j - 1,
      cid: cidCard(i, j),
      label: labelCard(i, j),
      color: "#868686",
      /* constraints: [],
      weights: new Array(N_init).fill(1), */
    });
  }
}
export { init_cards };

export const data_init = {
  name: "colors",
  tiles: [
    {
      _id: 0,
      name: "color 0",
      label: "",
      description: "",
      color: "#FAAB64",
      weights: new Array(N_init).fill(1), // we adjust to spawning probability for each slot/hour of the timeline
      constraints: [
        [0, 2],
        [1, 3],
      ],
      // [left(0) or right(1) constraint, id of the constrainee]
      // this tile can't follow the tile 2
      // and the tile 3 can't come right after
      repeat: false, // this tile can't be place more than once
    },
    {
      _id: 1,
      name: "color 1",
      label: "",
      description: "",
      color: "#70FA7A",
      weights: new Array(N_init).fill(1),
      constraints: [],
      repeat: true,
    },
    {
      _id: 2,
      name: "color 2",
      label: "",
      description: "",
      color: "#FA7557",
      weights: new Array(N_init).fill(1),
      constraints: [],
      repeat: true,
    },
    {
      _id: 3,
      name: "color 3",
      label: "",
      description: "",
      color: "#3ED6FA",
      weights: new Array(N_init).fill(1),
      constraints: [],
      repeat: true,
    },
    {
      _id: 4,
      name: "color 4",
      label: "",
      description: "",
      color: "#FA4B8C",
      weights: new Array(N_init).fill(1),
      constraints: [],
      repeat: true,
    },
    {
      _id: 5,
      name: "color 5",
      label: "",
      description: "",
      color: "#7D10C7",
      weights: new Array(N_init).fill(1),
      constraints: [],
      repeat: true,
    },
    {
      _id: 6,
      name: "color 6",
      label: "",
      description: "",
      color: "#CEBF96",
      weights: new Array(N_init).fill(1),
      constraints: [],
      repeat: true,
    },
  ],
};

export const cardOptions = [
  {
    key: "any",
    text: "Any",
    value: "0",
  },
  {
    key: "ace",
    text: "Ace",
    value: "1",
  },
  {
    key: "2",
    text: "2",
    value: "2",
  },
  {
    key: "3",
    text: "3",
    value: "3",
  },
  {
    key: "4",
    text: "4",
    value: "4",
  },
  {
    key: "5",
    text: "5",
    value: "5",
  },
  {
    key: "6",
    text: "6",
    value: "6",
  },
  {
    key: "7",
    text: "7",
    value: "7",
  },
  {
    key: "8",
    text: "8",
    value: "8",
  },
  {
    key: "9",
    text: "9",
    value: "9",
  },
  {
    key: "10",
    text: "10",
    value: "10",
  },
  {
    key: "jack",
    text: "Jack",
    value: "J",
  },
  {
    key: "queen",
    text: "Queen",
    value: "Q",
  },
  {
    key: "king",
    text: "King",
    value: "K",
  },
];

export const suitOptions = [
  {
    key: "0",
    text: "Suit",
    value: "0",
    color: "#495057",
  },
  {
    key: "s",
    text: "♠️",
    value: "s",
    color: "black",
  },
  {
    key: "h",
    text: "♥️",
    value: "h",
    color: "red",
  },
  {
    key: "h",
    text: "♦️",
    value: "d",
    color: "red",
  },
  {
    key: "c",
    text: "♣️",
    value: "c",
    color: "black",
  },
];

export const positionOptions = [
  {
    key: "0",
    text: "1",
    value: "0",
  },
  {
    key: "1",
    text: "2",
    value: "1",
  },
  {
    key: "2",
    text: "3",
    value: "2",
  },
  {
    key: "3",
    text: "4",
    value: "3",
  },
  {
    key: "4",
    text: "5",
    value: "4",
  },
  {
    key: "5",
    text: "6",
    value: "5",
  },
  {
    key: "6",
    text: "7",
    value: "6",
  },
  {
    key: "7",
    text: "8",
    value: "7",
  },
  {
    key: "8",
    text: "9",
    value: "8",
  },
  {
    key: "9",
    text: "10",
    value: "9",
  },
  {
    key: "10",
    text: "11",
    value: "10",
  },
  {
    key: "11",
    text: "12",
    value: "11",
  },
  {
    key: "12",
    text: "13",
    value: "12",
  },
  {
    key: "13",
    text: "14",
    value: "13",
  },
  {
    key: "14",
    text: "15",
    value: "14",
  },
  {
    key: "15",
    text: "16",
    value: "15",
  },
  {
    key: "16",
    text: "17",
    value: "16",
  },
  {
    key: "17",
    text: "18",
    value: "17",
  },
  {
    key: "18",
    text: "19",
    value: "18",
  },
  {
    key: "19",
    text: "20",
    value: "19",
  },
];

export const typesOptions = [
  {
    key: "type",
    text: "Type",
    value: "0",
  },
  {
    key: "no-after",
    text: "Can't be after",
    value: "no-after",
  },
  {
    key: "no-before",
    text: "Can't be before",
    value: "no-before",
  },
  {
    key: "only-after",
    text: "Must be after",
    value: "only-after",
  },
  {
    key: "only-before",
    text: "Must be before",
    value: "only-before",
  },
  {
    key: "no-at",
    text: "Can't be at spot",
    value: "no-at",
  },
  {
    key: "prefers-at",
    text: "Must be at spot",
    value: "prefers-at",
  },
];
