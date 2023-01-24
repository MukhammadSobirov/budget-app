"use client";
import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import { Balance, Percent } from "@mui/icons-material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import StatWidget from "@/components/StatWidget";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function DashboardPage() {
  return (
    <Container>
      <Stack direction={"row"} gap="20px" alignItems="center" flexWrap={"wrap"}>
        <StatWidget
          title={"Balance"}
          value="100.00"
          icon={<Balance sx={{ color: "white" }} />}
          color="teal"
          currency="$"
        />
        <StatWidget
          title={"Expense"}
          value="123,345.00"
          icon={<IndeterminateCheckBoxIcon sx={{ color: "white" }} />}
          color="tomato"
          currency="$"
        />
        <StatWidget
          title={"Income"}
          value="23,000.00"
          icon={<AddBoxIcon sx={{ color: "white" }} />}
          color="green"
          currency="$"
        />

        <StatWidget
          title={"Monthly Change"}
          value="+23%"
          icon={<Percent sx={{ color: "white" }} />}
          color="blue"
          currency=""
        />
      </Stack>
    </Container>
  );
}
