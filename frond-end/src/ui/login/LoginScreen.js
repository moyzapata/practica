import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { validationLogin } from "../../components/forms/validation";
import { Alert, Snackbar } from "@mui/material";

const URI = 'http://localhost:8000/users/'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.facebook.com/Moiseszapata99/">
                Chamoycito
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

function LoginScreen() {
    const [state, setState] = React.useState({
        open: false,
        message: '',
    });
    const { open, message } = state;
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        validationLogin(data).then(async (res) => {
            if (res[0]) {
                await axios.get(`${URI}${data.get('email')}/${data.get('password')}`).then((res) => {
                    switch (res.data.code) {
                        case 400:
                            setState({ open: true, message: res.data.error })
                            break;
                        case 200:
                            setState({ open: true, message: res.data.success })
                            navigate('/posts')
                            break;
                        case 204:
                            setState({ open: true, message: res.data.error })
                            break;
                        case 206:
                            setState({ open: true, message: res.data.error })
                            break;
                        default:
                            break;
                    }
                })
            } else {
                switch (res[1]) {
                    case "correo":
                        setState({ open: true, message: 'Correo no valido' })
                        break;
                    case "password":
                        setState({ open: true, message: 'Ingrese su contrseña por favor' })
                        break;
                    default: setState({ open: true, message: 'Error' })
                        break;
                }
            }
        })
    }

    const handleClose = () => {
        setState({ ...state, open: false });
    };

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
                        Iniciar sesión
                    </Typography>
                    <Box component="form" autoComplete="off" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo"
                            name="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Recordarme"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Iniciar sesión
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    ¿Olvidó su contraseña?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"¿No tienes cuenta? Registrate"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }} open={open} autoHideDuration={2000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity='error'
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default LoginScreen;