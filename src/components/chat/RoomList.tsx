import React, { FC, useState } from "react";
import { TextField, Box, Avatar, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { selectRooms } from "../../redux/features/chats/roomSlice";
import CreateRoom from "./CreateRoom";

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

  return (
    <Box sx={{ padding: "16px", flex: 0.33 }}>
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
            marginBottom: "16px",
            backgroundColor: "primary.main",
            borderRadius: 5,
            "& .MuiOutlinedInput-root": {
              borderRadius: 5,
              "& fieldset": {
                borderColor: "primary.main",
              },
              "&:hover fieldset": {
                borderColor: "white",
                borderRadius: 5,
              },
              "& label.Mui-focused": {
                color: "white",
              },
            },
          }}
        />
      </Box>
      {filteredChatRooms.map((room) => (
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
      ))}
      <CreateRoom />
    </Box>
  );
};

export default RoomList;
