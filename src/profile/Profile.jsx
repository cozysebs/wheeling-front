// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';


import BookmarkIcon from '@mui/icons-material/Bookmark';
import SideMenu from '../dashboard/components/SideMenu';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AppTheme from '../shared-theme/AppTheme';
import useUserStore from '../store/useUserStore';
import GameList from './GameList';

import AboutMeModal from './AboutMeModal';
import EditProfileModal from './EditProfileModal';
import DeleteAccountModal from './DeleteAccountModal';

import {
  getUserProfile,
  updateMyProfile,
  deleteMyAccount,
} from "../service/user.service"

function ProfileHeader({onOpenAbout}) {
  const currentUser = useUserStore((state)=>state.user);

  useEffect(() => {
      console.log("profile header current user", currentUser)
    }, [currentUser])
  

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, pt: 6, pb: 4 }}>
      <Grid container spacing={4} alignItems="center">
        {/* 아바타 / 스토리 */}
        <Grid item xs={12} md={3}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <Avatar
              sx={{
                width: 96,
                height: 96,
                bgcolor: 'grey.300',
              }}
            />
          </Stack>
        </Grid>

        {/* 프로필 정보 */}
        <Grid item xs={12} md={9}>
          <Stack spacing={2}>
            {/* 아이디 + 버튼 영역 */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {/* {currentUser.username} */}
                {currentUser.username ?? ""}
              </Typography>

              <Button
                size="small"
                variant="outlined"
                sx={{ textTransform: 'none', fontSize: 12, px: 2 }}
                onClick={onOpenAbout}
              >
                About me
              </Button>
            </Stack>

            {/* 게시물 / 팔로워 / 팔로우 카운트 */}
            <Stack direction="row" spacing={3}>
              <Typography variant="body2">
                <Box component="span" sx={{ fontWeight: 600 }}>
                  Followers 0
                </Box>
              </Typography>
              <Typography variant="body2">
                <Box component="span" sx={{ fontWeight: 600 }}>
                  Following 0
                </Box>
              </Typography>
            </Stack>

            {/* 이름 / 사용자 태그 */}
            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {currentUser.name ?? ""}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

function ProfileTabs({ value, onChange }) {
  return (
    <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={onChange}
        centered
        sx={{
          '& .MuiTab-root': {
            minHeight: 48,
            textTransform: 'none',
            fontSize: 12,
          },
        }}
      >
        <Tab
          icon={<BookmarkIcon fontSize="small" />}
          iconPosition="start"
          label="Bookmark"
        />
        <Tab
          icon={<EqualizerIcon fontSize="small" />}
          iconPosition="start"
          label="Data"
        />
      </Tabs>
    </Box>
  );
}

export default function Profile(props) {

  const currentUser = useUserStore((s) => s.user);
  const clearCurrentUser = useUserStore((s) => s.clearCurrentUser);

  const [tabValue, setTabValue] = useState(0); // "저장됨" 탭 기본 선택

  // Nested modal states
  const [aboutOpen, setAboutOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [profileView, setProfileView] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const fetchProfileView = async () => {
    if (!currentUser?.username) return;
    setLoadingProfile(true);
    try {
      const res = await getUserProfile(currentUser.username);
      setProfileView(res.data);
    } finally {
      setLoadingProfile(false);
    }
  };

  // About me 열릴 때만 조회(불필요한 호출 방지)
  useEffect(() => {
    if (!aboutOpen) return;
    fetchProfileView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aboutOpen]);

  const handleOpenAbout = () => setAboutOpen(true);

  const handleSaveProfile = async (payload) => {
    const res = await updateMyProfile(payload);
    setProfileView(res.data); // About me에 즉시 반영
  };

  const handleDeleteAccount = async () => {
    await deleteMyAccount();
    clearCurrentUser();
    // api.jsx가 쓰는 키에 맞춰 제거 (현재 api.txt 기준: accessToken)
    localStorage.removeItem("authorization");
    // 필요 시 이동
    window.location.href = "/signinside";
  };

  const nestedActive = editOpen || deleteOpen;

  const handleTabChange = (_event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme/>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex' }}>
        <SideMenu />
        <Container maxWidth="lg" disableGutters>
          <ProfileHeader onOpenAbout={handleOpenAbout} />
          <ProfileTabs value={tabValue} onChange={handleTabChange} />
          {/* 탭 컨텐츠 */}
          {tabValue === 0 && <GameList/>}
          {tabValue === 1 && (
            <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
              <Typography variant='body2' color='text.secondary'>
                Comming Soon
              </Typography>
            </Box>
          )}
        </Container>

        {/* ===== Modals ===== */}
        <AboutMeModal
          open={aboutOpen}
          onClose={() => setAboutOpen(false)}
          loading={loadingProfile}
          profile={profileView}
          onOpenEdit={() => setEditOpen(true)}
          nestedActive={nestedActive}
        />

        <EditProfileModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          profile={profileView}
          onSave={handleSaveProfile}
          onOpenDelete={() => setDeleteOpen(true)}
        />

        <DeleteAccountModal
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDeleteAccount}
        />
      </Box>
    </AppTheme>
  );
}
