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

function EditProduct({
  editModal,
  showEditModal,
  getEditDetails,
  selectedData,
}) {
  const [editData, setEditData] = useState(initialvalue);

  useEffect(() => {
    setEditData({ ...selectedData });
  }, [selectedData]);

  const onHandle = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const saveData = () => {
    getEditDetails(editData);
    showEditModal();
  };
  return (
    <div>
      <Modal
        open={editModal}
        onClose={showEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            sx={{ marginBottom: "5px", marginRight: "10px" }}
            name="name"
            label="Name"
            value={editData?.name}
            variant="outlined"
            onChange={(e) => {
              onHandle(e);
            }}
          />
          <TextField
            name="price"
            label="Price"
            variant="outlined"
            value={editData.price}
            onChange={(e) => {
              onHandle(e);
            }}
          />

          <TextField
            sx={{ marginBottom: "5px", marginRight: "10px" }}
            name="description"
            label="Description"
            variant="outlined"
            value={editData.description}
            onChange={(e) => {
              onHandle(e);
            }}
          />
          <TextField
            name="img"
            label="Image"
            variant="outlined"
            value={editData.img}
            onChange={(e) => {
              onHandle(e);
            }}
          />
          <Box sx={{ alignItems: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={() => {
                showEditModal();
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
              Edit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default EditProduct;
