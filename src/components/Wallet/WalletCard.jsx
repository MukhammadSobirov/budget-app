import PropTypes from "prop-types";
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Clock from "@mui/icons-material/QueryBuilder";
import { Wallet } from "@mui/icons-material";
import { format } from "date-fns";
import { Stack } from "@mui/system";
import More from "@mui/icons-material/MoreVert";
import { useState } from "react";
import WalletForm from "./WalletForm";
import { deleteWallet } from "@/redux/features/wallets/walletThunk";
import { useDispatch } from "react-redux";
import GenericModal from "../GenericModal";

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

  // Generic modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // delete wallet modal state
  const dispatch = useDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDelete = () => {
    dispatch(deleteWallet(wallet.id));
    handleCloseDeleteModal();
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
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <More />
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
              {format(new Date(wallet.created_at), "dd/MM/yyyy")}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          ></Grid>
        </Grid>
      </Box>
      <WalletForm open={openModal} handleClose={handleCloseModal} isEdit={true} wallet={wallet} />

      {/* delete modal */}
      <GenericModal open={openDeleteModal} handleClose={handleClose}>
        <Typography variant="h5" component="h2" gutterBottom>
          Are you sure you want to delete this wallet?
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
    </Card>
  );
};

WalletCard.propTypes = {
  wallet: PropTypes.object.isRequired,
};

export default WalletCard;
