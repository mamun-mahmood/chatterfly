import { Box, Grid, Typography } from "@mui/material";
import { FC, useState } from "react";
import Login from "../components/auth/Login";
import { useAppSelector } from "../redux/hooks";
import { selectUser } from "../redux/features/user/userSlice";
import Signup from "../components/auth/Signup";
import Dashboard from "./Dashboard";
interface LandingProps {
  // Define your component props here
}

const Landing: FC<LandingProps> = () => {
  const [showSignup, setShowSignup] = useState(false);
  const user = useAppSelector(selectUser);

  return (
    <>
      {user?.accessToken ? (
        <Dashboard />
      ) : (
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
            </Box>
            {showSignup ? (
              <Signup setShowSignup={setShowSignup} />
            ) : (
              <Login setShowSignup={setShowSignup} />
            )}
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
              <Typography
                color="text.primary"
                variant="body1"
                textAlign={"center"}
              >
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
      )}
    </>
  );
};

export default Landing;
