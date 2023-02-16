import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import GenericModal from "../GenericModal";
import { useEffect } from "react";
import { SeverityPill } from "../SeverityPill";
import { fetchCategories } from "src/redux/features/category/categoryThunks";
import { fetchWallets } from "src/redux/features/wallets/walletThunk";
import { createTransaction, updateTransaction } from "src/redux/features/transaction/transactionThunks";

const TransactionForm = ({ open, isEdit = false, transaction, handleClose }) => {
  // redux
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const wallet = useSelector((state) => state.wallet);

  useEffect(() => {
    if (category.status === "idle") dispatch(fetchCategories({ size: 1000, page: 0 }));
    if (wallet.status === "idle") dispatch(fetchWallets());
  }, [category.status, dispatch, wallet.status]);

  // formik implementation
  const formik = useFormik({
    initialValues: {
      amount: isEdit ? transaction.amount : "",
      category: isEdit ? transaction.category.id : "",
      wallet: isEdit ? transaction.wallet.id : wallet.currentWallet?.id || "",
      description: isEdit ? transaction.description : "",
      date: isEdit ? transaction.date : "",
    },
    validationSchema: Yup.object({
      amount: Yup.string().required("Amount is required"),
      category: Yup.string().required("Category is required"),
      wallet: Yup.string().required("Wallet is required"),
      description: Yup.string().required("Description is required"),
      date: Yup.string().required("Date is required"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        const { category, wallet, ...rest } = values;
        dispatch(updateTransaction({ ...rest, id: transaction.id, wallet_id: wallet, category_id: category }));
        handleClose();
      } else {
        dispatch(createTransaction(values));
        handleClose();
        formik.resetForm();
      }
    },
  });

  return (
    <GenericModal open={open} handleClose={handleClose}>
      <Stack>
        <Typography variant="h4">{isEdit ? "Edit the Transaction" : "Create a Transaction"}</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Amount"
            margin="normal"
            name="amount"
            type={"number"}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.amount}
            variant="outlined"
          />
          <Stack direction="row" gap="10px" alignItems="center">
            <TextField
              fullWidth
              label="Category"
              margin="normal"
              name="category"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.category}
              variant="outlined"
              select
            >
              {category.categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  <SeverityPill color={category.type === "INCOME" ? "success" : "error"}>{category.name}</SeverityPill>
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Wallet"
              margin="normal"
              name="wallet"
              select
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.wallet}
              variant="outlined"
            >
              {wallet.wallets.map((wallet) => (
                <MenuItem key={wallet.id} value={wallet.id}>
                  {wallet.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <TextField
            fullWidth
            label="Date"
            margin="normal"
            type={"date"}
            name="date"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.date}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            name="description"
            multiline
            rows={2}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.description}
            variant="outlined"
          />

          <Button color="primary" fullWidth size="large" type="submit" variant="contained">
            {isEdit ? "Update" : "Create"}
          </Button>
        </form>
      </Stack>
    </GenericModal>
  );
};

export default TransactionForm;
