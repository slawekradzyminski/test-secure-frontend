import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import BugReportIcon from '@mui/icons-material/BugReport';
import MenuItem from '@mui/material/MenuItem';
import { loggedInPages, pagePaths, loggedOutPages } from './navbarConstants';
import { Menu } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../_reducers';

const MobileView = () => {
    const loggedIn = useSelector((state: RootState) => state.authentication.loggedIn);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const renderMenuItems = (pages: string[]) => (
        pages.map((page) => {
            const active = location.pathname === pagePaths[page];
            return (
                <MenuItem 
                    key={page} 
                    onClick={() => {
                        handleCloseNavMenu();
                        navigate(pagePaths[page]);
                    }}
                    sx={{ fontWeight: active ? 'bold' : 'normal' }}
                >
                    <Typography textAlign="center">{page}</Typography>
                </MenuItem>
            );
        })
    );

    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    {loggedIn ? renderMenuItems(loggedInPages) : renderMenuItems(loggedOutPages)}
                </Menu>
            </Box>
            <BugReportIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                HOME
            </Typography>
        </>
    )
};

export default MobileView;