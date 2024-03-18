"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Groups } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import { useRequestCreateCommunity } from "@/hooks/reactQuery";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const createCommunitySchema = z.object({
  title: z.string().min(4).max(30),
});

type CreateCommunitySchemaType = z.infer<typeof createCommunitySchema>;

export default function AccountMenu() {
  const router = useRouter();

  const createCommunityRequest = useRequestCreateCommunity();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openModal, setOpenModal] = useState(false);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<CreateCommunitySchemaType>({
    resolver: zodResolver(createCommunitySchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (data: CreateCommunitySchemaType) => {
    
    const userData = localStorage.getItem("userData");
    if (userData === null) return;

    const parsedUserData = JSON.parse(userData);

    if (isValid) {
      createCommunityRequest.mutate(
        { title: data.title, creatorId: parsedUserData.id },
        {
          onSuccess: () => {
            toast.success("Community successfully created!");
            setOpenModal(false);
          },
        }
      );
    }
  };

  const navigateToProfile = () => {
    const userData = localStorage.getItem("userData");
    if (userData === null) return;

    const parsedUserData = JSON.parse(userData);
    router.push(`/users/${parsedUserData.username}`);
  }

  return (
    <>
      <IconButton
        onClick={(event) => setAnchorEl(event.currentTarget)}
        size="small"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={navigateToProfile}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setOpenModal(true)}>
          <ListItemIcon>
            <Groups />
          </ListItemIcon>
          Create a Community
        </MenuItem>
        <MenuItem onClick={() => setOpenModal(true)}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => setOpenModal(true)}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Modal
        open={openModal}
        onClose={() => setAnchorEl(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Type your community title
          </Typography>

          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                id="title"
                label="Community title"
                autoComplete="title"
                autoFocus
                helperText={errors.title?.message}
                error={!!errors.title?.message}
                {...field}
              />
            )}
          />

          <Button
            disabled={createCommunityRequest.isPending}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            {createCommunityRequest.isPending ? (
              <CircularProgress size={24} />
            ) : (
              "Submit"
            )}
          </Button>
          <Button variant="outlined" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
