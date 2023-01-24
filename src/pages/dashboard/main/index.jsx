import { Box, Container } from "@mui/material";
import { Stack } from "@mui/system";
import { Balance, Percent } from "@mui/icons-material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import StatWidget from "@/components/dashboard/StatWidget";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SalesGraph from "@/components/dashboard/SalesGraph";
import DashboardLayout from "@/components/Layout/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Container>
        <Stack direction={"row"} gap="20px" alignItems="center" flexWrap={"wrap"} justifyContent="space-between">
          <StatWidget
            title={"Balance"}
            value="100.00"
            icon={<Balance sx={{ color: "white" }} />}
            color="teal"
            currency="$"
          />
          <StatWidget
            title={"Expense"}
            value="123,345.00"
            icon={<IndeterminateCheckBoxIcon sx={{ color: "white" }} />}
            color="tomato"
            currency="$"
          />
          <StatWidget
            title={"Income"}
            value="23,000.00"
            icon={<AddBoxIcon sx={{ color: "white" }} />}
            color="green"
            currency="$"
          />

          <StatWidget title={"Monthly Change"} value="+23%" icon={<Percent sx={{ color: "white" }} />} color="blue" />
        </Stack>

        <Box mt={2}>
          <SalesGraph />
        </Box>
      </Container>
    </DashboardLayout>
  );
}
