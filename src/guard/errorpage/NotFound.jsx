import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function NotFound(props) {

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h1"
            sx={{
              width: '100%',
              textAlign: 'center',
              fontWeight: 700,
              letterSpacing: '0.2em',
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
              mb: 1,
            }}
          >
            404
          </Typography>

          <Divider/>
          
          <Typography
            component="h2"
            variant="h5"
            sx={{
              width: '100%',
              textAlign: 'center',
              fontWeight: 600,
              fontSize: { xs: '1.1rem', sm: '1.7rem' },
              mb: 0.5,
            }}
          >
            We couldn&apos;t find that page.
          </Typography>

          <Typography
            component="p"
            variant="body2"
            sx={{
              width: '100%',
              textAlign: 'center',
              color: 'text.secondary',
              fontSize: { xs: '1.1rem', sm: '1.1rem' },
            }}
          >
            The page you&apos;re looking for may have moved
          </Typography>

          <Typography
            component="p"
            variant="body2"
            sx={{
              width: '100%',
              textAlign: 'center',
              color: 'text.secondary',
              mb: 3,
            }}
          >
            or no longer exists. Please check the URL and try again.
          </Typography>

          <Divider/>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Go back to{' '}
              <Link href="/playing/2048" variant="body2">
                play game
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
