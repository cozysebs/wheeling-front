import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyBookmarks } from "../service/game.service";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import GameCard from "./GameCard";

export default function GameList() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: true,
    items: [],
    error: null,
  });

  useEffect(()=>{
    const fetch = async () => {
      try {
        const res = await getMyBookmarks();
        setState({
          loading: false,
          items: res.data ?? [],
          error: null,
        });
      } catch (e) {
        if (e?.response?.status === 401) {
          navigate("/signinside");
          return;
        }
        setState({
          loading: false,
          items: [],
          error: "북마크 목록을 불러오지 못했습니다.",
        });
      }
    }
    fetch();
  }, [navigate])

  if (state.loading) {
    return (
      <Box sx={{ px: {xs: 2, md: 6}, py: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress/>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
      <Stack spacing={2}>
        {state.error && (
          <Typography variant="body2" color="error">
            {state.error}
          </Typography>
        )}

        {state.items.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            아직 북마크한 게임이 없습니다.
          </Typography>
        ) : (
          state.items.map((b)=> (
            <GameCard
              key={b.bookmarkId ?? b.gameSlug}
              title={b.gameTitle ?? b.gameSlug}
              onClick={()=> navigate(`/playing/${b.gameSlug}`)}
            />
          ))
        )}
      </Stack>
    </Box>
  );
}