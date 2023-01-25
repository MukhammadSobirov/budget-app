import { v4 as uuid } from "uuid";

export const transactions = [
  {
    id: uuid(),
    category: "Food",
    amount: 12.99,
    currency: "USD",
    date: new Date().getDate(),
    description: "Bought a pizza",
    wallet_id: "1",
    transaction_type: "expense",
  },
  {
    id: uuid(),
    category: "Food",
    amount: 12.99,
    currency: "USD",
    date: new Date().getDate(),
    description: "Bought a pizza",
    wallet_id: "1",
    transaction_type: "income",
  },
];
