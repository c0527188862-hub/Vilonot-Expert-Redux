import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from "../../cartSlice"; 
import { 
  Box, Typography, TextField, Button, Container, 
  Paper, CircularProgress, Fade 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// --- Styled Components נשארים אותו דבר ---
const PaymentPaper = styled(Paper)({
  padding: '40px',
  maxWidth: '500px',
  margin: '160px auto 80px',
  textAlign: 'center',
  borderRadius: '0',
  boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
  direction: 'rtl'
});

const SuccessBox = styled(Box)({
  display: 'flex', flexDirection: 'column', justifyContent: 'center', 
  alignItems: 'center', height: '80vh', direction: 'rtl', textAlign: 'center'
});

export default function Checkout() {
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isPaid, setIsPaid] = useState(false);
  const [expiry, setExpiry] = useState(''); 
  const [expiryError, setExpiryError] = useState(''); 

  useEffect(() => {
    if (!isPaid && items.length === 0) {
      navigate('/');
    }
  }, [items, navigate, isPaid]);

  const totalPrice = items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);

  // פונקציה שבודקת אם התוקף תקין ועתידי
  const validateExpiry = (value) => {
    // בודק פורמט כללי MM/YY
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!regex.test(value)) {
      setExpiryError('פורמט לא תקין (MM/YY)');
      return false;
    }

    const [month, year] = value.split('/').map(Number);
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = Number(now.getFullYear().toString().slice(-2)); // לוקח רק את ה-20 מתוך 2020

    // בדיקה: אם השנה קטנה מהשנה הנוכחית, או השנה נוכחית והחודש עבר
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      setExpiryError('הכרטיס פג תוקף');
      return false;
    }

    setExpiryError('');
    return true;
  };

  const handlePay = (e) => {
    e.preventDefault();
    
    // הרצת הבדיקה לפני התשלום
    if (!validateExpiry(expiry)) return;
    if (items.length === 0) return;

    dispatch(clearCart()); 
    setIsPaid(true);
    setTimeout(() => navigate('/'), 3000);
  };

  if (isPaid) {
    return (
      <Fade in={true} timeout={800}>
        <SuccessBox>
          <CheckCircleOutlineIcon sx={{ fontSize: 80, color: '#b08b73', mb: 3 }} />
          <Typography variant="h4" sx={{ fontWeight: 300, mb: 2 }}>ההזמנה התקבלה בהצלחה</Typography>
          <Typography sx={{ color: '#666', mb: 4 }}>
            אישור הזמנה נשלח למייל שלך.<br />
            תודה שבחרת ב-Vilonot Studio.
          </Typography>
          <CircularProgress size={24} sx={{ color: '#b08b73', mb: 2 }} />
        </SuccessBox>
      </Fade>
    );
  }

  return (
    <Container>
      <PaymentPaper elevation={1}>
        <Typography variant="h5" sx={{ fontWeight: 500, mb: 3 }}>סיכום הזמנה ותשלום</Typography>
        <Box sx={{ p: 2, bgcolor: '#fcfcfc', border: '1px solid #f0f0f0', mb: 4 }}>
          <Typography variant="h6">סה"כ לתשלום: <span style={{ color: '#b08b73', fontWeight: 'bold' }}>{totalPrice} ₪</span></Typography>
        </Box>

        <Box component="form" onSubmit={handlePay} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField fullWidth label="שם בעל הכרטיס" required variant="outlined" />
          <TextField 
            fullWidth label="מספר כרטיס אשראי" required 
            inputProps={{ maxLength: 16, pattern: "\\d{16}" }}
            helperText="16 ספרות ללא רווחים"
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField 
              sx={{ flex: 1 }} 
              label="תוקף (MM/YY)" 
              required 
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              error={!!expiryError}
              helperText={expiryError}
              placeholder="05/26"
            />
            <TextField 
              sx={{ flex: 1 }} label="CVV" required 
              inputProps={{ maxLength: 3, pattern: "\\d{3}" }}
            />
          </Box>
          
          <Button 
            type="submit" variant="contained" size="large"
            sx={{ mt: 2, bgcolor: '#b08b73', borderRadius: 0, py: 2, '&:hover': { bgcolor: '#333' } }}
          >
            בצע תשלום עכשיו
          </Button>
        </Box>
      </PaymentPaper>
    </Container>
  );
}