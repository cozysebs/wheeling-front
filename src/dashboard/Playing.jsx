import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';
import Game2048 from '../games/Game2048';
import PlayingGames from '../components/PlayingGames';
import { useEffect, useState } from 'react';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Playing(props) {

  const [isPlaying, setIsPlaying] = useState(false);  //esc, enter로 게임 제어

  useEffect(()=>{
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        // 메뉴 열리고 오버레이 표시
        setIsPlaying(false);
      } else if (e.key === 'Enter') {
        // 메뉴/오버레이 숨기고 게임 플레이 화면
        setIsPlaying(true);
      }
    };

    const handleMessage = (event) => {
      // 보안상 origin 체크도 가능하지만,
      // 같은 도메인이라면 간단히 type만 확인해도 된다.
      if (!event.data || !event.data.type) return;

      if (event.data.type === 'GAME_ESC') {
        setIsPlaying(false);
      } else if (event.data.type === 'GAME_ENTER') {
        setIsPlaying(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('message', handleMessage);


    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        {/* 게임이 정지일 때만 메뉴가 보이게 */}
        {!isPlaying && <SideMenu />}
        
     
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          {/* 게임 + 오버레이 래퍼 */}
          <Box
            sx={{
              position: 'relative',
              minHeight: '100vh',          // 필요 시 조정
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 0 },
              }}
            >
              {/* <Header /> */}
              {/* <MainGrid /> */}
              {/* <PlayingGames/> */}
              <Game2048/>
            </Stack>
            {!isPlaying && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0, // top:0, right:0, bottom:0, left:0
                  bgcolor: 'rgba(0, 0, 0, 0.75)',   // 투명도 높은 검은 배경
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                }}
              >
                <Box sx={{ color: '#fff', textAlign: 'center' }}>
                  <p>Press Enter to start the game!</p>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}
