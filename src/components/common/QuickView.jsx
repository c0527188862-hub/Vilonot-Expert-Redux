import React, { useState, useEffect } from 'react';
import { Dialog, Box, Typography, TextField, Button, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

// פונקציה לאנימציית החלקה מלמעלה
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const StyledDialog = styled(Dialog)({
  '& .MuiPaper-root': {
    borderRadius: 0,
    padding: '40px',
    maxWidth: '450px',
    textAlign: 'center',
    border: '1px solid #b08b73',
    position: 'relative',
    margin: '20px' // רווח מהקצוות בנייד
  }
});

const SignUpButton = styled(Button)({
  backgroundColor: '#b08b73',
  color: '#fff',
  borderRadius: 0,
  padding: '12px 0',
  marginTop: '20px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  fontFamily: 'system-ui',
  '&:hover': { backgroundColor: '#1a1a1a' }
});

export default function QuickView() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenNewsletter');

    if (!hasSeenPopup) {
      // יקפוץ אחרי 4 שניות (4000 מילישניות)
      const timer = setTimeout(() => {
        setOpen(true);
      }, 4000); 
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('hasSeenNewsletter', 'true');
  };

  return (
    <StyledDialog 
      open={open} 
      onClose={handleClose}
      TransitionComponent={Transition} // מחבר את האנימציה מלמעלה
      keepMounted
    >
      <IconButton 
        onClick={handleClose} 
        sx={{ position: 'absolute', right: 8, top: 8, color: '#b08b73' }}
      >
        <CloseIcon />
      </IconButton>

      <Box sx={{ p: 1, direction: 'rtl' }}>
        {/* כותרת משולבת */}
        <Typography variant="h3" sx={{ 
          color: '#5d4037', 
          fontWeight: 'bold', 
          mb: 1, 
          fontFamily: 'serif',
          fontSize: '2.8rem',
          letterSpacing: '2px'
        }}>
          LUCKY YOU!
        </Typography>

        <Typography variant="h5" sx={{ color: '#b08b73', fontWeight: '700', mb: 2 }}>
          מגיע לך פינוק...
        </Typography>
        
        <Typography variant="body1" sx={{ color: '#5d4037', mb: 4, fontSize: '1.1rem' }}>
          הצטרפי לקהילה שלנו וקבלי <span style={{ fontWeight: 'bold', borderBottom: '2px solid #b08b73' }}>10% הנחה</span> לרכישה הראשונה שלך.
        </Typography>

        <TextField
          fullWidth
          placeholder="הזינו כתובת אימייל"
          variant="outlined"
          sx={{ 
            '& .MuiOutlinedInput-root': { 
              borderRadius: 0, 
              textAlign: 'right',
              '& fieldset': { borderColor: '#b08b73' } 
            },
            '& input': { textAlign: 'right' },
            mb: 1 
          }}
        />

        <SignUpButton fullWidth onClick={handleClose}>
          אני רוצה להירשם!
        </SignUpButton>

        <Typography sx={{ fontSize: '0.7rem', color: '#aaa', mt: 2, cursor: 'pointer' }} onClick={handleClose}>
          לא תודה, אולי בפעם אחרת
        </Typography>
      </Box>
    </StyledDialog>
  );
}