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
import authService from "@/services/auth.service";

export default function RegisterPage() {
  const theme = useTheme();
  
  const [formData, setFormData] = React.useState({
    email: "",
    name: "",
    password: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
        if (!/^\d*$/.test(value) || value.length > 10) return;
      }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await authService.register(formData.email, formData.name, formData.password, formData.phone);
    console.log(res);

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
          Sign up
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
          name="name"
          label="Name"
          variant="outlined"
          value={formData.name}
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
        <TextField
          fullWidth
          margin="normal"
          name="phone"
          label="Phone"
          type="text"
          variant="outlined"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 40, height: 60 }}>
          Register
        </Button>
        <Grid container mt={2}>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signin" variant="body2">
              {"Have an account already? Log In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AppProvider>
  );
}
