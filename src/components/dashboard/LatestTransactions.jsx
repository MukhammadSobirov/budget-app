import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../SeverityPill";

const transactions = [
  {
    id: uuid(),
    category: "Rent",
    amount: 30.5,
    createdAt: 1555016400000,
    transaction_type: "income",
  },
  {
    id: uuid(),
    category: "Food",
    amount: 25.1,
    createdAt: 1555016400000,
    transaction_type: "expense",
  },
  {
    id: uuid(),
    category: "Food",
    amount: 10.99,
    createdAt: 1554930000000,
    transaction_type: "income",
  },
  {
    id: uuid(),
    category: "Salary",
    amount: 96.43,
    createdAt: 1554757200000,
    transaction_type: "income",
  },
  {
    id: uuid(),
    category: "Bonus",
    amount: 32.54,
    createdAt: 1554670800000,
    transaction_type: "expense",
  },
  {
    id: uuid(),
    category: "Lottery",
    amount: 16.76,
    createdAt: 1554670800000,
    transaction_type: "expense",
  },
];

const LatestTransactions = (props) => (
  <Card {...props}>
    <CardHeader title="Latest Transactions" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell sortDirection="desc">
                <Tooltip enterDelay={300} title="Sort">
                  <TableSortLabel active direction="desc">
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((order) => (
              <TableRow hover key={order.id}>
                <TableCell>{order.category}</TableCell>
                <TableCell>${order.amount}</TableCell>
                <TableCell>{format(order.createdAt, "dd/MM/yyyy")}</TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      (order.transaction_type === "expense" && "error") ||
                      (order.transaction_type === "income" && "success")
                    }
                  >
                    {order.transaction_type}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}
    >
      <Button color="primary" endIcon={<ArrowRightIcon fontSize="small" />} size="small" variant="text">
        View all
      </Button>
    </Box>
  </Card>
);

export default LatestTransactions;
