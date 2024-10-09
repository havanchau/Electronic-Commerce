"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppProvider } from "@toolpad/core";
import Typography from "@mui/material/Typography";
import authService from "@/services/auth/auth.service";
import { useRouter } from "next/navigation";
import { showToast } from "../components/ToastContainer/ToastContainer";
import { useLanguage } from "@/context/Lang/LangContext";

export default function SignInPage() {
  const theme = useTheme();
  const router = useRouter();
  const lang = useLanguage();
  
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authService.login(formData.email, formData.password);
      showToast(lang.language.loginSuccess, "success");
  
      localStorage.setItem("user", JSON.stringify(res));
      router.push("/");
    }
    catch (error) {
      console.error(error);
      showToast(lang.language.loginFail, "error");
    }
  };

  return (
    <AppProvider theme={theme}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        mt={2}
        width="100%"
        maxWidth="440px"
        minHeight="600px"
        mx="auto"
        my="60px"
        padding={2}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {lang.language.login}
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          name="email"
          label="Email"
          variant="outlined"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          style={{ marginTop: 40, height: 60 }}
        >
          {lang.language.login}
        </Button>
        <Grid container mt={2}>
          <Grid item xs>
            <Link href="#" variant="body2">
              {lang.language.forgetPassword}
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signup" variant="body2">
              {lang.language.alreadyHaveAccount}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AppProvider>
  );
}
