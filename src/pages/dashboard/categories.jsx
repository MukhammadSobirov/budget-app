import Head from "next/head";
import { Box, Container } from "@mui/material";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import CategoryListToolbar from "@/components/categories/CategoryListToolbar";
import CategoriesListResults from "@/components/categories/CategoriesListResults";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "@/redux/features/category/categoryThunks";

const Page = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
            <CategoriesListResults categories={categories} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
