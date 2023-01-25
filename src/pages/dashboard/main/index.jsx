import { Box, Container, Grid } from "@mui/material";
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
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <StatWidget
              title={"Balance"}
              value="100.00"
              icon={<Balance sx={{ color: "white" }} />}
              color="teal"
              currency="$"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <StatWidget
              title={"Expense"}
              value="123,345.00"
              icon={<IndeterminateCheckBoxIcon sx={{ color: "white" }} />}
              color="tomato"
              currency="$"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <StatWidget
              title={"Income"}
              value="23,000.00"
              icon={<AddBoxIcon sx={{ color: "white" }} />}
              color="green"
              currency="$"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <StatWidget title={"Monthly Change"} value="+23%" icon={<Percent sx={{ color: "white" }} />} color="blue" />
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={2}>
          <Grid item xs={12} md={8}>
            <SalesGraph />
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
