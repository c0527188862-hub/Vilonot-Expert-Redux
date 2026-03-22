import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from '../../cartSlice'; 
import { useNavigate } from 'react-router-dom';
// ייבוא רכיבי MUI (דרישת חובה)
import { 
  Box, Typography, Button, IconButton, Container, 
  Alert, Paper, Divider, Stack 
} from '@mui/material';
import { styled } from '@mui/material/styles';
// אייקונים
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

// שימוש ב-Styled Components (עמ' 140 בסילבוס)
const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  marginBottom: '15px',
  borderRadius: '0',
  borderBottom: '1px solid #eee',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center',
    gap: '15px'
  }
}));

const QtyBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  border: '1px solid #f0f0f0',
  padding: '5px 10px',
  borderRadius: '4px'
});

export default function CartPage() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  // חישוב סכום סופי - מוודא המרה למספר
  const totalAmount = items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

  // פונקציית מעבר לקופה עם חסימה כפולה
  const goToCheckout = () => {
    if (items.length > 0 && totalAmount > 0) {
      navigate('/checkout');
    } else {
      setMsg("הסל שלך ריק. לא ניתן לעבור לתשלום.");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  if (items.length === 0) {
    return (
      <Box sx={{ py: 20, textAlign: 'center', direction: 'rtl' }}>
        <ShoppingBagOutlinedIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: 300, mb: 3 }}>סל הקניות שלך ריק</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/products')}
          sx={{ bgcolor: '#b08b73', borderRadius: 0, px: 4, py: 1.5, '&:hover': { bgcolor: '#8e6f5a' } }}
        >
          חזרה לחנות
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 18, pb: 10, direction: 'rtl' }}>
      <Typography variant="h3" sx={{ fontWeight: 300, mb: 5, textAlign: 'right' }}>
        סל הקניות
      </Typography>

      {msg && <Alert severity="error" sx={{ mb: 3 }}>{msg}</Alert>}

      {/* כותרות (מוסתר בנייד) */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, px: 3, mb: 2, opacity: 0.6 }}>
        <Typography sx={{ flex: 2 }}>מוצר</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center' }}>מחיר</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center' }}>כמות</Typography>
        <Typography sx={{ flex: 1, textAlign: 'center' }}>סה"כ</Typography>
        <Box sx={{ width: 40 }} />
      </Box>

      {/* רשימת מוצרים */}
      <Stack spacing={0}>
        {items.map((item) => (
          <StyledPaper elevation={0} key={item.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 2, gap: 2, width: '100%' }}>
              <Box component="img" src={item.img} sx={{ width: 80, height: 100, objectFit: 'cover' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{item.title}</Typography>
            </Box>

            <Typography sx={{ flex: 1, textAlign: 'center', width: '100%' }}>{item.price} ₪</Typography>

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', width: '100%' }}>
              <QtyBox>
                <IconButton size="small" onClick={() => dispatch(updateQuantity({ id: item.id, amount: -1 }))} disabled={item.quantity <= 1}>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton size="small" onClick={() => dispatch(updateQuantity({ id: item.id, amount: 1 }))}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </QtyBox>
            </Box>

            <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', width: '100%' }}>
              {item.price * item.quantity} ₪
            </Typography>

            <IconButton onClick={() => dispatch(removeItem(item.id))} color="error">
              <DeleteOutlineIcon />
            </IconButton>
          </StyledPaper>
        ))}
      </Stack>

      {/* סיכום והמשך */}
      <Box sx={{ mt: 6, display: 'flex', justifyContent: 'flex-start' }}>
        <Paper variant="outlined" sx={{ p: 4, width: { xs: '100%', md: 400 }, borderRadius: 0, bgcolor: '#fafafa' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 300 }}>סה"כ לתשלום:</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#b08b73' }}>{totalAmount} ₪</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          
          <Button 
            variant="contained" 
            fullWidth
            size="large"
            // --- זו החסימה הקריטית ---
            disabled={totalAmount <= 0}
            onClick={goToCheckout} 
            // -------------------------
            sx={{ 
              bgcolor: '#1a1a1a', 
              color: '#fff', 
              borderRadius: 0,
              py: 2,
              '&:hover': { bgcolor: '#333' },
              '&.Mui-disabled': { bgcolor: '#e0e0e0', color: '#9e9e9e' }
            }}
          >
            {totalAmount > 0 ? "המשך לתשלום בקופה ←" : "הסל ריק - לא ניתן להמשיך"}
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}