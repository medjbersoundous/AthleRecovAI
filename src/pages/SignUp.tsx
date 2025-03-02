import { Box } from "@mui/material";
import Register from "../components/Auth/RegisterForm";

export default function SignUp() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Register />
    </Box>
  )
}
