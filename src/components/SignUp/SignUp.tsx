"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Controller, useForm } from "react-hook-form";
import { useRequestSignUp } from "@/hooks/reactQuery";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { AxiosError } from "axios";

const styles = {
  box: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    m: 1,
    bgcolor: "secondary.main",
  },
  signUpBtn: {
    mt: 3,
    mb: 2,
    height: "40px",
  },
};

export default function SignUp() {
  const [open, setOpen] = React.useState(false);

  const signUpRequest = useRequestSignUp();

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: any) => {
    if (isValid) {
      signUpRequest.mutate(
        { email: data.email, username: data.username, password: data.password },
        {
          onSuccess: () => {
            // router.replace("/");
          },
          onError: () => {
            // setOpen(true);
          },
        }
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    helperText={errors.email?.message}
                    error={!!errors.email?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: true,
                  /*  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email format",
                  }, */
                }}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    autoComplete="username"
                    helperText={errors.username?.message}
                    error={!!errors.username?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText={errors.password?.message}
                    error={!!errors.password?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            disabled={signUpRequest.isPending || !isValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={styles.signUpBtn}
          >
            {signUpRequest.isPending ? (
              <CircularProgress size={24} />
            ) : (
              "Sign Up"
            )}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Snackbar open={open} autoHideDuration={4000}>
        <Alert severity="error" sx={{ width: "100%" }}>
          {signUpRequest.error
            ? (
                (signUpRequest?.error as AxiosError).response?.data as {
                  message: string;
                  statusCode: number;
                }
              ).message
            : null}
        </Alert>
      </Snackbar>
    </Container>
  );
}
