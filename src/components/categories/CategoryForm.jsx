import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Stack } from "@mui/system";
import { useDispatch } from "react-redux";
import GenericModal from "../GenericModal";
import { createCategory, updateCategory } from "src/redux/features/category/categoryThunks";

const CategoryForm = ({ open, isEdit = false, category, handleClose }) => {
  // redux
  const dispatch = useDispatch();

  // formik implementation
  const formik = useFormik({
    initialValues: {
      name: category?.name || "",
      color: category?.color || "#e66465",
      type: category?.type || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      color: Yup.string().max(255).required("Category color is required"),
      type: Yup.string().max(255).required("Type is required"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        dispatch(updateCategory({ ...values, id: category.id }));
        handleClose();
      } else {
        dispatch(createCategory(values));
        handleClose();
        formik.resetForm();
      }
    },
  });

  return (
    <GenericModal open={open} handleClose={handleClose}>
      <Stack>
        <Typography variant="h4">{isEdit ? "Edit the Category" : "Create a Category"}</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            variant="outlined"
          />
          <TextField
            type={"color"}
            fullWidth
            label="Color"
            margin="normal"
            name="color"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.color}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Type"
            margin="normal"
            name="type"
            select
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.type}
            variant="outlined"
          >
            <MenuItem value="INCOME">Income</MenuItem>
            <MenuItem value="EXPENSE">Expense</MenuItem>
          </TextField>
          <Button color="primary" fullWidth size="large" variant="contained" type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </form>
      </Stack>
    </GenericModal>
  );
};

export default CategoryForm;
