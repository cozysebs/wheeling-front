import { Box } from "@mui/material";
import { useState } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CommentIcon from '@mui/icons-material/Comment';

export default function PlayingBottomNavigation({
  liked,
  likeCount,
  loading,
  onToggleLike,
}) {
  // const [value, setValue] = useState(0);
  // Bookmark / Comment는 컴포넌트 내부에서만 토글 상태 관리 (임시로 관리)
  const [bookmarkActive, setBookmarkActive] = useState(false);
  const [commentActive, setCommentActive] = useState(false);

  return (
    <Box sx={{ width: 400, mt: 2 }}>
      <BottomNavigation
        showLabels
        value={-1}
      >
        <BottomNavigationAction
         label={`${likeCount}`} 
         icon={
          <FavoriteIcon 
            color={liked ? "error" : "inherit"} //liked에 따라 색상 변경
          />}
          onClick={onToggleLike}
          disabled={loading}  
        />
        <BottomNavigationAction 
          label="Bookmark" 
          icon={
            <BookmarkIcon 
              color={bookmarkActive ? "primary" : "inherit"}
            />} 
            onClick={() => setBookmarkActive((prev) => !prev)}
        />
        <BottomNavigationAction
          label="Comment" 
          icon={
            <CommentIcon
              color={commentActive ? "info" : "inherit"} 
            />} 
            onClick={() => setCommentActive((prev) => !prev)}
        />
      </BottomNavigation>
    </Box>
  );
}