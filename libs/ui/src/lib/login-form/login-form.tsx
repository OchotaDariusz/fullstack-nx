import React, {
  FormEventHandler,
  ReducerAction,
  useReducer,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';

import { ACTION } from '@fullstack/constants';
import { fetchData } from '@fullstack/data-manager';
import { LoginRequest, User } from '@fullstack/interfaces';
import {
  handleTextChange,
  signFormReducer,
  login,
  logout,
} from '@fullstack/reducers';

const initialLoginFormState: LoginRequest = {
  email: '',
  password: '',
};

type LoginFormProps = {
  authState: User;
  login: (authState: User) => { payload: User; type: ACTION };
  logout: () => { type: ACTION };
};

export function LoginForm({ authState, login, logout }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [formState, dispatch] = useReducer(
    signFormReducer,
    initialLoginFormState
  );
  const navigate = useNavigate();

  const handleCheckbox = () => {
    setIsCheckboxSelected((prevState) => !prevState);
  };

  const textChangeHandler = () => {
    return (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleTextChange(
        dispatch as React.Dispatch<ReducerAction<FormEventHandler>>,
        e
      );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginRequest: LoginRequest = {
      username: formState.email,
      password: formState.password,
    };
    setIsLoading(true);
    toast.info('Wait...');
    fetchData
      .post('/api/auth/login', loginRequest)
      .then(async (response) => {
        if ('access_token' in response.data) {
          localStorage.setItem('access_token', response.data.access_token);
        }
        const user = await fetchData.get('/api/auth/current', {
          headers: {
            Authorization: `Bearer ${response.data.access_token}`,
          },
        });
        login(user.data);
        toast.success('Logged in.');
        setIsLoading(false);
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        toast.error('Something went wrong!');
      });
  };

  return (
    <Container component="div" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgColor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={textChangeHandler()}
            value={formState.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={isCheckboxSelected ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            onChange={textChangeHandler()}
            value={formState.password}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={false}
                onChange={handleCheckbox}
                value="remember"
                color="primary"
              />
            }
            label="Show password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register">
                <Typography variant="body2">
                  Don't have an account? Sign Up
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

const mapStateToProps = (state: User) => ({
  authState: state,
});

const mapDispatchToProps = {
  login,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
