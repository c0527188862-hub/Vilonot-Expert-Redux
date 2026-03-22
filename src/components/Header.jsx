import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toggleCart } from '../cartSlice';
import { AppBar, Toolbar, Typography, Box, Badge, IconButton, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

// --- Styled Components ---

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#fff',
  color: '#333',
  boxShadow: 'none',
  borderBottom: '1px solid #f0f0f0',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1100,
});

const StyledNavLink = styled(NavLink)({
  textDecoration: 'none',
  color: '#333',
  fontSize: '0.95rem',
  fontWeight: '400',
  margin: '0 15px',
  transition: 'color 0.3s ease',
  '&:hover': { color: '#b08b73' },
  '&.active': { 
    color: '#b08b73', 
    fontWeight: '600'
  },
});

export default function Header() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StyledAppBar>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: '80px' }}>
          
          {/* צד אחד - לוגו */}
          <Box 
            onClick={() => navigate('/')} 
            sx={{ cursor: 'pointer', flex: 1, display: 'flex', justifyContent: 'flex-start' }}
          >
            <Typography variant="h5" sx={{ fontWeight: '300', letterSpacing: '1px' }}>
              Vilonot <Box component="span" sx={{ fontWeight: 'bold', color: '#b08b73' }}>Studio</Box>
            </Typography>
          </Box>

          {/* מרכז - תפריט ניווט (הלשוניות) */}
          <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', flex: 2 }}>
            <StyledNavLink to="/contact">צור קשר</StyledNavLink>
            <StyledNavLink to="/about">אודות</StyledNavLink>
            <StyledNavLink to="/products">וילונות</StyledNavLink>
            <StyledNavLink to="/">דף הבית</StyledNavLink>
          </Box>

          {/* צד שני - עגלת קניות */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton 
              onClick={() => dispatch(toggleCart())}
              sx={{ 
                color: '#333',
                '&:hover': { animation: 'cartBounce 0.4s forwards' } 
              }}
            >
              <Badge 
                badgeContent={totalItems} 
                sx={{ '& .MuiBadge-badge': { backgroundColor: '#b08b73', color: 'white' } }}
              >
                <ShoppingCartOutlinedIcon fontSize="medium" />
              </Badge>
            </IconButton>
          </Box>

        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}