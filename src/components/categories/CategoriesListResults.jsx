import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { SeverityPill } from "../SeverityPill";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { deleteCategory } from "@/redux/features/category/categoryThunks";
import CategoryForm from "./CategoryForm";
import GenericModal from "../GenericModal";

const ITEM_HEIGHT = 48;

const CategoriesListResults = ({ categories, ...rest }) => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCategoryIds;

    if (event.target.checked) {
      newSelectedCategoryIds = categories.map((category) => category.id);
    } else {
      newSelectedCategoryIds = [];
    }

    setSelectedCategoryIds(newSelectedCategoryIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCategoryIds.indexOf(id);
    let newSelectedCategoryIds = [];

    if (selectedIndex === -1) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(selectedCategoryIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(selectedCategoryIds.slice(1));
    } else if (selectedIndex === selectedCategoryIds.length - 1) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(selectedCategoryIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(
        selectedCategoryIds.slice(0, selectedIndex),
        selectedCategoryIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCategoryIds(newSelectedCategoryIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCategoryIds.length === categories.length}
                    color="primary"
                    indeterminate={selectedCategoryIds.length > 0 && selectedCategoryIds.length < categories.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Edit/Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.slice(0, limit).map((category) => (
                <CategoryRowItem
                  key={category.id}
                  category={category}
                  selectedCategoryIds={selectedCategoryIds}
                  handleSelectOne={handleSelectOne}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={categories.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

function CategoryRowItem({ category, selectedCategoryIds, handleSelectOne }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Generic modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // delete wallet modal state
  const dispatch = useDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDelete = () => {
    dispatch(deleteCategory(category.id));
    handleCloseDeleteModal();
  };

  return (
    <TableRow hover key={category.id} selected={selectedCategoryIds.indexOf(category.id) !== -1}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedCategoryIds.indexOf(category.id) !== -1}
          onChange={(event) => handleSelectOne(event, category.id)}
          value="true"
        />
      </TableCell>
      <TableCell>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography color="textPrimary" variant="body1">
            {category.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <SeverityPill color={(category.type === "EXPENSE" && "error") || (category.type === "INCOME" && "success")}>
          {category.type}
        </SeverityPill>
      </TableCell>
      <TableCell>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography color="textPrimary" variant="body1">
            {category.color}
          </Typography>
          <Box
            sx={{
              backgroundColor: category.color,
              borderRadius: 1,
              height: 16,
              marginLeft: 2,
              width: 16,
            }}
          />
        </Box>
      </TableCell>
      <TableCell>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          <MenuItem onClick={handleOpenModal}>
            <Typography>Edit</Typography>
          </MenuItem>
          <MenuItem onClick={handleOpenDeleteModal}>
            <Typography>Delete</Typography>
          </MenuItem>
        </Menu>
      </TableCell>
      <CategoryForm open={openModal} handleClose={handleCloseModal} category={category} isEdit={true} />
      {/* delete modal */}
      <GenericModal open={openDeleteModal} handleClose={handleClose}>
        <Typography variant="h5" component="h2" gutterBottom>
          Are you sure you want to delete this category?
        </Typography>
        <Typography variant="body1" gutterBottom>
          This action cannot be undone.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}>
          <Button onClick={handleCloseDeleteModal} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained">
            Delete
          </Button>
        </Box>
      </GenericModal>
    </TableRow>
  );
}

CategoriesListResults.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CategoriesListResults;
