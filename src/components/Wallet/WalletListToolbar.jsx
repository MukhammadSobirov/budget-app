import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import WalletForm from "./WalletForm";

const WalletListToolbar = (props) => {
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
          Wallet
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained" onClick={handleOpen}>
            Add wallet
          </Button>
          <WalletForm open={open} handleClose={handleClose} />
        </Box>
      </Box>
    </Box>
  );
};

export default WalletListToolbar;
