import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { SeverityPill } from "../SeverityPill";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction, fetchTransactions } from "@/redux/features/transaction/transactionThunks";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TransactionForm from "./TransactionForm";
import GenericModal from "../GenericModal";

const ITEM_HEIGHT = 48;

const TransactionsListResults = ({ ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const currentWallet = useSelector((state) => state.wallet.currentWallet);
  const dispatch = useDispatch();
  const { transactions, count } = useSelector((state) => state.transaction);

  useEffect(() => {
    if (currentWallet.id) {
      dispatch(fetchTransactions(`/api/wallet/transaction/${currentWallet.id}?page=${page}&size=${limit}`));
    }
  }, [currentWallet.id, dispatch, limit, page]);

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
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Edit/Delete</TableCell>{" "}
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TransactionRowItem key={transaction.id} transaction={transaction} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

function TransactionRowItem({ transaction }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Generic modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // delete transaction modal state
  const dispatch = useDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDelete = () => {
    dispatch(deleteTransaction(transaction.id));
    handleCloseDeleteModal();
  };

  return (
    <TableRow>
      <TableCell>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography color="textPrimary" variant="body1">
            {transaction.category.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>{transaction.amount}</TableCell>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>
        <SeverityPill color={transaction.category.type === "EXPENSE" ? "error" : "success"}>
          {transaction.category.type}
        </SeverityPill>
      </TableCell>
      <TableCell>{transaction.date}</TableCell>
      <TableCell>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          <MenuItem onClick={handleOpenModal}>
            <Typography>Edit</Typography>
          </MenuItem>
          <MenuItem onClick={handleOpenDeleteModal}>
            <Typography>Delete</Typography>
          </MenuItem>
        </Menu>
      </TableCell>
      <TransactionForm open={openModal} handleClose={handleCloseModal} transaction={transaction} isEdit={true} />
      {/* delete modal */}
      <GenericModal open={openDeleteModal} handleClose={handleClose}>
        <Typography variant="h5" component="h2" gutterBottom>
          Are you sure you want to delete this transaction?
        </Typography>
        <Typography variant="body1" gutterBottom>
          This action cannot be undone.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}>
          <Button onClick={handleCloseDeleteModal} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained">
            Delete
          </Button>
        </Box>
      </GenericModal>
    </TableRow>
  );
}

export default TransactionsListResults;
