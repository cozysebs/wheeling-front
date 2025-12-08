import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import User from '../model/User';
import useUserStore from '../store/useUserStore';
import { useEffect } from 'react';
import { registerService } from '../service/auth.service';
import Alert from '@mui/material/Alert';

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

export default function SignUp(props) {
  const navigate = useNavigate();

  const [user, setUser] = useState(new User('','','',''));
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const currentUser = useUserStore((state)=>state.user);


  // 에러 지우기용
  console.log(submitted);
  console.log("current User: ", currentUser);

  // 로그인된 유저 정보가 남아있어서 profile 페이지로 가고 현재 profile 페이지가 없어서 404에러
  useEffect(()=>{
    if(currentUser?.id){
      navigate('/profile');
    }
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  const handleRegister = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if(!user.username || !user.password || !user.name || !user.tel){
      return;
    }
    setLoading(true);
    registerService(user)
    .then(()=>{
      navigate('/signinside');
    })
    .catch((error) => {
      console.log(error);
      if(error?.response?.status === 409) {
        setErrorMessage("That username is already taken.");
      }else{
        setErrorMessage("An unexpected error has occurred.");
      }
      setLoading(false);
    })
  }

  // const validateInputs = () => {
  //   const email = document.getElementById('email');
  //   const password = document.getElementById('password');
  //   const name = document.getElementById('name');

  //   let isValid = true;

  //   if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
  //     setEmailError(true);
  //     setEmailErrorMessage('Please enter a valid email address.');
  //     isValid = false;
  //   } else {
  //     setEmailError(false);
  //     setEmailErrorMessage('');
  //   }

  //   if (!password.value || password.value.length < 6) {
  //     setPasswordError(true);
  //     setPasswordErrorMessage('Password must be at least 6 characters long.');
  //     isValid = false;
  //   } else {
  //     setPasswordError(false);
  //     setPasswordErrorMessage('');
  //   }

  //   if (!name.value || name.value.length < 1) {
  //     setNameError(true);
  //     setNameErrorMessage('Name is required.');
  //     isValid = false;
  //   } else {
  //     setNameError(false);
  //     setNameErrorMessage('');
  //   }

  //   return isValid;
  // };

  // const handleSubmit = (event) => {
  //   if (nameError || emailError || passwordError) {
  //     event.preventDefault();
  //     return;
  //   }
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     name: data.get('name'),
  //     lastName: data.get('lastName'),
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2.5rem, 10vw, 2.15rem)', textAlign: 'center' }}
          >
            Wheeling
          </Typography>

          <Divider/>

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <Box
            component="form"
            onSubmit={handleRegister}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <TextField
                type='text'
                name='tel'
                placeholder='Phone Number'
                value={user.tel}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <TextField
                type='password'
                name='password'
                placeholder='Password'
                value={user.password}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <TextField
                type='text'
                name='name'
                placeholder='Name'
                value={user.name}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <TextField
                type='text'
                name='username'
                placeholder='User Name'
                value={user.username}
                onChange={handleChange}
                required
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              Sign up
            </Button>
          </Box>

          <Divider/>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                href="/signinside"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
