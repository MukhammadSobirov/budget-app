import { Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

const StatWidget = ({ title, value, icon, color, currency }) => {
  return (
    <Paper sx={{ padding: "15px 20px", width: "220px", height: "150px" }}>
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
        {currency}
        {value}
      </Typography>
    </Paper>
  );
};

export default StatWidget;
