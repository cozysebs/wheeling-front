import { Box } from "@mui/material";
import { useState } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CommentIcon from '@mui/icons-material/Comment';

export default function PlayingBottomNavigation() {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ width: 400, mt: 2 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Bookmark" icon={<BookmarkIcon />} />
        <BottomNavigationAction label="Comment" icon={<CommentIcon />} />
      </BottomNavigation>
    </Box>
  );
}