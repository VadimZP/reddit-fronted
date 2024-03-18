"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
// import Cookies from 'js-cookie';

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { useRequestSignIn } from "@/hooks/reactQuery";
import { setCookie } from "cookies-next";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  signInBtn: {
    mt: 3,
    mb: 2,
    height: "40px",
  },
};

export default function SignIn() {
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  const signInRequest = useRequestSignIn();

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: any) => {
    if (isValid) {
      signInRequest.mutate(
        { email: data.email, password: data.password },
        {
          onSuccess: (data) => {
            // Cookies.set('userId', `${data.id}`);
            setCookie('user', );


            router.replace("/");
          },
          onError: () => {
            setOpen(true);
          },
        }
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={styles.box}>
        <Avatar sx={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <Button
            disabled={signInRequest.isPending || !isValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={styles.signInBtn}
          >
            {signInRequest.isPending ? (
              <CircularProgress size={24} />
            ) : (
              "Sign In"
            )}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
