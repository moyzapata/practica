import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import * as React from 'react';

const defaultTheme = createTheme();

function HomeScreen() {
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
                    <p>Hola</p>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default HomeScreen;