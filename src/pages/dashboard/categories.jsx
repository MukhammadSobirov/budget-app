import Head from "next/head";
import { Box, Container } from "@mui/material";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import CategoryListToolbar from "@/components/categories/CategoryListToolbar";
import CategoriesListResults from "@/components/categories/CategoriesListResults";

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
          <Box sx={{ mt: 3 }}>
            <CategoriesListResults />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
