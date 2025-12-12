import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import { useState } from 'react';
import User from '../../model/User';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { loginService } from '../../service/auth.service';
import Alert from '@mui/material/Alert';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
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

export default function SignInCard() {
  const [user, setUser] = useState(new User('','','',''));
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  console.log(submitted)

  const currentUser = useUserStore((state) => state.user);
  const navigate = useNavigate();

  // 로그인된 유저 정보가 남아있어서 profile 페이지로 가고 현재 profile 페이지가 없어서 404에러
  // currentUser?.id
  useEffect(() => {
    if(currentUser?.id) {
      navigate('/profile', { replace: true});
    }
  },[currentUser?.id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value);
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const setCurrentUser = useUserStore((state)=>state.setCurrentUser);

  const handleLogin = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if(!user.username || !user.password){
      return;
    }

    setLoading(true);

    loginService(user)
      .then((response) => {
        const userData = response.data;

        setCurrentUser(userData);
        // 서버에서 연관관계가 직렬화된 사용자 엔티티 전체를 내려줄 경우
        // Like 정보 등에서 다시 사용자 엔티티가 중첨되어 localStorage에
        // 무한히 쌓이는 것을 방지하기 위해 필요한 필드만 선별해 저장한다.
        // const sanitizedUser = {
        //   id: userData.id,
        //   username: userData.username,
        //   name: userData.name,
        //   tel: userData.tel,
        //   role: userData.role,
        //   token: userData.token,
        // };

        // setCurrentUser(sanitizedUser);

        // JWT 토큰을 localStorage에 저장 (api 인터셉터에서 사용)
        if (userData.token) {
          localStorage.setItem("authorization", userData.token)
        }
        // if(sanitizedUser.token){
        //   localStorage.setItem("authorization", sanitizedUser.token)
        // }

        navigate('/profile');
      })
      .catch((error)=>{
        console.log(error);
        setErrorMessage('Username, or password is incorrect.');
      })
      .finally(() => {
        setLoading(false);
      })
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
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
        onSubmit={handleLogin}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <FormControl>
          <TextField
            type='text'
            name='username'
            placeholder='Username'
            value={user.username}
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
        >
          Sign in
        </Button>
      </Box>   

      {/* <Link
        component="button"
        type="button"
        onClick={handleClickOpen}
        variant="body4"
        sx={{ alignSelf: 'baseline' }}
      >
        Forgot your password?
      </Link> */}
      {/* <ForgotPassword open={open} handleClose={handleClose} /> */}

      <Divider/>
        
      <Typography sx={{ textAlign: 'center' }}>
        Don&apos;t have an account?{' '}
        <span>
          <Link
            href="/signup"
            variant="body2"
            sx={{ alignSelf: 'center' }}
          >
            Sign up
          </Link>
        </span>
      </Typography>
    </Card>
  );
}
