import React, {
  FormEventHandler,
  ReducerAction,
  useReducer,
  useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { toast } from 'react-toastify';

import { fetchData } from '@fullstack/data-manager';
import { handleTextChange, signFormReducer } from '@fullstack/reducers';
import { RegisterRequest } from '@fullstack/interfaces';

const initialRegisterFormState: RegisterRequest = {
  email: '',
  password: '',
  passwordConfirm: '',
};

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [formState, dispatch] = useReducer(
    signFormReducer,
    initialRegisterFormState
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
    if (formState.password !== (formState as RegisterRequest).passwordConfirm)
      return;
    const registerRequest: Partial<RegisterRequest> = {
      username: formState.email,
      password: formState.password,
    };
    setIsLoading(true);
    const toastId = toast.loading('Wait...');
    fetchData
      .post('/api/auth/register', registerRequest)
      .then(() => {
        toast.update(toastId, {
          render: 'Account created.',
          type: 'success',
          isLoading: false,
          closeOnClick: true,
          autoClose: 3000,
          closeButton: true,
        });
        navigate('/login');
      })
      .catch((err) => {
        toast.update(toastId, {
          render: 'Something went wrong!',
          type: 'error',
          isLoading: false,
          closeOnClick: true,
          autoClose: 3000,
          closeButton: true,
        });
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            autoComplete="new-password"
            onChange={textChangeHandler()}
            value={formState.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordConfirm"
            label="Password Confirmation"
            type={isCheckboxSelected ? 'text' : 'password'}
            id="passwordConfirm"
            onChange={textChangeHandler()}
            value={(formState as RegisterRequest).passwordConfirm}
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
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login">
                <Typography variant="body2">
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterForm;
