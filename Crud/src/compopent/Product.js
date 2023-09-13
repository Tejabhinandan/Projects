import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

function getLocalData() {
  const store = localStorage.getItem("saveData");
  if (store) {
    return JSON.parse(store);
  } else {
    return [];
  }
}

function Product() {
  const [close, setClose] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedData, setselectedData] = useState({});
  const [vId, setvId] = useState();
  const [dispalyProduct, setdispalyProduct] = useState(getLocalData());

  useEffect(() => {
    let loadData = localStorage.getItem("saveData");
    const loadedData = JSON.parse(loadData);
    if (loadedData !== null) {
      setdispalyProduct(loadedData);
    }
  }, []);

  let getDetails = (det) => {
    let copy = [...dispalyProduct];
    copy.push(det);
    setdispalyProduct(copy);
  };

  const showModal = () => {
    setClose(!close);
  };
  const showEditModal = () => {
    setEditModal(!editModal);
  };

  const OnEditClick = (val, ind) => {
    setselectedData(val);
    setvId(ind);
    showEditModal();
  };

  const getEditDetails = (details) => {
    let copy = [...dispalyProduct];
    copy.splice(vId, 1, details);
    setdispalyProduct(copy);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Price
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Description
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Image
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                <Button
                  variant="outlined"
                  onClick={() => {
                    showModal();
                  }}
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dispalyProduct?.map((val, ind) => {
              return (
                <>
                  <TableRow
                    key="row.name"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {ind}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {val?.name}
                    </TableCell>
                    <TableCell align="center">{val?.price}</TableCell>
                    <TableCell align="center">{val?.description}</TableCell>
                    <TableCell align="center">
                      <img src={val?.img} alt={val?.name} />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          OnEditClick(val, ind);
                        }}
                      >
                        Edit
                      </Button>
                      <Button variant="outlined">Delete</Button>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <AddProduct showModal={showModal} close={close} getDetails={getDetails} />
      <EditProduct
        selectedData={selectedData}
        getEditDetails={getEditDetails}
        showEditModal={showEditModal}
        editModal={editModal}
      />
    </div>
  );
}

export default Product;
