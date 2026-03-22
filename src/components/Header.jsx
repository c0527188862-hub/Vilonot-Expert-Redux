import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toggleCart } from '../cartSlice';
import { 
  AppBar, Toolbar, Typography, Box, Badge, IconButton, 
  Container, Drawer, List, ListItem, ListItemText 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';

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
  '&.active': { color: '#b08b73', fontWeight: '600' },
});

export default function Header() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // פריטי התפריט
  const menuItems = [
    { text: 'דף הבית', path: '/' },
    { text: 'וילונות', path: '/products' },
    { text: 'אודות', path: '/about' },
    { text: 'צור קשר', path: '/contact' },
  ];

  return (
    <StyledAppBar>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: '80px' }}>
          
          {/* המבורגר - מופיע רק בטלפון (xs) בצד ימין */}
          <IconButton
            color="inherit"
            onClick={toggleMobileMenu}
            sx={{ display: { md: 'none' }, color: '#333', ml: 1 }}
          >
            <MenuIcon />
          </IconButton>

          {/* לוגו - ממורכז בטלפון, בצד ימין במחשב */}
          <Box 
            onClick={() => navigate('/')} 
            sx={{ 
              cursor: 'pointer', 
              display: 'flex', 
              flexGrow: 1, 
              justifyContent: { xs: 'center', md: 'flex-start' },
              // תיקון איזון בטלפון בגלל שההמבורגר תופס מקום בצד אחד
              mr: { xs: '40px', md: 0 } 
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: '300', letterSpacing: '1px', fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
              Vilonot <Box component="span" sx={{ fontWeight: 'bold', color: '#b08b73' }}>Studio</Box>
            </Typography>
          </Box>

          {/* תפריט ניווט למחשב - נעלם בטלפון */}
          <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', flex: 2 }}>
            {/* הופך את הסדר שיוצג נכון מימין לשמאל במחשב */}
            {menuItems.slice().reverse().map((item) => (
              <StyledNavLink key={item.path} to={item.path}>{item.text}</StyledNavLink>
            ))}
          </Box>

          {/* עגלת קניות - תמיד בצד שמאל */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton 
              onClick={() => dispatch(toggleCart())}
              sx={{ color: '#333' }}
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

      {/* תפריט צד נפתח (Drawer) */}
      <Drawer
        anchor="right" // נפתח מצד ימין
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
      >
        <Box 
          sx={{ width: 250, pt: 5 }} 
          role="presentation" 
          onClick={toggleMobileMenu}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} onClick={() => navigate(item.path)}>
                <ListItemText 
                  primary={item.text} 
                  sx={{ textAlign: 'right', pr: 3 }} // טקסט מוצמד לימין
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </StyledAppBar>
  );
}