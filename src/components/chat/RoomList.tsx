import React, { FC, useState } from "react";
import {
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Avatar,
  Typography,
} from "@mui/material";

interface RoomListProps {
  setActiveRoom: React.Dispatch<React.SetStateAction<{}>>;
  activeRoom: any;
}
const RoomList: FC<RoomListProps> = ({ activeRoom, setActiveRoom }) => {
  const [searchText, setSearchText] = useState("");
  const [chatRooms, setChatRooms] = useState([
    { id: 1, name: "General Chat", photoURL: "" },
    { id: 2, name: "Team Discussions", photoURL: "" },
    { id: 3, name: "Random Chatter", photoURL: "" },
    // Add more chat rooms
  ]);

  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const filteredChatRooms = chatRooms.filter((room) =>
    room.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box sx={{ padding: "16px", flex: 0.33 }}>
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
      <List>
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
                  <Typography variant="body2">Last message...</Typography>
                </Box>
              </Box>
              <Typography variant="body2">Time</Typography>
            </Box>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default RoomList;
