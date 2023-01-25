import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { wallets } from "@/__mocks__/wallets";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import WalletListToolbar from "@/components/Wallet/WalletListToolbar";
import WalletCard from "@/components/Wallet/WalletCard";

const Page = () => (
  <>
    <Head>
      <title>Wallet | Budget</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <WalletListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            {wallets.map((wallet) => (
              <Grid item key={wallet.id} lg={4} md={6} xs={12}>
                <WalletCard wallet={wallet} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 3,
          }}
        >
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
