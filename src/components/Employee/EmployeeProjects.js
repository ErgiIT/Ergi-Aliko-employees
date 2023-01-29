import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "./Employee.css";

export default function EmployeeProjects({ emplArray }) {
  let empPairs = {};
  let pairDaysTogether = {};
  if (Array.isArray(emplArray) && emplArray.length > 0) {
    emplArray.forEach((emp1) => {
      emplArray
        .slice(emplArray.indexOf(emp1) + 1, emplArray.length)
        .forEach((emp2) => {
          if (emp1[0] !== emp2[0]) {
            const dateFrom1 = new Date(emp1[2]);
            const dateTo1 = emp1[3] === "NULL" ? new Date() : new Date(emp1[3]);
            const dateFrom2 = new Date(emp2[2]);
            const dateTo2 = emp2[3] === "NULL" ? new Date() : new Date(emp2[3]);
            if (emp1[1] === emp2[1]) {
              if (dateFrom1 <= dateTo2 && dateFrom2 <= dateTo1) {
                const start = dateFrom1 <= dateFrom2 ? dateFrom2 : dateFrom1;
                const end = dateTo1 <= dateTo2 ? dateTo1 : dateTo2;
                if (end >= dateFrom2) {
                  const timeDifference = Math.abs(end - start);
                  const daysDifference = Math.ceil(
                    timeDifference / (1000 * 60 * 60 * 24)
                  );
                  const x = `${emp1[0]}${emp2[0]}`;

                  if (!pairDaysTogether[x])
                    Object.assign(pairDaysTogether, { [x]: 0 });
                  pairDaysTogether[x] =
                    1 * pairDaysTogether[x] + daysDifference;

                  if (!empPairs[x]) {
                    empPairs[x] = [];
                  }
                  empPairs[x].push([emp1[0], emp2[0], emp1[1], daysDifference]);
                }
              }
            }
          }
        });
    });
  }

  const maxPair = Object.keys(pairDaysTogether).reduce((a, b) =>
    pairDaysTogether[a] > pairDaysTogether[b] ? a : b
  );

  return (
    <div>
      <Table size="medium">
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
          {empPairs[maxPair] ? (
            empPairs[maxPair].map((pair, index) => (
              <TableRow key={index}>
                <TableCell
                  align="center"
                  style={{
                    color: "#f3e37cb0",
                    fontSize: "20px",
                  }}
                >
                  {pair[0]}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#f3e37cb0",
                    fontSize: "20px",
                  }}
                >
                  {pair[1]}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#f3e37cb0",
                    fontSize: "20px",
                  }}
                >
                  {pair[2]}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#f3e37cb0",
                    fontSize: "20px",
                  }}
                >
                  {pair[3]}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={4}>
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
