import React, { FC, useState } from "react";
import {
  TextField,
  Box,
  Avatar,
  Typography,
  IconButton,
  Skeleton,
} from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { selectRooms } from "../../redux/features/chats/roomSlice";
import CreateRoom from "./CreateRoom";
import { ExitToAppOutlined, LogoutOutlined } from "@mui/icons-material";
import { logout } from "../../redux/features/user/userSlice";
import { logoutFirebase } from "../../firebase/firebase.config";
import { useDispatch } from "react-redux";

interface RoomListProps {
  setActiveRoom: React.Dispatch<React.SetStateAction<{}>>;
  activeRoom: any;
}
const RoomList: FC<RoomListProps> = ({ activeRoom, setActiveRoom }) => {
  const [searchText, setSearchText] = useState("");
  const rooms = useAppSelector(selectRooms);

  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value);
  };
  // create room listener
  const filteredChatRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const dispatch = useDispatch();

  return (
    <Box sx={{ padding: "16px", flex: 0.33 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "sapce-between",
        }}
      >
        <img
          src="/images/logo.png"
          alt="landing"
          style={{
            width: 60,
            height: "auto",
            marginLeft: "10%",
          }}
        />
        <Typography
          color="text.primary"
          sx={{
            //   text color linear gradient
            backgroundImage:
              "linear-gradient(90deg, #6C63FF 0%, #C100D4 50%, #82ECEE 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "1.5rem", md: "2.5rem" },
            textAlign: "center",
            marginLeft: 2,
          }}
        >
          ChatterFly
        </Typography>
        <IconButton
          onClick={() => {
            dispatch(logout);
            logoutFirebase();
          }}
          sx={{
            backgroundColor: "primary.main",
            ml: 1,
          }}
        >
          <LogoutOutlined
            sx={{
              color: "primary.light",
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <TextField
          label="Search Rooms"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={handleSearchChange}
          sx={{
            "& label.Mui-focused": {
              color: "primary.light",
            },
            "& label": {
              color: "primary.light",
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
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
          }}
        />
      </Box>
      <Box
        sx={{
          overflowY: "scroll",
          maxHeight: "70vh",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
        }}
      >
        {rooms.length
          ? filteredChatRooms.map((room) => (
              <React.Fragment key={room.id}>
                <Box
                  onClick={() => setActiveRoom(room)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    my: 1,
                    color: "text.primary",
                    cursor: "pointer",
                    // hover
                    "&:hover": {
                      bgcolor: "primary.main",
                    },
                    bgcolor: activeRoom.id === room.id ? "primary.main" : "",
                    padding: 1,
                    borderRadius: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Avatar src={room.photoURL}>
                      {room.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </Avatar>
                    <Box
                      sx={{
                        marginLeft: "16px",
                      }}
                    >
                      <Typography variant="h6">{room.name}</Typography>
                      <Typography variant="body2">
                        {room.messages[0]?.message}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2">
                    {new Date(room.messages[0]?.timestamp).toLocaleTimeString()}
                  </Typography>
                </Box>
              </React.Fragment>
            ))
          : // form a aray of 6
            Array.from(Array(10).keys()).map((key) => (
              <Box
                key={key}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: 1,
                  color: "text.primary",
                }}
              >
                <Skeleton variant="circular" width={50} height={50} />
                <Box
                  // width={"100%"}
                  sx={{
                    ml: 1,
                    flex: 1,
                  }}
                >
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1.5rem", width: "60%" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", width: "60%" }}
                  />
                </Box>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "10%" }}
                />
              </Box>
            ))}
      </Box>

      {/* <CreateRoom /> */}
    </Box>
  );
};

export default RoomList;
