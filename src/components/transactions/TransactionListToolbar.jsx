import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import TransactionForm from "./TransactionForm";

const TransactionListToolbar = (props) => {
  // Generic modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          Transaction
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained" onClick={handleOpen}>
            Add Transaction
          </Button>
          <TransactionForm open={open} handleClose={handleClose} />
        </Box>
      </Box>
    </Box>
  );
};

export default TransactionListToolbar;
