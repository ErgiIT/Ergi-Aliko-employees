import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "./Employee.css";

export default function EmployeeProjects({ emplArray }) {
  let pairs = {};
  let daysTogether = {};
  if (Array.isArray(emplArray) && emplArray.length > 0) {
    emplArray.forEach((el1) => {
      emplArray
        .slice(emplArray.indexOf(el1) + 1, emplArray.length)
        .forEach((el2) => {
          // get start and end date of each of employee
          if (el1[0] !== el2[0]) {
            const startDate1 = new Date(el1[2]);
            const endDate1 = el1[3] === "NULL" ? new Date() : new Date(el1[3]);
            const startDate2 = new Date(el2[2]);
            const endDate2 = el2[3] === "NULL" ? new Date() : new Date(el2[3]);
            // check if they are in the same team (working on the same project)
            if (el1[1] === el2[1]) {
              if (startDate1 <= endDate2 && startDate2 <= endDate1) {
                // calculate the start and end day that we need
                const start =
                  startDate1 <= startDate2 ? startDate2 : startDate1;
                const end = endDate1 <= endDate2 ? endDate1 : endDate2;
                if (end >= startDate2) {
                  // put them inside this formula and we get the time they have worked together in days
                  const diffTime = Math.abs(end - start);
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  const x = `${el1[0]}${el2[0]}`;

                  if (!daysTogether[x]) Object.assign(daysTogether, { [x]: 0 });
                  daysTogether[x] = 1 * daysTogether[x] + diffDays;

                  console.log(daysTogether);

                  if (!pairs[x]) Object.assign(pairs, { [x]: [] });
                  pairs[x] = [...pairs[x], [el1[0], el2[0], el1[1], diffDays]];
                }
              }
            }
          }
        });
    });
  }

  const maxPair = Object.keys(daysTogether).reduce((a, b) =>
    daysTogether[a] > daysTogether[b] ? a : b
  );

  return (
    <div>
      <Table size="medium" style={{}}>
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              style={{
                color: "#f3e37cb0",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              Employee ID #1
            </TableCell>
            <TableCell
              align="center"
              style={{
                color: "#f3e37cb0",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              Employee ID #2
            </TableCell>
            <TableCell
              align="center"
              style={{
                color: "#f3e37cb0",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              Project ID
            </TableCell>
            <TableCell
              align="center"
              style={{
                color: "#f3e37cb0",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              Days worked
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {pairs[maxPair] ? (
              <>
                <TableCell
                  align="center"
                  style={{
                    color: "#f3e37cb0",
                    fontSize: "20px",
                  }}
                >
                  {pairs[maxPair][0][0]}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#f3e37cb0",
                    fontSize: "20px",
                  }}
                >
                  {pairs[maxPair][0][1]}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#f3e37cb0",
                    fontSize: "20px",
                  }}
                >
                  {pairs[maxPair][0][2]}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#f3e37cb0",
                    fontSize: "20px",
                  }}
                >
                  {pairs[maxPair][0][3]}
                </TableCell>
              </>
            ) : (
              <p>No data found</p>
            )}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
