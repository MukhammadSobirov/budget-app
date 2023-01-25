import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { SeverityPill } from "../SeverityPill";

const TransactionsListResults = ({ transactions, ...rest }) => {
  const [selectedTransactionIds, setSelectedTransactionIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedTransactionIds;

    if (event.target.checked) {
      newSelectedTransactionIds = transactions.map((transaction) => transaction.id);
    } else {
      newSelectedTransactionIds = [];
    }

    setSelectedTransactionIds(newSelectedTransactionIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedTransactionIds.indexOf(id);
    let newSelectedTransactionIds = [];

    if (selectedIndex === -1) {
      newSelectedTransactionIds = newSelectedTransactionIds.concat(selectedTransactionIds, id);
    } else if (selectedIndex === 0) {
      newSelectedTransactionIds = newSelectedTransactionIds.concat(selectedTransactionIds.slice(1));
    } else if (selectedIndex === selectedTransactionIds.length - 1) {
      newSelectedTransactionIds = newSelectedTransactionIds.concat(selectedTransactionIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedTransactionIds = newSelectedTransactionIds.concat(
        selectedTransactionIds.slice(0, selectedIndex),
        selectedTransactionIds.slice(selectedIndex + 1)
      );
    }

    setSelectedTransactionIds(newSelectedTransactionIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedTransactionIds.length === transactions.length}
                    color="primary"
                    indeterminate={
                      selectedTransactionIds.length > 0 && selectedTransactionIds.length < transactions.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.slice(0, limit).map((transaction) => (
                <TableRow hover key={transaction.id} selected={selectedTransactionIds.indexOf(transaction.id) !== -1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedTransactionIds.indexOf(transaction.id) !== -1}
                      onChange={(event) => handleSelectOne(event, transaction.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {transaction.category}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <SeverityPill
                      color={
                        (transaction.transaction_type === "expense" && "error") ||
                        (transaction.transaction_type === "income" && "success")
                      }
                    >
                      {transaction.transaction_type}
                    </SeverityPill>
                  </TableCell>
                  <TableCell>{format(transaction.date, "dd/MM/yyyy")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={transactions.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

TransactionsListResults.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default TransactionsListResults;
