import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, TextField } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";
import { db } from "../../firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
// import uuid
import { v4 as uuidv4 } from "uuid";
import { selectUser } from "../../redux/features/user/userSlice";
import { useAppSelector } from "../../redux/hooks";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "primary.main",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  color: "text.primary",
};

export default function CreateRoom() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useAppSelector(selectUser);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const roomName = data.get("roomName");
    if (!roomName) return;
    await addDoc(collection(db, "chatterfly_chat_rooms"), {
      id: uuidv4(),
      name: roomName,
      photoURL: "",
      joiningCode: uuidv4(),
      createdby: user.uid,
      members: [],
      messages: [
        {
          id: uuidv4(),
          message: "Welcome to the room",
          sender: "Chatterfly",
        },
      ],
    });
    handleClose();
  };
  return (
    <div>
      <IconButton
        onClick={handleOpen}
        sx={{
          bgcolor: "primary.main",
          color: "text.primary",
          padding: 3,
          position: "sticky",
        }}
      >
        <CreateOutlined
          sx={{
            fontSize: 30,
          }}
        />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create Room
            </Typography>
            <Box onSubmit={handleSubmit} component={"form"} sx={{ mt: 2 }}>
              <TextField
                sx={{
                  "& label.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiInputBase-root": {
                    color: "white",
                    borderRadius: "20px",
                    backgroundColor: "primary.main",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "primary.main",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                    border: "1px solid white",
                  },
                }}
                fullWidth
                label="Room Name"
                variant="outlined"
                name="roomName"
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2, alignSelf: "end" }}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
