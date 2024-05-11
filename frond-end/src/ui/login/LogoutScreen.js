import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, FormControl, MenuItem, Snackbar } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { validation } from '../../components/forms/validation';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

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

const currencies = [
    {
        value: 'otro',
        label: 'Otro',
    },
    {
        value: 'hombre',
        label: 'Hombre',
    },
    {
        value: 'mujer',
        label: 'Mujer',
    }
];

const URI = 'http://localhost:8000/users/'

const defaultTheme = createTheme();

export default function LogoutScreen() {
    const [state, setState] = React.useState({
        open: false,
        message: '',
        type: 'success',
        errorNombre: false,
        errorApellido: false,
        errorFecha: false,
        errorSexo: false,
        errorCorreo: false,
        errorPass: false,
        errorPassC: false,
    });
    const { open, message, type, errorNombre, errorApellido, errorFecha, errorSexo, errorCorreo, errorPass, errorPassC } = state;

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        validation(data).then(async (validate) => {
            if (validate[0]) {
                await axios.post(URI, {
                    nombre: data.get('firstName'),
                    apellidos: data.get('lastName'),
                    fecha_nacimiento: data.get('date'),
                    sexo: data.get('sexo'),
                    correo: data.get('email'),
                    password: data.get('passwordC')
                }).then((res) => {
                    if (res.data.message.length > 0) {
                        setState({ open: true, message: res.data.message })
                    } else {
                        setState({ open: true, message: 'Error a registrase', type: 'error' })
                    }
                })
                navigate('/')
            } else {
                switch (validate[1]) {
                    case "Nombre":
                        setState({ open: true, message: 'Por favor llenar campo ' + validate[1], type: 'error', errorNombre: true })
                        break;
                    case "Apellidos":
                        setState({ open: true, message: 'Por favor llenar campo ' + validate[1], type: 'error', errorApellido: true })
                        break;
                    case "Fecha de nacimiento":
                        setState({ open: true, message: 'Por favor llenar campo ' + validate[1], type: 'error', errorFecha: true })
                        break;
                    case "Sexo":
                        setState({ open: true, message: 'Por favor seleccione ', type: 'error', errorSexo: true })
                        break;
                    case "Correo":
                        setState({ open: true, message: validate[1] + ' no valido', type: 'error', errorCorreo: true })
                        break;
                    case "Password":
                        setState({ open: true, message: 'La contraseña debe tener al menos 6 caracteres', type: 'error', errorPass: true })
                        break;
                    case "PasswordC":
                        setState({ open: true, message: 'La contraseña no coincide', type: 'error', errorPassC: true })
                        break;
                    default: setState({ open: true, message: 'Error a registrase', type: 'error' })
                        break;
                }
            }
        })
    };

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
                        Registrarse
                    </Typography>
                    <Box component="form" autoComplete='off' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Nombre"
                                    autoFocus
                                    error={errorNombre}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Apellidos"
                                    name="lastName"
                                    error={errorApellido}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <FormControl fullWidth>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker
                                                required
                                                name='date'
                                                label="Fecha Nacimiento"
                                                format="DD/MM/YYYY"
                                                error={errorFecha}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="sexo"
                                        name='sexo'
                                        select
                                        label="Sexo"
                                        defaultValue="otro"
                                        error={errorSexo}
                                    >
                                        {currencies.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo"
                                    name="email"
                                    autoComplete="email"
                                    error={errorCorreo}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    error={errorPass}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordC"
                                    label="Confirmar contraseña"
                                    type="password"
                                    id="passwordC"
                                    error={errorPassC}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Registrarse
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    ¿Ya tienes cuenta? Inicia Sesión
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }} open={open} autoHideDuration={2000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity={type}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}