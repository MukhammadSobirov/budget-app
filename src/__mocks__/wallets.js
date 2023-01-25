import { v4 as uuid } from "uuid";

export const wallets = [
  {
    id: uuid(),
    createdAt: "04/04/2019",
    description: "Family budget.",
    color: "tomato",
    name: "Lyft",
    balance: "406",
    currency: "TRY",
  },
  {
    id: uuid(),
    createdAt: "04/04/2019",
    description: "Wallet for work related transactions.",
    color: "teal",
    name: "GitHub",
    balance: "835",
    currency: "USD",
  },
  {
    id: uuid(),
    createdAt: "04/04/2019",
    description: "Wallet for personal transactions.",
    color: "orange",
    name: "Squarespace",
    balance: "835",
    currency: "EUR",
  },
];
