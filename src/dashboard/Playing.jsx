import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { games } from '../games/gamesConfig';

export default function Playing(props) {

  const { gameId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);  //esc, enter로 게임 제어
  const gameFrameRef = useRef(null);    // iframe DOM을 잡아둘 ref

  // URL 기준 현재 인덱스 계산  ===> 명확하게 이해가 가진 않음
  const currentIndex = games.findIndex((g)=> g.id === gameId);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const CurrentGameComponent = games[safeIndex].component;

  useEffect(()=>{
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        // 메뉴 열리고 오버레이 표시
        setIsPlaying(false);
      } else if (e.key === 'Enter') {
        // 메뉴/오버레이 숨기고 게임 플레이 화면
        setIsPlaying(true);
      }

      // 방향키(위아래)는 isPlaying === false 일 때만 동작
      if (!isPlaying) {
        if(e.key === 'ArrowDown') {
          const nextIndex = Math.min(safeIndex + 1, games.length - 1);
          const nextId = games[nextIndex].id;
          if(nextIndex !== safeIndex) {
            navigate(`/playing/${nextId}`);
          }
        }else if(e.key === 'ArrowUp') {
          const prevIndex = Math.max(safeIndex-1, 0);
          const prevId = games[prevIndex].id;
          if(prevIndex !== safeIndex) {
            navigate(`/playing/${prevId}`);
          }
        }
      }
    };

    const handleMessage = (event) => {
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
  }, [isPlaying, safeIndex, navigate]);

  // isPlaying이 true로 바뀔 때 게임 iframe에 포커스
  useEffect(()=>{
    if (isPlaying && gameFrameRef.current) {
      // iframe 자체에 포커스
      gameFrameRef.current.focus();

      // 대부분의 브라우저에서 contentWindow 에도 포커스를 주면 더 안정적
      if (gameFrameRef.current.contentWindow) {
        gameFrameRef.current.contentWindow.focus();
      }
    }
  }, [isPlaying]);

  return (
    <AppTheme {...props}>
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
            <Box
              sx={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* 미리보기 / 선택 모드 UI */}
              {!isPlaying && (
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      transition: 'transform 0.4s ease-out',
                      transform: `translateY(-${safeIndex * 100}vh)`,   // safeIndex * 100vh 만큼 위로 올려서 n번째 게임을 화면 중앙에 위치
                    }}
                  >
                    {games.map((game) => {
                      const GameComp = game.component;
                      return (
                        <Box
                          key={game.id}
                          sx={{
                            height: '100vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <GameComp frameRef={gameFrameRef}/>   
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              )}

              {/* 실제 플레이 모드 UI */}
              {isPlaying && (
                <Box
                  sx={{
                    width: '100%',       // MAIN 영역 전체 사용
                    height: '100vh',     // 브라우저 높이 기준
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'stretch',
                    overflow: 'auto',    // 필요할 경우 세로 스크롤 허용
                  }}
                >
                  <CurrentGameComponent frameRef={gameFrameRef}/>
                </Box>
              )}
              {/* 오버레이: isPlaying === false일 때만 표시 */}
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
                    <p>↑ / ↓ Use the arrow keys to choose your game.</p>
                  </Box>
                </Box>
              )}

            </Box>
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}
