import { LoginOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";

interface LandingProps {
  // Define your component props here
}

const Landing: FC<LandingProps> = () => {
  const [result, setResult] = useState({
    isLoading: false,
    message: "",
    error: false,
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult({
      isLoading: true,
      message: "",
      error: false,
    });
    const data = new FormData(e.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    if (!username || !password) {
      setResult({
        isLoading: false,
        message: "Please fill all the fields",
        error: true,
      });
      return;
    }
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "secondary.main",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Box sx={{ marginTop: { xs: 10, md: "15%" } }}>
          <img src="/images/logo.png" alt="logo-chat" />
          <Typography
            color="text.primary"
            variant="h4"
            sx={{
              //   text color linear gradient
              backgroundImage:
                "linear-gradient(90deg, #6C63FF 0%, #C100D4 50%, #82ECEE 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Welcome to ChatterFly...
          </Typography>
          <Typography color="text.primary" variant="h6">
            Login to continue
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: { xs: 5, md: 5 },
          }}
        >
          <Box
            component={"form"}
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "80%", md: "50%" },
              gap: 5,
            }}
          >
            <TextField
              required
              fullWidth
              label="Username"
              name="username"
              variant="outlined"
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
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              name="password"
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
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <Button
              startIcon={
                result.isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <LoginOutlined />
                )
              }
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                "$.MuiButton-root": {
                  borderRadius: "20px",
                },
              }}
            >
              Log In
            </Button>
            <Typography
              color="text.secondary"
              variant="body1"
              textAlign={"center"}
            >
              Each time login with unique username will create a new user.
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          minHeight: "100vh",
        }}
      >
        <Box>
          <img
            src="/images/hero.svg"
            alt="landing"
            style={{
              width: "80%",
              height: "auto",
              marginLeft: "10%",
            }}
          />
          <Typography
            color="text.primary"
            variant="h6"
            sx={{
              //   text color linear gradient
              backgroundImage:
                "linear-gradient(90deg, #6C63FF 0%, #C100D4 50%, #82ECEE 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              //   fontSize: { xs: "2rem", md: "3rem" },
              textAlign: "center",
              marginTop: "5px",
            }}
          >
            ChatterFly let's you connect instantly.
          </Typography>
          <Typography color="text.primary" variant="body1" textAlign={"center"}>
            Experience realtime comunication, with no hassle.
          </Typography>
          <Typography
            color="text.secondary"
            variant="body1"
            sx={{
              textAlign: "center",
            }}
          >
            Just with username and password.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Landing;
