import Head from "next/head";
import { Box, Container } from "@mui/material";
import CategoryListToolbar from "src/components/categories/CategoryListToolbar";
import CategoriesListResults from "src/components/categories/CategoriesListResults";
import DashboardLayout from "src/components/Layout/DashboardLayout";

const Page = () => {
  return (
    <>
      <Head>
        <title>Categories | Budget</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CategoryListToolbar />
          <Box sx={{ mt: 3, width: { xs: "250px", sm: "350px", md: "100%" } }}>
            <CategoriesListResults />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
