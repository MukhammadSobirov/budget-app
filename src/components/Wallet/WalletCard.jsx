import PropTypes from "prop-types";
import { Box, Card, CardContent, Divider, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Clock from "@mui/icons-material/QueryBuilder";
import FunctionsIcon from "@mui/icons-material/Functions";
import { Wallet } from "@mui/icons-material";
import { format } from "date-fns";
import { Stack } from "@mui/system";
import More from "@mui/icons-material/MoreVert";
import { useState } from "react";

const ITEM_HEIGHT = 48;

const WalletCard = ({ wallet, ...rest }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      {...rest}
    >
      <CardContent>
        <Stack direction={"row"} justifyContent={"flex-end"} width="100%">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <More />
          </IconButton>
          <Menu
            id="long-menu"
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
            <MenuItem>
              <Typography>Edit</Typography>
            </MenuItem>
            <MenuItem>
              <Typography>Delete</Typography>
            </MenuItem>
          </Menu>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Wallet sx={{ color: wallet.color, fontSize: "5rem" }} />
        </Box>
        <Typography align="center" color="textPrimary" gutterBottom variant="h5">
          {wallet.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {wallet.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Clock color="action" />
            <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              {format(new Date(wallet.updated_at), "dd/MM/yyyy")}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <FunctionsIcon color="action" />
            <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              {wallet.balance} {wallet.currency}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

WalletCard.propTypes = {
  wallet: PropTypes.object.isRequired,
};

export default WalletCard;
