import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';

const mainListItems = [
  { text: 'Playing', icon: <PlayArrowIcon />, navlink: '/playing/:gameId' },
  { text: 'Message', icon: <ForwardToInboxIcon />, navlink: '/commingsoon'  },
  { text: 'Profile', icon: <AccountCircleIcon />, navlink: '/profile'  },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={NavLink}
              to={item.navlink}
              // '/' 는 다른 모든 경로의 prefix라서 end 옵션으로 “정확히 / 일 때만 활성화”
              end={item.navlink === '/'}
              sx={{
                // 기본 상태
                color: 'text.secondary',
                textDecoration: 'none',

                // NavLink 가 붙여주는 .active 클래스에 대한 스타일
                '&.active': {
                  bgcolor: '#e1e4f0',    // 배경 하이라이트
                  color: 'text.primary',         // 텍스트 진하게
                  fontWeight: 600,
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',       // 아이콘도 강조 색
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
