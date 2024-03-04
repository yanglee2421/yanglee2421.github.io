import { Paper } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function PieCard() {
  return (
    <Paper
      sx={{
        height: 300,
        transform: "translateY(0)",
        transition(theme) {
          return theme.transitions.create("transform");
        },
        "&:hover": {
          transform: "translateY(-0.25rem)",
        },
      }}
    >
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={[
              { name: "Group A", value: 400 },
              { name: "Group B", value: 300 },
              { name: "Group C", value: 300 },
              { name: "Group D", value: 200 },
            ]}
            // cx={120}
            // cy={200}
            innerRadius={72}
            outerRadius={96}
            // fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            <Cell fill="#0088FE" stroke="#0088FE"></Cell>
            <Cell fill="#00C49F" stroke="#00C49F"></Cell>
            <Cell fill="#FFBB28" stroke="#FFBB28"></Cell>
            <Cell fill="#FF8042" stroke="#FF8042"></Cell>
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}
