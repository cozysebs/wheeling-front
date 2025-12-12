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
  likeLoading,
  onToggleLike,

  bookmarked,
  bookmarkCount,
  bookmarkLoading,
  onToggleBookmark,
}) {
  // Comment는 컴포넌트 내부에서만 토글 상태 관리 (임시로 관리)
  const [commentActive, setCommentActive] = useState(false);

  return (
    <Box sx={{ width: 400, mt: 2 }}>
      <BottomNavigation
        showLabels
        value={-1}
      >
        <BottomNavigationAction
         label={`${likeCount ?? 0}`} 
         icon={
          <FavoriteIcon 
            color={liked ? "error" : "inherit"} //liked에 따라 색상 변경
          />}
          onClick={onToggleLike}
          disabled={!!likeLoading}  
        />
        <BottomNavigationAction 
          label={`${bookmarkCount ?? 0}`}
          icon={
            <BookmarkIcon 
              color={bookmarked ? "primary" : "inherit"}
            />} 
            onClick={onToggleBookmark}
            disabled={!!bookmarkLoading}
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