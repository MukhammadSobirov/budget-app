import { Search } from "@mui/icons-material";
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography } from "@mui/material";
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
