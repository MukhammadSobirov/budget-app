import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  MenuItem,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import GenericModal from "../GenericModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { colors } from "@/__mocks__/colors";
import { currencies } from "@/__mocks__/currencies";
import { useDispatch } from "react-redux";
import { createWallet } from "@/redux/features/wallets/walletThunk";

const WalletListToolbar = (props) => {
  // Generic modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // redux
  const dispatch = useDispatch();

  // formik implementation
  const formik = useFormik({
    initialValues: {
      name: "",
      color: "",
      currency: "",
      balance: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      color: Yup.string().max(255).required("Wallet color is required"),
      currency: Yup.string().max(255).required("Currency is required"),
      balance: Yup.number().notRequired("Balance is required"),
    }),
    onSubmit: async (values) => {
      dispatch(createWallet(values));
      handleClose();
      formik.resetForm();
    },
  });

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Wallet
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained" onClick={handleOpen}>
            Add wallet
          </Button>
          <GenericModal open={open} handleClose={handleClose}>
            <Stack>
              <Typography variant="h4">Create a wallet</Typography>
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
                <Button color="primary" variant="contained" type="submit">
                  Create
                </Button>
              </form>
            </Stack>
          </GenericModal>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <Search />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search wallet"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default WalletListToolbar;
