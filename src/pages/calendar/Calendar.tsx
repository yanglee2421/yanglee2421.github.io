import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  styled,
  Box,
} from "@mui/material";

export function Calendar() {
  const today = new Date();

  const monthFirstTime = today.setDate(1);
  const monthEndTime = today.setMonth(today.getMonth() + 1, 0);
  const dayInterval = 1000 * 60 * 60 * 24;
  const monthFirst = new Date(monthFirstTime);

  const dates = [];
  for (let i = monthFirstTime; i < monthEndTime + 1; i += dayInterval) {
    dates.push(new Date(i));
  }

  for (let i = monthFirst.getDay(); i > 0; i--) {
    dates.unshift(new Date(monthFirstTime - i * dayInterval));
  }

  const nextMonthDays = 35 - dates.length;
  for (let i = 1; i < nextMonthDays + 1; i++) {
    dates.push(new Date(monthEndTime + i * dayInterval));
  }

  console.log("###", dates);

  const data = [];
  for (let i = 0; i < dates.length; i += 7) {
    data.push(dates.slice(i, i + 7));
  }

  console.log(data);

  return (
    <Box sx={{ m: 3 }}>
      <TableContainer>
        <Table>
          <StyledCaption>calendar</StyledCaption>
          <TableHead>
            <TableRow>
              <TableCell>SUN</TableCell>
              <TableCell>MON</TableCell>
              <TableCell>TRI</TableCell>
              <TableCell>Web</TableCell>
              <TableCell>THU</TableCell>
              <TableCell>FRI</TableCell>
              <TableCell>SAT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => {
              return (
                <TableRow key={idx}>
                  {row.map((cell) => {
                    return (
                      <TableCell
                        key={cell.getTime()}
                        sx={{
                          color(theme) {
                            if (cell.getDate() === new Date().getDate()) {
                              return theme.palette.primary.main;
                            }
                          },
                        }}
                      >
                        {cell.getDate()}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>SUN</TableCell>
              <TableCell>MON</TableCell>
              <TableCell>TRI</TableCell>
              <TableCell>Web</TableCell>
              <TableCell>THU</TableCell>
              <TableCell>FRI</TableCell>
              <TableCell>SAT</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}

const StyledCaption = styled("caption")({
  textTransform: "capitalize",
});
