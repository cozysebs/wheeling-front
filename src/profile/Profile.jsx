// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
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

function ProfileHeader() {
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
              >
                프로필 편집
              </Button>
            </Stack>

            {/* 게시물 / 팔로워 / 팔로우 카운트 */}
            <Stack direction="row" spacing={3}>
              <Typography variant="body2">
                <Box component="span" sx={{ fontWeight: 600 }}>
                  게시물 0
                </Box>
              </Typography>
              <Typography variant="body2">
                <Box component="span" sx={{ fontWeight: 600 }}>
                  팔로워 0
                </Box>
              </Typography>
              <Typography variant="body2">
                <Box component="span" sx={{ fontWeight: 600 }}>
                  팔로우 0
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
  const [tabValue, setTabValue] = useState(0); // "저장됨" 탭 기본 선택

  const handleTabChange = (_event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme/>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex' }}>
        <SideMenu />
        <Container maxWidth="lg" disableGutters>
          <ProfileHeader />
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
      </Box>
    </AppTheme>
  );
}
