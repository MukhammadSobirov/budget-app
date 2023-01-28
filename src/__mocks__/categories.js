import { v4 as uuid } from "uuid";

export const categories = [
  {
    id: uuid(),
    name: "Food",
    category_type: "expense",
    color: "#FF0000",
  },
  {
    id: uuid(),
    name: "Rent",
    category_type: "expense",
    color: "#FF0000",
  },
  {
    id: uuid(),
    name: "Education",
    category_type: "expense",
    color: "#FF0000",
  },
  {
    id: uuid(),
    name: "Sport",
    category_type: "expense",
    color: "#FF0000",
  },
  {
    id: uuid(),
    name: "Entertainment",
    category_type: "expense",
    color: "#FF0000",
  },
  {
    id: uuid(),
    name: "Salary",
    category_type: "income",
    color: "#00FF00",
  },
  {
    id: uuid(),
    name: "Gift",
    category_type: "income",
    color: "#00FF00",
  },
  {
    id: uuid(),
    name: "Investment",
    category_type: "income",
    color: "#00FF00",
  },
  {
    id: uuid(),
    name: "Other",
    category_type: "income",
    color: "#00FF00",
  },
];
