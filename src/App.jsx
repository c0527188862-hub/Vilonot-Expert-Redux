import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './store';
import { toggleCart } from './cartSlice';


import { Box, Typography, Badge, GlobalStyles } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// ייבוא קומפוננטות ודפים
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Products from './components/pages/Products';
import ProductDetails from './components/pages/ProductDetails';
import Checkout from './components/pages/Checkout';

// ייבוא הפופ-אפ
import QuickView from './components/common/QuickView';

// --- אנימציות ---
const cartBounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); } 
  100% { transform: scale(1.1); } 
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(176, 139, 115, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(176, 139, 115, 0); }
  100% { box-shadow: 0 0 0 0 rgba(176, 139, 115, 0); }
`;

// --- Styled Components ---

const FloatingCart = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: '130px', 
  left: '30px',
  width: '65px',
  height: '65px',
  backgroundColor: '#fff',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  zIndex: 5000,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    animation: `${cartBounce} 0.4s forwards`,
    boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
    backgroundColor: '#f9f9f9',
  }
}));

const ChatButton = styled(Box)({
  position: 'fixed',
  bottom: '40px',
  left: '30px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#b08b73', // הצבע החום הדומיננטי שלך
  color: '#fff',
  padding: '14px 25px',
  borderRadius: '50px',
  boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
  cursor: 'pointer',
  zIndex: 5000,
  direction: 'rtl',
  transition: 'all 0.3s ease',
  animation: `${pulse} 2s infinite`, 
  '&:hover': {
    transform: 'translateY(-5px) scale(1.05)',
    backgroundColor: '#1a1a1a', 
  }
});

function MainLayout() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <GlobalStyles styles={{ 
        body: { margin: 0, padding: 0, backgroundColor: '#fff', fontFamily: 'sans-serif' } 
      }} />

      <Box sx={{ minHeight: '100vh', position: 'relative' }}>
        <Header />

        {/* פופ-אפ ניוזלטר שמתחלק מלמעלה */}
        <QuickView />

        {/* עגלה צפה */}
        <FloatingCart onClick={() => dispatch(toggleCart())}>
          <Box sx={{ position: 'relative' }}>
            <span style={{ fontSize: '28px' }}>🛒</span>
            <Badge 
              badgeContent={totalItems} 
              invisible={totalItems === 0}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#d38d5f',
                  color: '#fff',
                  top: -10,
                  right: -10,
                  border: '2px solid #fff'
                }
              }}
            />
          </Box>
        </FloatingCart>

        {/* כפתור צ'אט דומיננטי - טקסט מעודכן */}
        <ChatButton onClick={() => alert('הצ\'אט בבנייה... בקרוב תוכלו להתכתב איתנו ישירות!')}>
          <Typography sx={{ fontSize: '15px', ml: 1.5, fontWeight: 600 }}>ייעוץ אישי בצ'אט</Typography>
          <span style={{ fontSize: '20px' }}>💬</span>
        </ChatButton>

        <CartDrawer />

        <Box component="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:category?" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainLayout />
    </Provider>
  );
}