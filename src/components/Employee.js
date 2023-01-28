import React, { useState } from "react";
import moment from "moment";
import CSVReader from "react-csv-reader";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "./Employee.css";

const Employee = () => {
  const [employeeProjects, setEmployeeProjects] = useState([]);

  const handleFileRead = (data) => {
    let employeeProjectsArray = [];
    for (let i = 1; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (data[i][0] === data[j][0]) {
          continue;
        }
        if (data[i][1] === data[j][1]) {
          let dateFrom = moment(data[i][2]);
          let dateTo = data[i][3] ? moment(data[i][3]) : moment();
          let duration = dateTo.diff(dateFrom, "days");
          employeeProjectsArray.push({
            employee1: data[i][0],
            employee2: data[j][0],
            project: data[i][1],
            daysWorked: duration,
          });
        }
      }
    }
    setEmployeeProjects(employeeProjectsArray);
  };

  const maxDays = Math.max(...employeeProjects.map((ep) => ep.daysWorked));
  const filteredProjects = employeeProjects.filter(
    (ep) => ep.daysWorked === maxDays
  );

  return (
    <div className="Employee">
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
          {filteredProjects.map((employeeProject, index) => (
            <TableRow key={index}>
              <TableCell
                align="center"
                style={{
                  color: "#f3e37cb0",
                  fontSize: "20px",
                }}
              >
                {employeeProject.employee1}
              </TableCell>
              <TableCell
                align="center"
                style={{
                  color: "#f3e37cb0",
                  fontSize: "20px",
                }}
              >
                {employeeProject.employee2}
              </TableCell>
              <TableCell
                align="center"
                style={{
                  color: "#f3e37cb0",
                  fontSize: "20px",
                }}
              >
                {employeeProject.project}
              </TableCell>
              <TableCell
                align="center"
                style={{
                  color: "#f3e37cb0",
                  fontSize: "20px",
                }}
              >
                {employeeProject.daysWorked}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <label title="Add a .csv file" className="addCSV">
        Add a .csv file
      </label>
      <CSVReader
        onFileLoaded={handleFileRead}
        inputId="csvInput"
        inputStyle={{ color: "#9c27b0", fontSize: "20px" }}
      />
    </div>
  );
};

export default Employee;
