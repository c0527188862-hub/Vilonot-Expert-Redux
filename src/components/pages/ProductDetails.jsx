import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../cartSlice';
import images from '../../assets/images';

// שימוש ב-MUI ו-Styled Components
import { 
  Box, Typography, Button, Container, Grid, 
  CircularProgress, IconButton, Stack 
} from '@mui/material';
import { styled } from '@mui/material/styles';

// אייקונים
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// --- Styled Components ---
const DetailContainer = styled(Container)({
  padding: '160px 20px 100px',
  maxWidth: '1200px',
  direction: 'rtl',
});

const DetailImage = styled('img')({
  width: '100%',
  height: 'auto',
  maxHeight: '600px',
  objectFit: 'cover',
  borderRadius: '4px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
});

const QtyControl = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #e0e0e0',
  width: 'fit-content',
  padding: '4px',
  borderRadius: '0px',
  marginBottom: '25px'
});

const AddToCartButton = styled(Button)({
  padding: '15px', 
  backgroundColor: '#1a1a1a', 
  color: '#fff', 
  borderRadius: 0,
  fontSize: '1.1rem',
  '&:hover': { backgroundColor: '#333' }
});

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => Number(p.id) === Number(id));
        setProduct(found);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        name: product.name, // תיקון ל-name
        price: Number(product.price),
        image: product.image, // תיקון ל-image
        quantity: Number(quantity)
      }));
    }
  };

  if (loading) return (
    <Box sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress sx={{ color: '#b08b73' }} />
    </Box>
  );
  
  if (!product) return (
    <Box sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h5">המוצר לא נמצא במערכת</Typography>
    </Box>
  );

  return (
    <DetailContainer>
      <Button 
        onClick={() => navigate('/products')} 
        startIcon={<ArrowBackIosNewIcon sx={{ fontSize: '12px !important' }} />}
        sx={{ color: '#b08b73', mb: 4, '&:hover': { background: 'none', textDecoration: 'underline' } }}
      >
        חזרה לקטלוג הוילונות
      </Button>
      
      <Grid container spacing={{ xs: 4, md: 8 }}>
        <Grid item xs={12} md={6}>
          {/* תיקון ה-src כדי שימשוך מה-assets */}
          <DetailImage 
            src={images.products[product.image]} 
            alt={product.name} 
          />
        </Grid>
        
        <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
          <Typography variant="h3" sx={{ fontSize: {xs: '2rem', md: '2.8rem'}, fontWeight: '300', mb: 2 }}>
            {product.name} {/* תיקון ל-name */}
          </Typography>
          
          <Typography variant="h5" sx={{ fontSize: '1.8rem', mb: 3, color: '#b08b73', fontWeight: '500' }}>
            {product.price} ₪
          </Typography>
          
          <Typography variant="body1" sx={{ lineHeight: '1.8', color: '#666', mb: 4, fontSize: '1.1rem' }}>
            {product.description}
          </Typography>
          
          <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: '600', color: '#333' }}>
            בחירת כמות:
          </Typography>
          
          <QtyControl>
            <IconButton size="small" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ mx: 4, fontWeight: '600' }}>{quantity}</Typography>
            <IconButton size="small" onClick={() => setQuantity(q => q + 1)}>
              <AddIcon fontSize="small" />
            </IconButton>
          </QtyControl>

          <AddToCartButton 
            variant="contained" 
            fullWidth
            onClick={handleAddToCart}
          >
            הוספה לסל הקניות
          </AddToCartButton>

          <Stack spacing={1.5} sx={{ mt: 5, pt: 4, borderTop: '1px solid #eee' }}>
            <Typography variant="caption" color="text.secondary">• משלוח חינם ברכישה מעל 500 ₪</Typography>
            <Typography variant="caption" color="text.secondary">• התקנה מקצועית בבית הלקוח</Typography>
            <Typography variant="caption" color="text.secondary">• ייעוץ והתאמה אישית של מידות</Typography>
          </Stack>
        </Grid>
      </Grid>
    </DetailContainer>
  );
}