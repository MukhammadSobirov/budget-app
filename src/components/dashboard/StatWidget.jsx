import { Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import numeral from "numeral";

const StatWidget = ({ title, value, icon, color, currency }) => {
  return (
    <Paper sx={{ padding: "15px 20px", width: "100%", height: "150px" }}>
      <Stack direction={"row"} justifyContent="space-between" alignItems="center" mb={2}>
        <Stack>
          <Typography variant="body1">{title}</Typography>
        </Stack>
        <Box
          borderRadius={"50px"}
          bgcolor={color}
          width={"50px"}
          height="50px"
          alignItems={"center"}
          justifyContent="center"
          display="flex"
        >
          {icon}
        </Box>
      </Stack>
      <Typography variant="h5">
        {currency} {numeral(value).format("0,0.00")}
      </Typography>
    </Paper>
  );
};

export default StatWidget;
