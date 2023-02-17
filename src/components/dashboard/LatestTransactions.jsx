import PerfectScrollbar from "react-perfect-scrollbar";
import { Box, Card, CardHeader, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { SeverityPill } from "../SeverityPill";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTransactions } from "src/redux/features/transaction/transactionThunks";

const LatestTransactions = (props) => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchTransactions(`/api/transaction/?page=${0}&size=${10}`));
  }, [dispatch]);

  return (
    <Card {...props} sx={{ overflowX: "scroll" }}>
      <CardHeader title="Latest Transactions" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: { xs: 200, md: 800 } }}>
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
                  <TableCell>
                    {t.wallet.currency} {t.amount}
                  </TableCell>
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
    </Card>
  );
};

export default LatestTransactions;
