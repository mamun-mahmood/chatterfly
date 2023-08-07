import { SendOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";

interface ChatBodyProps {
  // Define your component props here
  activeRoom: any;
}

const ChatBody: FC<ChatBodyProps> = ({ activeRoom }) => {
  const messages = [
    {
      id: 1,
      message: "Hello",
      sender: "user",
      timestamp: "12:00",
    },
  ];
  const [input, setInput] = useState("");
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
          {messages.map((message) => (
            <Box
              sx={{
                backgroundColor: "secondary.main",
                padding: 2,
                borderRadius: 3,
                color: "text.primary",
                width: "fit-content",
              }}
            >
              <Typography>{message.message}</Typography>
              <Typography variant="caption" ml={2}>
                {message.timestamp}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* chat input */}
        <Box>
          <Box
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
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
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
