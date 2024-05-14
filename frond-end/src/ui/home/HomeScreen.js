import { Box, ButtonBase, Container, CssBaseline, Grid, Paper, ThemeProvider, Typography, createTheme } from '@mui/material';
import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const defaultTheme = createTheme();

function HomeScreen() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 14,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Paper
                        sx={{
                            p: 2,
                            margin: 'auto',
                            maxWidth: 900,
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <ButtonBase sx={{ width: 128, height: 128 }}>
                                    <LockOutlinedIcon />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs={12} direction="row" spacing={2}>
                                    <Grid item xs>
                                        <Typography variant="subtitle1" component="div">
                                            $19.00
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="subtitle1" component="div">
                                            $19.00
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            Standard license
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Full resolution 1920x1080 • JPEG
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ID: 1030114
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default HomeScreen;