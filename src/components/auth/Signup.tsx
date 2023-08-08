import { LoginOutlined } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { signUp } from "../../firebase/firebase.config";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/user/userSlice";

interface LoginProps {
  // Define your component props here
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup: FC<LoginProps> = ({ setShowSignup }) => {
  const [result, setResult] = useState({
    isLoading: false,
    message: "",
    open: false,
    type: "success",
  });
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult({
      ...result,
      isLoading: true,
    });
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (!email || !password) {
      setResult({
        ...result,
        isLoading: false,
      });
      return;
    }
    signUp(email.toString(), password.toString())
      .then(() => {
        setResult({
          ...result,
          isLoading: false,
          message: "Log in successfully",
          open: true,
          type: "success",
        });
        dispatch(
          setUser({
            email: res.user?.email,
            uid: res.user?.uid,
            displayName: res.user?.displayName,
            photoURL: res.user?.photoURL,
            accessToken: res.user?.accessToken,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        setResult({
          ...result,
          isLoading: false,
          message: err.message,
          open: true,
          type: "error",
        });
      });
  };
  const { isLoading, message, open, type } = result;

  return (
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
          gap: 2,
        }}
      >
        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          variant="outlined"
          sx={{
            "& label.Mui-focused": {
              color: "white",
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
        <Button
          disabled={isLoading}
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
          Sign Up
        </Button>
        <Button
          size="small"
          sx={{ alignSelf: "flex-end", color: "text.primary" }}
          variant="outlined"
          color="primary"
          onClick={() => setShowSignup((e) => !e)}
        >
          Login
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setResult({ ...result, open: false })}
        >
          <Alert
            onClose={() => setResult({ ...result, open: false })}
            severity={type.toString() as any}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Signup;
