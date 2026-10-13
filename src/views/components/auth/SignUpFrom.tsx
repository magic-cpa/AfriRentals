import * as React from 'react';
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../Copyright';


// // TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface  SignUpFormProps{
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    formData:{
        firstName: string, 
        lastName: string,
        email: string, 
        dateOfBirth: string,
        password: string,
        confirmPassword: string
    }
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>)=> void 
}

const SignUpForm: React.FC<SignUpFormProps> = function({handleSubmit,formData,onInputChange}) {
  

return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={onInputChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={onInputChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={onInputChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        name="dateOfBirth"
        label="Date of Birth"
        type="date"
        id="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={onInputChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={onInputChange}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="ConfirmPassword"
                  type="password"
                  id="ConfirmPassword"
                  value={formData.confirmPassword}
                  onChange={onInputChange}
                  autoComplete="confirm-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/authentication/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
export default SignUpForm