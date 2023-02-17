import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const PieChart = (props) => {
  const theme = useTheme();
  const [isIncome, setIsIncome] = useState(false);

  const data = {
    datasets: [
      {
        data: isIncome ? props.incomes : props.expenses,
        backgroundColor: isIncome ? props.incomeHexColors : props.expenseHexColors,
        borderWidth: 8,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: isIncome ? props.incomeLabels : props.expenseLabels,
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card {...props} sx={{ overflowX: "scroll" }}>
      <CardHeader title={props.title} />
      <Divider />
      <FormControlLabel
        sx={{ ml: 2, mt: 2 }}
        control={<Switch checked={isIncome} onChange={() => setIsIncome(!isIncome)} />}
        label={isIncome ? "Income" : "Expense"}
      />

      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
          flexWrap="wrap"
        >
          {isIncome
            ? props.incomeLabels?.map((income, indx) => (
                <Box
                  key={indx}
                  sx={{
                    p: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography color="textPrimary" variant="body1">
                    {income}
                  </Typography>
                  <Typography style={{ color: props.incomeHexColors[indx] }} variant="h4">
                    {Math.round((props.incomes[indx] / props.incomes.reduce((a, b) => a + b)) * 100)}%
                  </Typography>
                </Box>
              ))
            : props.expenseLabels?.map((expense, indx) => (
                <Box
                  key={indx}
                  sx={{
                    p: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography color="textPrimary" variant="body1">
                    {expense}
                  </Typography>
                  <Typography style={{ color: props.expenseHexColors[indx] }} variant="h4">
                    {Math.round((props.expenses[indx] / props.expenses.reduce((a, b) => a + b)) * 100)}%
                  </Typography>
                </Box>
              ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PieChart;
