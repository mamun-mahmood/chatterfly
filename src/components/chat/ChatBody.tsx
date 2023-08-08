import { SendOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/user/userSlice";
import {
  arrayUnion,
  doc,
  updateDoc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { addMessage, selectRooms } from "../../redux/features/chats/roomSlice";
interface ChatBodyProps {
  // Define your component props here
  activeRoom: any;
}

const ChatBody: FC<ChatBodyProps> = ({ activeRoom }) => {
  const [input, setInput] = useState("");
  const room = useAppSelector(selectRooms).find(
    (room) => room.id === activeRoom.id
  );
  const messages = room?.messages;
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (activeRoom.id) {
      const docRef = doc(db, "chatterfly_chat_rooms", activeRoom.id);

      const unsubscribe = onSnapshot(docRef, (doc) => {
        const data = doc.data();
        const lastMessage = data?.messages[data?.messages.length - 1];
        const newMessage = {
          id: activeRoom.id,
          message: lastMessage,
        };
        if (data) {
          dispatch(addMessage(newMessage));
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!input) return;
    const newMessage = {
      id: uuidv4(),
      message: input,
      sender: user.displayName || user.email,
      timestamp: new Date().toLocaleString(),
    };
    const docRef = doc(db, "chatterfly_chat_rooms", activeRoom.id);
    await updateDoc(docRef, {
      //   push new message to messages array
      messages: arrayUnion(newMessage),
    });
    setInput("");
  };
  return (
    <Box sx={{ flex: 0.67 }}>
      {/* header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          justifyContent: "space-between",
        }}
      >
        <Avatar src={activeRoom?.photoURL} alt="avatar">
          {activeRoom?.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography color={"text.primary"}>{activeRoom?.name}</Typography>
      </Box>
      {/* chat body */}
      <Box
        bgcolor={"primary.main"}
        sx={{ height: "80vh", display: "flex", flexDirection: "column" }}
      >
        {/* chat messages */}
        <Box
          sx={{
            padding: 2,
            flexGrow: 1,
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "0.4em",
              backgroundColor: "secondary.main",
            },
          }}
        >
          {Array.isArray(messages) &&
            messages.map((message: any) => (
              <Box
                key={message.id}
                sx={{
                  backgroundColor: "secondary.main",
                  padding: 1,
                  borderRadius: 3,
                  color: "text.primary",
                  width: "fit-content",
                  marginY: 1,
                }}
              >
                <Typography>{message.message}</Typography>
                <Typography variant="caption" ml={2}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Typography>
              </Box>
            ))}
        </Box>
        {/* chat input */}
        <Box>
          <Box
            component={"form"}
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "secondary.main",
              padding: 2,
              position: "relative",
            }}
          >
            <TextField
              value={input}
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              autoComplete="off"
              sx={{
                backgroundColor: "primary.main",
                width: "100%",
                color: "text.primary",
                borderRadius: 5,
                border: "none",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                  "& label.Mui-focused": {
                    color: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "none",
                    outline: "none",
                  },
                  "&:hover": {
                    outline: "none",
                    borderColor: "none",
                  },
                },
              }}
            />
            <Button
              disabled={!input}
              type="submit"
              sx={{
                // backgroundColor: "secondary.light",
                border: "none",
                outline: "none",
                cursor: "pointer",
                position: "absolute",
                right: 20,
                color: "text.primary",
                borderLeft: "1px solid #fff",
              }}
            >
              <SendOutlined
                sx={{
                  fontSize: "2rem",
                }}
              />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBody;
