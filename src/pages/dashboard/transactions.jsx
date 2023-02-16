import Head from "next/head";
import { Box, Container } from "@mui/material";
import TransactionListToolbar from "src/components/transactions/TransactionListToolbar";
import TransactionsListResults from "src/components/transactions/TransactionsListResults";
import DashboardLayout from "src/components/Layout/DashboardLayout";

const Page = () => (
  <>
    <Head>
      <title>Transaction | Budget</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <TransactionListToolbar />
        <Box sx={{ mt: 3, width: { xs: "250px", sm: "350px", md: "100%" } }}>
          <TransactionsListResults />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
