import {
  Card,
  CardHeader,
  CardContent,
  Box,
  alpha,
  Typography,
} from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";

export function Recharts() {
  return (
    <Card>
      <CardHeader title="Recharts" />
      <CardContent>
        <Box height={400}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <Bar
                dataKey="uv"
                strokeWidth={2}
                stroke="#8884d8"
                fill={alpha("#8884d8", 0.3)}
              />
              <Bar
                dataKey="pv"
                strokeWidth={2}
                stroke="#82ca9d"
                fill={alpha("#82ca9d", 0.3)}
              />
              <Bar
                dataKey="amt"
                strokeWidth={2}
                stroke="#0088FE"
                fill={alpha("#0088FE", 0.3)}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={"name"} />
              <YAxis />
              <Legend />
              <Tooltip
                cursor={{
                  fill: alpha("#ccc", 0.3),
                }}
                content={(props) => {
                  return (
                    <Box
                      sx={{
                        bgcolor: "common.white",
                        padding: 3,
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor(theme) {
                          return theme.palette.divider;
                        },
                      }}
                    >
                      <Typography>{props.label}</Typography>
                      {props.payload?.map((item) => {
                        console.log(item);

                        return (
                          <Typography
                            variant="body2"
                            sx={{
                              color: item.stroke,
                              marginTop: 1,
                            }}
                          >
                            {item.dataKey}: {item.value}
                          </Typography>
                        );
                      })}
                    </Box>
                  );
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
