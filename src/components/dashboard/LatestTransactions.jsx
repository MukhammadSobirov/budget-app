import PerfectScrollbar from "react-perfect-scrollbar";
import { Box, Button, Card, CardHeader, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../SeverityPill";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "@/redux/features/transaction/transactionThunks";
import { useEffect } from "react";
import Link from "next/link";

const LatestTransactions = (props) => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchTransactions(`/api/transaction/?page=${0}&size=${10}`));
  }, [dispatch]);

  return (
    <Card {...props}>
      <CardHeader title="Latest Transactions" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Wallet</TableCell>

                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((t) => (
                <TableRow hover key={t.id}>
                  <TableCell>{t.wallet.name}</TableCell>
                  <TableCell>{t.category.name}</TableCell>
                  <TableCell>${t.amount}</TableCell>
                  <TableCell>{t.date}</TableCell>
                  <TableCell>
                    <SeverityPill color={t.category.type === "EXPENSE" ? "error" : "success"}>
                      {t.category.type}
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
          <Link href="/dashboard/transactions">View all</Link>
        </Button>
      </Box>
    </Card>
  );
};

export default LatestTransactions;
