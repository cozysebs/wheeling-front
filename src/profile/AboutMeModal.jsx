import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Stack,
  Chip,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";

export default function AboutMeModal({
  open,
  onClose,
  loading,
  profile,          // UserProfileViewDTO
  onOpenEdit,       // Edit 모달 열기
  nestedActive,     // edit/delete가 떠 있으면 true (focus trap 완화)
}) {
  const categories = (profile?.favoriteCategories?.length
    ? profile.favoriteCategories
    : profile?.category
      ? [profile.category]
      : []
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      disableEnforceFocus={nestedActive}
      disableAutoFocus={nestedActive}
    >
      <DialogTitle>About me</DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="subtitle2" color="text.secondary">
              Username
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {profile?.username ?? "-"}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary">
              Bio
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {profile?.bio ?? "-"}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary">
              Favorite Game Categories
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mt: 1 }}>
              {categories.length ? (
                categories.map((c) => (
                  <Chip key={c} label={c} size="small" sx={{ mb: 1 }} />
                ))
              ) : (
                <Typography color="text.secondary">-</Typography>
              )}
            </Stack>

            {profile?.owner && (
              <Box sx={{ mt: 3 }}>
                <Button variant="contained" onClick={onOpenEdit}>
                  Edit
                </Button>
              </Box>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
