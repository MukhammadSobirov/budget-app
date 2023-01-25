import { Category, Home, Paid, Wallet } from "@mui/icons-material";

export const dashboardRoutes = [
  {
    path: "/dashboard/",
    exact: true,
    icon: <Home />,
    name: "Dashboard",
  },
  {
    path: "/dashboard/wallets",
    exact: true,
    icon: <Wallet />,
    name: "Wallets",
  },
  {
    path: "/dashboard/categories",
    exact: true,
    icon: <Category />,
    name: "Categories",
  },
  {
    path: "/dashboard/transactions",
    exact: true,
    icon: <Paid />,
    name: "Transactions",
  },
];
