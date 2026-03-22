import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Grid, Card, CardActionArea, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import images from '../../assets/images';


// --- Styled Components לשחזור העיצוב המדויק שלך ---
const PageWrapper = styled(Box)({
  padding: '140px 10% 80px',
  direction: 'rtl',
  backgroundColor: '#fff',
  minHeight: '100vh'
});

const CategoryCard = styled(Card)({
  border: '1px solid #f0f0f0',
  padding: '40px 30px',
  transition: 'all 0.4s ease',
  backgroundColor: '#fafafa',
  borderRadius: 0,
  boxShadow: 'none',
  height: '100%',
  '&:hover': { borderColor: '#b08b73', backgroundColor: '#fff', transform: 'translateY(-5px)' }
});

const ProductFrame = styled(Box)({
  border: '1px solid #eee',
  transition: '0.3s',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': { borderColor: '#b08b73' }
});

export default function Products() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);

  // רשימת הקטגוריות
  const categories = [
    { id: 'shading', name: 'וילון הצללה' },
    { id: 'electric', name: 'וילונות חשמליים' },
    { id: 'living-room', name: 'וילונות לסלון' },
    { id: 'designer', name: 'וילונות מעצבים' },
    { id: 'blackout', name: 'וילון האפלה' },
    { id: 'bedroom', name: 'וילונות לחדר שינה וילדים' },
    { id: 'acoustic', name: 'וילון אקוסטי' }
  ];

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setAllData(data))
      .catch(err => console.error("Error loading JSON:", err));
  }, []);

  // תצוגה א': דף הבית של הקטלוג (הריבועים עם המספרים 01, 02...)
  if (!category) {
    return (
      <PageWrapper>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontSize: '2.8rem', fontWeight: '300', mb: 2 }}>הקולקציה שלנו</Typography>
          <Box sx={{ width: '40px', height: '2px', bgcolor: '#b08b73', mx: 'auto', mb: 3 }} />
          <Typography sx={{ color: '#888', fontSize: '1.1rem', fontWeight: '300' }}>
            בחרו את הקטגוריה המתאימה לחלל הבית שלכם
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {categories.map((cat, index) => (
            <Grid item xs={12} sm={6} md={4} key={cat.id}>
              <CategoryCard onClick={() => navigate(`/products/${cat.id}`)}>
                <CardActionArea sx={{ p: 1 }}>
                  <Typography sx={{ color: '#b08b73', fontWeight: 'bold', mb: 2, fontSize: '0.8rem', letterSpacing: '2px' }}>
                    0{index + 1}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: '300', mb: 3 }}>{cat.name}</Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase' }}>
                    לצפייה בדגמים ←
                  </Typography>
                </CardActionArea>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>
      </PageWrapper>
    );
  }

  // תצוגה ב': דף המוצרים של קטגוריה ספציפית
  const filteredProducts = allData.filter(p => p.category === category);
  const categoryName = categories.find(c => c.id === category)?.name;

  return (
    <PageWrapper>
      <Button 
        onClick={() => navigate('/products')} 
        sx={{ color: '#b08b73', mb: 4, fontSize: '0.9rem' }}
      >
        ← חזרה לקטלוג הראשי
      </Button>
      
      <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: '300', mb: 8 }}>
        {categoryName}
      </Typography>

      <Grid container spacing={4}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ProductFrame>
                <img 
                
                  src={images.products[item.img]} 
                  alt={item.title} 
                  style={{ width: '100%', height: '400px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => navigate(`/product/${item.id}`)}
                />
                <Box sx={{ p: 3, textAlign: 'right', flexGrow: 1 }}>
                  {}
                  <Typography variant="h6" sx={{ fontWeight: '400', mb: 1 }}>{item.title}</Typography>
                  <Typography variant="h6" sx={{ color: '#b08b73', fontWeight: '500' }}>
                    {item.price} ₪ <span style={{ fontSize: '0.8rem', color: '#999' }}>/ למטר</span>
                  </Typography>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    sx={{ bgcolor: '#1a1a1a', color: '#fff', borderRadius: 0, mt: 3, py: 1.5, '&:hover': { bgcolor: '#b08b73' } }}
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    פרטים ורכישה
                  </Button>
                </Box>
              </ProductFrame>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 10, border: '1px dashed #eee' }}>
              <Typography sx={{ color: '#aaa' }}>הדגמים החדשים בקטגוריה זו יעלו בקרוב.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </PageWrapper>
  );
}