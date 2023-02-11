import { useState } from "react";
import { Search } from "@mui/icons-material";
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography } from "@mui/material";
import CategoryForm from "./CategoryForm";

const CategoryListToolbar = (props) => {
  // Generic modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Category
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained" onClick={handleOpen}>
            Add Category
          </Button>
          <CategoryForm open={open} handleClose={handleClose} />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <Search />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search Category"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
export default CategoryListToolbar;
