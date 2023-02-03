import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { Stack } from "@mui/system";
import GenericModal from "../GenericModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { colors } from "@/__mocks__/colors";
import { currencies } from "@/__mocks__/currencies";
import { useDispatch } from "react-redux";
import { createWallet } from "@/redux/features/wallets/walletThunk";

const WalletForm = ({ open, isEdit = false, wallet, handleClose }) => {
  // redux
  const dispatch = useDispatch();

  // formik implementation
  const formik = useFormik({
    initialValues: {
      name: wallet?.name || "",
      color: wallet?.color || "",
      currency: wallet?.currency || "",
      balance: wallet?.balance || 0,
      description: wallet?.description || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      color: Yup.string().max(255).required("Wallet color is required"),
      currency: Yup.string().max(255).required("Currency is required"),
      balance: Yup.number().notRequired(),
      description: Yup.string().max(255).notRequired(),
    }),
    onSubmit: async (values) => {
      dispatch(createWallet(values));
      handleClose();
      formik.resetForm();
    },
  });

  return (
    <GenericModal open={open} handleClose={handleClose}>
      <Stack>
        <Typography variant="h4">{isEdit ? "Edit the Wallet" : "Create a Wallet"}</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Color"
            margin="normal"
            select
            name="color"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.color}
            variant="outlined"
          >
            {colors.map((color) => (
              <MenuItem key={color} value={color}>
                <Box sx={{ backgroundColor: color, borderRadius: "50%", height: 20, width: 20 }} />
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Currency"
            margin="normal"
            name="currency"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.currency}
            variant="outlined"
            select
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency.value}>
                {currency.value} - {currency.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Balance"
            margin="normal"
            name="balance"
            type={"number"}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.balance}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Description"
            margin="normal"
            name="description"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.description}
            variant="outlined"
            multiline
            rows={4}
          />

          <Button color="primary" variant="contained" type="submit">
            Create
          </Button>
        </form>
      </Stack>
    </GenericModal>
  );
};

export default WalletForm;
