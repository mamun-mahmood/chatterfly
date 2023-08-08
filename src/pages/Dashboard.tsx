import { Box, Container } from "@mui/material";
import { FC, useEffect, useState } from "react";
import RoomList from "../components/chat/RoomList";
import ChatBody from "../components/chat/ChatBody";
import { db } from "../firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { setRooms } from "../redux/features/chats/roomSlice";
import { useDispatch } from "react-redux";

interface DashboardProps {
  // Define your component props here
}

const Dashboard: FC<DashboardProps> = (props) => {
  const [activeRoom, setActiveRoom] = useState({});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const fetchRooms = async () => {
    setLoading(true);
    const roomsCol = collection(db, "chatterfly_chat_rooms");
    const roomsSnapshot = await getDocs(roomsCol);
    const rooms = roomsSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setLoading(false);
    Array.isArray(rooms) && dispatch(setRooms(rooms as any));
  };
  useEffect(() => {
    fetchRooms();
  }, []);
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
