import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Container, 
  Snackbar, Alert, Fade 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// --- Styled Components ---

const PageWrapper = styled(Box)({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#1a1a1a',
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
  direction: 'rtl',
  padding: '100px 20px',
  display: 'flex',
  justifyContent: 'center',
});

const WatermarkOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '100px',
  opacity: 0.02,
  pointerEvents: 'none',
  transform: 'rotate(-10deg) scale(1.1)',
});

const StyledTextField = styled(TextField)({
  // ביטול מסגרת ברירת המחדל של הדפדפן (המסגרת הלבנה שציינת)
  '& input:focus, & textarea:focus': {
    outline: 'none !important',
  },
  '& .MuiInput-root': {
    color: '#fff',
    fontSize: '1.1rem',
    padding: '10px 0',
    '&:before': { borderBottom: '1px solid #333' },
    '&:hover:not(.Mui-disabled):before': { borderBottom: '1px solid #b08b73' },
    // שינוי הקו התחתון לחום בזמן פוקוס (במקום כחול)
    '&:after': { borderBottom: '1px solid #b08b73' },
  },
  '& .MuiInputLabel-root': {
    color: '#b08b73',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    right: 0,
    left: 'auto',
    transformOrigin: 'right',
    // וידוא שהלייבל נשאר חום גם כשלוחצים על השדה
    '&.Mui-focused': {
      color: '#b08b73',
    },
  },
  '& .MuiFormHelperText-root': {
    color: '#ff4d4d',
    textAlign: 'right',
    marginTop: '4px',
  }
});

export default function Contact() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [openSuccess, setOpenSuccess] = useState(false);

  const validate = () => {
    let temp = {};
    if (formData.fullName.trim().length < 2) temp.fullName = "נא להזין שם מלא תקין";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) temp.email = "כתובת אימייל לא תקינה";
    if (!/^[0-9]{9,10}$/.test(formData.phone)) temp.phone = "מספר טלפון חייב להכיל 9-10 ספרות";
    if (formData.message.trim().length < 5) temp.message = "הודעה קצרה מדי";
    
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setOpenSuccess(true);
      
      setTimeout(() => {
        navigate('/'); 
      }, 2500);
    }
  };

  return (
    <PageWrapper>
      <WatermarkOverlay>
        {[...Array(12)].map((_, i) => (
          <Typography key={i} sx={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem', color: '#fff' }}>
            Vilonot Studio
          </Typography>
        ))}
      </WatermarkOverlay>

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h1" sx={{ fontSize: '3.5rem', color: '#b08b73', fontWeight: '300', mb: 1 }}>
            צרו קשר
          </Typography>
          <Box sx={{ width: '40px', height: '1px', bgcolor: '#b08b73', mx: 'auto', mb: 2 }} />
          <Typography sx={{ color: '#888', letterSpacing: '1px', fontSize: '1rem' }}>
            בואו נתכנן יחד את האווירה הבאה שלכם
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
              <StyledTextField
                variant="standard"
                fullWidth
                label="שם מלא"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
              <StyledTextField
                variant="standard"
                fullWidth
                label="אימייל"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>

            <StyledTextField
              variant="standard"
              fullWidth
              label="טלפון"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              inputProps={{ style: { direction: 'ltr', textAlign: 'right' } }}
            />

            <StyledTextField
              variant="standard"
              fullWidth
              multiline
              rows={3}
              label="איך נוכל לעזור?"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 2, py: 2, bgcolor: '#b08b73', color: '#1a1a1a', 
                fontSize: '1rem', fontWeight: '600', letterSpacing: '2px',
                borderRadius: 0, transition: '0.3s',
                '&:hover': { bgcolor: '#d4a383', transform: 'translateY(-2px)' },
              }}
            >
              שליחת הודעה
            </Button>
          </Box>
        </form>

        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Typography sx={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem', color: '#b08b73' }}>
            Vilonot Studio
          </Typography>
        </Box>
      </Container>

      <Snackbar 
        open={openSuccess} 
        autoHideDuration={4000} 
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={Fade}
      >
        <Alert 
          severity="success" 
          variant="filled" 
          sx={{ 
            width: '100%', bgcolor: '#b08b73', color: '#1a1a1a',
            fontWeight: '600', boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
          }}
        >
          הודעתך התקבלה! מעבירים אותך חזרה לדף הבית...
        </Alert>
      </Snackbar>
    </PageWrapper>
  );
}