import { Box, Button, TextField } from "@mui/material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";

const initialValue = {
  fname: "",
  lname: "",
  email: "",
  num: "",
  city: "",
};

function EmployeeDetails() {
  const [empData, setEmpData] = useState(initialValue);
  const [listData, setListData] = useState([]);
  const [index, setIndex] = useState(null);
  const [isEdit, setIsedit] = useState(false);
  const [empError, setEmpError] = useState({
    fname: "",
    lname: "",
    email: "",
    num: "",
    city: "",
  });

  const onHandle = (e) => {
    setEmpData({
      ...empData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = false;

    const errObj = {
      fname: "",
      lname: "",
      email: "",
      num: "",
      city: "",
    };
    if (empData?.fname === "") {
      errObj.fname = "This field is required";
      err = true;
    }
    if (empData?.lname === "") {
      errObj.lname = "This field is required";
      err = true;
    }
    if (empData.email === "") {
      errObj.email = "This field is required";
      err = true;
    }
    if (empData.num === "") {
      errObj.num = "This field is required";
      err = true;
    }
    if (empData.city === "") {
      errObj.city = "This field is required";
      err = true;
    }
    setEmpError({ ...errObj });
    return err;
  };

  const saveData = () => {
    if (!validate()) {
      setListData([...listData, empData]);
      setEmpData(initialValue);
    }
  };

  const OnEditClick = (val, id) => {
    setIndex(id);
    setEmpData(val);
    setIsedit(!isEdit);
  };

  const editData = () => {
    if (!validate()) {
      listData.splice(index, 1, empData);
      setEmpData(initialValue);
      setIsedit(!isEdit);
    }
  };

  const onDel = (id) => {
    let del = listData.filter((val, i) => {
      return i !== id;
    });
    setListData(del);
  };

  return (
    <div>
      <Box>
        <h1>CRUD</h1>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ margin: "10px" }}>
            <TextField
              required
              label="First Name"
              variant="filled"
              name="fname"
              value={empData?.fname}
              onChange={onHandle}
            />
            {empError?.fname && (
              <div style={{ color: "red" }}>{empError?.fname} </div>
            )}
          </Box>
          <Box sx={{ margin: "10px" }}>
            <TextField
              required
              label="Last Name"
              variant="filled"
              name="lname"
              value={empData?.lname}
              onChange={onHandle}
            />
            {empError?.lname && (
              <div style={{ color: "red" }}>{empError?.lname} </div>
            )}
          </Box>
          <Box sx={{ margin: "10px" }}>
            <TextField
              required
              label="E-mail"
              variant="filled"
              name="email"
              value={empData?.email}
              onChange={onHandle}
            />
            {empError?.email && (
              <div style={{ color: "red" }}>{empError?.email} </div>
            )}
          </Box>
          <Box sx={{ margin: "10px" }}>
            <TextField
              required
              type="number"
              label="Phone No"
              variant="filled"
              name="num"
              value={empData?.num}
              onChange={onHandle}
            />
            {empError?.num && (
              <div style={{ color: "red" }}>{empError?.num} </div>
            )}
          </Box>
          <Box sx={{ margin: "10px" }}>
            <TextField
              required
              label="City"
              variant="filled"
              name="city"
              value={empData?.city}
              onChange={onHandle}
            />
            {empError?.city && (
              <div style={{ color: "red" }}>{empError?.city} </div>
            )}
          </Box>
        </Box>
        <Button variant="outlined" onClick={isEdit ? editData : saveData}>
          {isEdit ? "Edit" : "Add"}
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="center">
                  First Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="center">
                  Last Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="center">
                  Email
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="center">
                  Phone No
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="center">
                  City
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  align="center"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listData?.map((val, ind) => {
                return (
                  <>
                    <TableRow
                      key="row.name"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{ind}</TableCell>
                      <TableCell align="center">{val?.fname}</TableCell>
                      <TableCell align="center">{val?.lname}</TableCell>
                      <TableCell align="center">{val?.email}</TableCell>
                      <TableCell align="center">{val?.num}</TableCell>
                      <TableCell align="center">{val?.city}</TableCell>

                      <TableCell align="center">
                        <Box>
                          <Button
                            sx={{ marginRight: "5px" }}
                            variant="outlined"
                            onClick={() => {
                              OnEditClick(val, ind);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              onDel(ind);
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default EmployeeDetails;
