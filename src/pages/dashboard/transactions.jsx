import Head from "next/head";
import { Box, Container } from "@mui/material";
import { transactions } from "@/__mocks__/transactions";
import TransactionsListResults from "@/components/transactions/transactionsListResults";
import TransactionListToolbar from "@/components/transactions/TransactionListToolbar";
import DashboardLayout from "@/components/Layout/DashboardLayout";

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
        <Box sx={{ mt: 3 }}>
          <TransactionsListResults transactions={transactions} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
