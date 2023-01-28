import React, { useState } from "react";
import moment from "moment";
import CSVReader from "react-csv-reader";

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

  return (
    <div>
      <CSVReader
        onFileLoaded={handleFileRead}
        inputId="ObiWan"
        inputStyle={{ color: "red" }}
      />
      <table>
        <thead>
          <tr>
            <th>Employee ID #1</th>
            <th>Employee ID #2</th>
            <th>Project ID</th>
            <th>Days worked</th>
          </tr>
        </thead>
        <tbody>
          {employeeProjects.map((employeeProject, index) => (
            <tr key={index}>
              <td>{employeeProject.employee1}</td>
              <td>{employeeProject.employee2}</td>
              <td>{employeeProject.project}</td>
              <td>{employeeProject.daysWorked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
