import PropTypes from "prop-types";
import { Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import Clock from "@mui/icons-material/QueryBuilder";
import FunctionsIcon from "@mui/icons-material/Functions";
import { Wallet } from "@mui/icons-material";

const WalletCard = ({ wallet, ...rest }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
    {...rest}
  >
    <CardContent>
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
        {wallet.title}
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
            Updated 2hr ago
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

WalletCard.propTypes = {
  wallet: PropTypes.object.isRequired,
};

export default WalletCard;
