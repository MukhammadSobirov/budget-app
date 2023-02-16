import { Bar } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, MenuItem, Select, useTheme } from "@mui/material";
import { useState } from "react";

const SalesGraph = (props) => {
  const theme = useTheme();
  const [limit, setLimit] = useState(10);

  const data = {
    datasets: [
      {
        backgroundColor: "#e6675e",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: props.expense?.slice(-limit),
        label: "Expense",
        maxBarThickness: 10,
      },
      {
        backgroundColor: "#4CAF50",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: props.income?.slice(-limit),
        label: "Income",
        maxBarThickness: 10,
      },
    ],
    labels: props.labels?.slice(-limit),
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider,
        },
      },
    ],
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
      <CardHeader
        action={
          <Select value={limit} onChange={(e) => setLimit(e.target.value)}>
            <MenuItem value={7}>Last 7</MenuItem>
            <MenuItem value={14}>Last 14</MenuItem>
            <MenuItem value={30}>Last 30</MenuItem>
            <MenuItem value={100}>Last 100</MenuItem>
            <MenuItem value={365}>All</MenuItem>
          </Select>
        }
        title="Latest Transactions"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: "relative",
          }}
        >
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesGraph;
