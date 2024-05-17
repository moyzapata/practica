import { Box, ButtonBase, Container, CssBaseline, Grid, IconButton, Paper, ThemeProvider, Typography, createTheme } from '@mui/material';
import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';

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
                            <Grid item container spacing={2}>
                                <Grid item xs={4}>
                                    <IconButton aria-label="like">
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={4}>
                                    <IconButton aria-label="comment">
                                        <CommentIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={4}>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={2}>
                                <Grid item xs>
                                    <Typography variant="subtitle1" component="div">
                                        Contenido Contenido Contenido Contenido Contenido Contenido Contenido
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="subtitle1" component="div">
                                        Contenido Contenido Contenido Contenido Contenido Contenido Contenido
                                    </Typography>
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