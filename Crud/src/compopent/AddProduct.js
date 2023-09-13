import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialvalue = {
  name: "",
  price: "",
  description: "",
  img: "",
};

function AddProduct({ close, showModal, getDetails }) {
  const [products, setProducts] = useState(initialvalue);
  const [saveProducts, setSaveProducts] = useState([]);
  console.log(saveProducts, "saveProducts");

  useEffect(() => {
    localStorage.setItem("saveData", JSON.stringify(saveProducts));
  }, [saveProducts]);

  const onHandle = (e) => {
    setProducts({
      ...products,
      [e.target.name]: e.target.value,
    });
  };
  const saveData = () => {
    getDetails(products);
    let copyPro = [...saveProducts];
    copyPro.push(products);
    setSaveProducts(copyPro);
    showModal();
    setProducts(initialvalue);
  };

  return (
    <div>
      <Modal
        open={close}
        onClose={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            sx={{ marginBottom: "5px", marginRight: "10px" }}
            name="name"
            label="Name"
            value={products?.name}
            variant="outlined"
            onChange={(e) => {
              onHandle(e);
            }}
          />
          <TextField
            name="price"
            label="Price"
            variant="outlined"
            value={products.price}
            onChange={(e) => {
              onHandle(e);
            }}
          />

          <TextField
            sx={{ marginBottom: "5px", marginRight: "10px" }}
            name="description"
            label="Description"
            variant="outlined"
            value={products.description}
            onChange={(e) => {
              onHandle(e);
            }}
          />
          <TextField
            name="img"
            label="Image"
            variant="outlined"
            value={products.img}
            onChange={(e) => {
              onHandle(e);
            }}
          />
          <Box sx={{ alignItems: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={() => {
                showModal();
              }}
            >
              Close
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                saveData();
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AddProduct;
