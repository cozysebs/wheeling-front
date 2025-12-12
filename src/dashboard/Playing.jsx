import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { games } from '../games/gamesConfig';
import { Button, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PlayingBottomNavigation from './components/PlayingBottomNavigation';
import { syncGamesService } from '../service/game.service';
import { getGameLikeInfo, toggleGameLike } from '../service/game.service';
import { getGameBookmarkInfo, toggleGameBookmark } from '../service/game.service';


export default function Playing(props) {

  const { gameSlug } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);  //esc, enter로 게임 제어
  const gameFrameRef = useRef(null);    // iframe DOM을 잡아둘 ref

  // URL 기준 현재 인덱스 계산  ===> 명확하게 이해가 가진 않음
  const currentIndex = games.findIndex((g)=> g.slug === gameSlug);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const CurrentGameComponent = games[safeIndex].component;

  // 좋아요 상태
  const [likeState, setLikeState] = useState({
    liked: false,
    likeCount: 0,
    loading: false,
  });

  // 북마크 상태
  const [bookmarkState, setBookmarkState] = useState({
    bookmarked: false,
    bookmarkCount: 0,
    loading: false,
  });

  // 게임 메타 정보를 백엔드와 동기화
  useEffect(()=> {
    const syncGames = async () => {
      try {
        await syncGamesService(games);  // gamesConfig 전체 전송
        console.log("게임 동기화 완료");
      } catch(e) {
        console.error("게임 동기화 실패", e);
      }
    };
    syncGames();
  }, []); // 최초 마운트 시 1회 호출

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
          const nextSlug = games[nextIndex].slug;
          if(nextIndex !== safeIndex) {
            navigate(`/playing/${nextSlug}`);
          }
        }else if(e.key === 'ArrowUp') {
          const prevIndex = Math.max(safeIndex-1, 0);
          const prevSlug = games[prevIndex].slug;
          if(prevIndex !== safeIndex) {
            navigate(`/playing/${prevSlug}`);
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
  }, [isPlaying, safeIndex, navigate]);   // isPlaying, safeIndex, navigate 상태값이 변경될 때마다 useEffect의 콜백함수가 실행된다. 

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

  // gameSlug 기준 좋아요 정보 로딩
  useEffect(() => {
    const fetchLikeInfo = async () => {
      if (!gameSlug) return;
      try {
        const res = await getGameLikeInfo(gameSlug);
        const data = res.data;
        setLikeState((prev) => ({
          ...prev,
          liked: data.liked,
          likeCount: data.likeCount,
        }));
        console.log("좋아요 정보 불러오기 성공")
      } catch(e) {
        console.error("좋아요 정보 불러오기 실패", e);
        // 실패 시에는 기본값(0, false) 유지
        setLikeState((prev) => ({
          ...prev,
          liked: false,
          likeCount: 0,
        }));
      }
    };
    fetchLikeInfo();
  }, [gameSlug]);

  const handleToggleLike = async () => {
    if (!gameSlug) return;

    try {
      setLikeState((prev) => ({
        ...prev,
        loading: true,
      }));

      const res = await toggleGameLike(gameSlug);
      const data = res.data;

      setLikeState({
        liked: data.liked,
        likeCount: data.likeCount,
        loading: false,
      });
    } catch (e) {
      console.error("좋아요 토글 실패", e);
      // 실패 시 로딩만 false로 되돌림
      setLikeState((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    const fetchBookmarkInfo = async () => {
      if (!gameSlug) return;
      try {
        const res = await getGameBookmarkInfo(gameSlug);
        const data = res.data;
        setBookmarkState((prev) => ({
          ...prev,
          bookmarked: data.bookmarked,
          bookmarkCount: data.bookmarkCount,
        }));
      } catch (e) {
        console.error("북마크 정보 불러오기 실패", e)
        setBookmarkState((prev) => ({
          ...prev,
          bookmarked: false,
          bookmarkCount: 0,
        }));
      }
    };
    fetchBookmarkInfo();
  }, [gameSlug]);

  const handleToggleBookmark = async () => {
    if (!gameSlug) return;

    try {
      setBookmarkState((prev) => ({...prev, loading: true}));

      const res = await toggleGameBookmark(gameSlug);
      const data = res.data;

      setBookmarkState({
        bookmarked: data.bookmarked,
        bookmarkCount: data.bookmarkCount,
        loading: false,
      });
    } catch(e) {
      console.error("북마크 토글 실패", e);

      if (e?.response?.status === 401) {
        navigate("/signinside");
      }

      setBookmarkState((prev) => ({...prev, loading: false}));
    }
  };

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
                          key={game.slug}
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
                  <Button
                    variant='contained'
                    onClick={()=>setIsPlaying(true)}  // 버튼 클릭으로 바로 시작
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 2,
                      px: 6,
                      py: 5.5,
                      borderRadius: 3,
                      backgroundImage: 'none',
                      background: '#f5f6fa',
                      color: 'text.primary',
                      textTransform: 'none',             // 대문자 변환 X
                      boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
                      '&:hover': {
                        backgroundImage: 'none',
                        background: '#e1e4f0',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
                      },
                    }}
                  >
                    <Box sx={{ textAlign: 'center'}}>
                      {/* 1문단: 메인 메시지 */}
                      <Typography variant="h2" fontWeight={700}>
                        Click or Press Enter!
                      </Typography>

                      {/* 2문단: 보조 설명 + ↑ / ↓ 아이콘  */}
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{mt: 0.5, display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center'}}
                      >
                        <ArrowUpwardIcon sx={{ fontSize: 18 }}/>
                        /
                        <ArrowDownwardIcon sx={{ fontSize: 18 }}/>
                        <span>Use the arrow keys to choose your game.</span>
                      </Typography>
                    </Box>
                  </Button>

                  {/* Bottom Navigation(좋아요, 북마크, 댓글, 공유) */}
                  <PlayingBottomNavigation
                    liked={likeState.liked}
                    likeCount={likeState.likeCount}
                    loading={likeState.loading}
                    onToggleLike={handleToggleLike}

                    bookmarked={bookmarkState.bookmarked}
                    bookmarkCount={bookmarkState.bookmarkCount}
                    bookmarkLoading={bookmarkState.loading}
                    onToggleBookmark={handleToggleBookmark}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}
