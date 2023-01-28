import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Checkbox,
  IconButton,
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
                    <SeverityPill
                      color={
                        (category.category_type === "expense" && "error") ||
                        (category.category_type === "income" && "success")
                      }
                    >
                      {category.category_type}
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
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
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

CategoriesListResults.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CategoriesListResults;
