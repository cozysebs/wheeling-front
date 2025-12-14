import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendedGames } from "../service/game.service";
import { games } from "../games/gamesConfig";

export default function PlayingEntry() {
  const navigate = useNavigate();

  useEffect(() => {
    const go = async () => {
      try {
        const res = await getRecommendedGames();

        // 백엔드가 GameDTO 리스트를 반환한다고 가정: [{ slug, ... }, ...]
        const list = Array.isArray(res.data) ? res.data : res.data?.games;
        const firstSlug = Array.isArray(list)
          ? (typeof list[0] === "string" ? list[0] : list[0]?.slug)
          : null;

        const slug = firstSlug || games?.[0]?.slug;
        if (slug) navigate(`/playing/${slug}`, { replace: true });
        else navigate("/404", { replace: true });
      } catch (e) {
        console.log(e)
        // 추천 호출 실패 시(401 포함): 기본 첫 게임으로 fallback
        const fallback = games?.[0]?.slug;
        if (fallback) navigate(`/playing/${fallback}`, { replace: true });
        else navigate("/404", { replace: true });
      }
    };

    go();
  }, [navigate]);

  // 이동 전 잠깐 렌더링(빈 화면/로더는 취향대로)
  return null;
}
