import { Box, Container } from "@mui/material";
import { FC, useState } from "react";
import RoomList from "../components/chat/RoomList";
import ChatBody from "../components/chat/ChatBody";

interface DashboardProps {
  // Define your component props here
}

const Dashboard: FC<DashboardProps> = (props) => {
  const [activeRoom, setActiveRoom] = useState({});
  return (
    <Container
      maxWidth={"lg"}
      sx={{
        paddingTop: "7vh",
      }}
    >
      <Box
        bgcolor={"secondary.main"}
        sx={{
          display: "flex",
          borderRadius: 5,
        }}
      >
        <RoomList activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
        <ChatBody activeRoom={activeRoom} />
      </Box>
    </Container>
  );
};

export default Dashboard;
