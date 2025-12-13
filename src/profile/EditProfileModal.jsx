import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const GENDERS = ["MALE", "FEMALE", "OTHER"];
const CATEGORIES = [
  "PUZZLE", "ACTION", "SPORTS", "RACING", "CARD", "CASUAL",
  "ESCAPE", "SHOOTING", "HORROR", "DEFENSE",
];

const pad2 = (n) => String(n).padStart(2, "0");

const parseBirthDateYMD = (birthDate) => {
  if (!birthDate) return { y: "", m: "", d: "" };
  const ymd = String(birthDate).substring(0, 10); // YYYY-MM-DD
  const [y, m, d] = ymd.split("-");
  return { y: y || "", m: m || "", d: d || "" };
};

const toLocalDateTimeString = ({ y, m, d }) => {
  if (!y || !m || !d) return null;
  return `${y}-${pad2(m)}-${pad2(d)}T00:00:00`;
};

export default function EditProfileModal({
  open,
  onClose,
  profile,              // UserProfileViewDTO (초기값)
  onSave,               // (payload) => Promise
  onOpenDelete,         // DeleteAccount 모달 열기
}) {
  const [birthYMD, setBirthYMD] = useState({ y: "", m: "", d: "" });
  const [gender, setGender] = useState("");
  const [favoriteCategories, setFavoriteCategories] = useState([]);
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);

  const years = useMemo(() => {
    const now = new Date().getFullYear();
    const arr = [];
    for (let y = now; y >= 1950; y--) arr.push(String(y));
    return arr;
  }, []);

  // 모달 열릴 때 profile 기반으로 폼 초기화
  useEffect(() => {
    if (!open) return;
    setBirthYMD(parseBirthDateYMD(profile?.birthDate));
    setGender(profile?.gender || "");
    setFavoriteCategories(profile?.favoriteCategories || []);
    setBio(profile?.bio || "");
  }, [open, profile]);

  const toggleCategory = (cat) => {
    setFavoriteCategories((prev) => {
      if (prev.includes(cat)) return prev.filter((c) => c !== cat);
      return [...prev, cat];
    });
  };

  const moveCategory = (fromIdx, toIdx) => {
    setFavoriteCategories((prev) => {
      if (toIdx < 0 || toIdx >= prev.length) return prev;
      const next = [...prev];
      const [picked] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, picked);
      return next;
    });
  };

  const handleComplete = async () => {
    setSaving(true);
    try {
      const payload = {
        birthDate: toLocalDateTimeString(birthYMD),           // null 가능
        gender: gender || null,
        favoriteCategories,                                  // 빈 배열이면 서버에서 “비우기”
        bio,                                                  // 빈 문자열 허용
      };
      await onSave(payload);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Edit
        <Button
          variant="text"
          size="small"
          onClick={onOpenDelete}
          sx={{ color: "text.disabled" }}
        >
          Delete Account
        </Button>
      </DialogTitle>

      <DialogContent dividers>
        {/* BirthDate */}
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Birth Date
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
              label="Year"
              value={birthYMD.y}
              onChange={(e) => setBirthYMD((p) => ({ ...p, y: e.target.value }))}
            >
              {years.map((y) => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Month</InputLabel>
            <Select
              label="Month"
              value={birthYMD.m}
              onChange={(e) => setBirthYMD((p) => ({ ...p, m: e.target.value }))}
            >
              {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((m) => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Day</InputLabel>
            <Select
              label="Day"
              value={birthYMD.d}
              onChange={(e) => setBirthYMD((p) => ({ ...p, d: e.target.value }))}
            >
              {Array.from({ length: 31 }, (_, i) => String(i + 1)).map((d) => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {/* Gender */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Gender</InputLabel>
          <Select
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {GENDERS.map((g) => (
              <MenuItem key={g} value={g}>{g}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Categories */}
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Favorite Categories (check & rank)
        </Typography>
        <FormGroup sx={{ mb: 2 }}>
          {CATEGORIES.map((cat) => (
            <FormControlLabel
              key={cat}
              control={
                <Checkbox
                  checked={favoriteCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
              }
              label={cat}
            />
          ))}
        </FormGroup>

        {favoriteCategories.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Ranking (top = most favorite)
            </Typography>

            {favoriteCategories.map((cat, idx) => (
              <Box
                key={cat}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                  mb: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                }}
              >
                <Typography>
                  {idx + 1}. {cat}
                </Typography>
                <Box>
                  <IconButton size="small" onClick={() => moveCategory(idx, idx - 1)} disabled={idx === 0}>
                    <ArrowUpward fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => moveCategory(idx, idx + 1)} disabled={idx === favoriteCategories.length - 1}>
                    <ArrowDownward fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </>
        )}

        {/* Bio */}
        <TextField
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          fullWidth
          multiline
          minRows={3}
          sx={{ mt: 2 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Cancel</Button>
        <Button variant="contained" onClick={handleComplete} disabled={saving}>
          {saving ? "Saving..." : "Complete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
