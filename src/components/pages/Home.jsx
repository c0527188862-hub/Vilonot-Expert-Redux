import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import HeroImage from '../../assets/hero-curtain.jpg';



const HomeContainer = styled(Box)({
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  direction: 'rtl',
  position: 'relative',
});

const IntroOverlay = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isDone',
})(({ isDone }) => ({
  position: 'fixed',
  inset: 0,
  backgroundColor: '#1a1a1a',
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transform: isDone ? 'translateX(100%)' : 'translateX(0)',
  transition: 'transform 2.5s cubic-bezier(0.645, 0.045, 0.355, 1)',
}));

const HeroSection = styled('section')({
  position: 'relative',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  paddingRight: '12%',
});

const FloatingBox = styled(Box)({
  position: 'relative',
  zIndex: 2,
  backgroundColor: 'white',
  width: '420px',
  padding: '50px',
  textAlign: 'center',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
});

const HeroImg = styled('img')({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 1,
});

export default function Home() {
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Vilonot Studio';

  useEffect(() => {
    // טעינת הפונט (דרישת עיצוב)
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    let currentPos = 0;
    const typeInterval = setInterval(() => {
      if (currentPos < fullText.length) {
        setTypedText(fullText.slice(0, currentPos + 1));
        currentPos++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setIsDone(true);
        }, 800);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <HomeContainer>
      
      {/* שכבת ה-Intro השחורה - משתמשת ב-Styled Component עם Props */}
      <IntroOverlay isDone={isDone}>
        <Box sx={{ textAlign: 'center', minWidth: '300px' }}>
          <Typography variant="h2" sx={{ color: '#fff', fontSize: '1.8rem', fontWeight: '300', letterSpacing: '4px', mb: 1.5 }}>
           להסיט את הווילון ולהרגיש בבית
          </Typography>
          <Box sx={{ width: '40px', height: '1px', bgcolor: 'rgba(255,255,255,0.3)', mx: 'auto', mb: 4 }} />
          
          <Typography sx={{
            fontFamily: "'Great Vibes', cursive",
            color: '#b08b73',
            fontSize: '4.5rem',
            fontWeight: '400',
            minHeight: '1.2em',
          }}>
            {typedText}
          </Typography>
        </Box>
      </IntroOverlay>

      {/* דף הבית */}
      <HeroSection>
        <HeroImg src={HeroImage} alt="Vilonot Studio" />

        <FloatingBox>
          <Typography variant="overline" sx={{ fontSize: '0.75rem', letterSpacing: '6px', color: '#bbb', display: 'block' }}>
            FINE CURTAINS
          </Typography>
          
          <Box sx={{ width: '30px', height: '1px', bgcolor: '#000', mx: 'auto', my: 2.5 }} />
          
          <Typography variant="h1" sx={{ fontSize: '2.8rem', fontWeight: '300', color: '#000', lineHeight: 1.2, mb: 3 }}>
            הלבשת הבית <br/> בסטנדרט אחר
          </Typography>
          
          <Typography sx={{ fontSize: '1rem', color: '#666', mb: 4.5 }}>
            אצלנו תמצאו את השילוב המושלם בין בדים יוקרתיים, דיוק בעיצוב ואווירה ביתית נעימה.
          </Typography>
          
          <Button 
            onClick={() => navigate('/products')}
            variant="outlined"
            sx={{ 
              color: '#000', 
              borderColor: '#000', 
              borderRadius: 0, 
              px: 4.5, 
              py: 1.5,
              fontSize: '0.9rem',
              letterSpacing: '1px',
              '&:hover': {
                borderColor: '#b08b73',
                color: '#b08b73',
                bgcolor: 'transparent'
              }
            }}
          >
            לקולקציה המלאה
          </Button>
        </FloatingBox>
      </HeroSection>
    </HomeContainer>
  );
}