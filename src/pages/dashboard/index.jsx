import { Container, Grid } from "@mui/material";
import { Balance, Percent } from "@mui/icons-material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import StatWidget from "@/components/dashboard/StatWidget";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SalesGraph from "@/components/dashboard/SalesGraph";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import PieChart from "@/components/dashboard/PieChart";
import LatestTransactions from "@/components/dashboard/LatestTransactions";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats, selectAllStats } from "@/redux/features/stats/statsSlice";

function Page() {
  const dispatch = useDispatch();
  const stats = useSelector(selectAllStats);

  useEffect(() => {
    if (stats.status === "idle") {
      dispatch(fetchStats());
    }
  }, [dispatch, stats.status]);

  return (
    <>
      <Head>
        <title>Wallet | Budget</title>
      </Head>
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
          <Grid item xs={12} md={4}>
            <PieChart sx={{ height: "100%" }} title="Expenses by Category" />
          </Grid>
          <Grid item xs={12}>
            <LatestTransactions />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
