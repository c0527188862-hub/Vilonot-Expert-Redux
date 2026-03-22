import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';


const WatermarkText = styled(Typography)({
  fontFamily: "'Great Vibes', cursive",
  fontSize: '2rem',
  whiteSpace: 'nowrap',
  opacity: 0.03,
  transform: 'rotate(-15deg) scale(1.2)',
  color: '#fff',
  userSelect: 'none'
});

const AboutSection = ({ title, content }) => (
  <Box sx={s.section}>
    <Typography variant="h2" sx={s.sectionTitle}>{title}</Typography>
    <Box sx={s.goldLine}></Box>
    <Typography sx={s.sectionText}>{content}</Typography>
  </Box>
);

export default function About() {
  const data = [
    {
      title: "החזון שלנו",
      content: "אנחנו ב-Vilonot Studio מאמינים שווילון הוא לא רק מוצר, אלא כלי לעיצוב האור והרגש בבית. כל בד נבחר כדי להעניק לחלל שלכם את העומק והשקט המגיע לו."
    },
    {
      title: "איכות הטקסטיל",
      content: "מהפשתן האיכותי ביותר ועד לקטיפה עשירה, אנו עובדים עם חומרי הגלם הטובים בעולם כדי להבטיח נפילה מושלמת ומגע משי בכל הסטה."
    }
  ];

  return (
    <Box sx={s.page}>
      {/* לוגו חוזר ברקע - Watermark */}
      <Box sx={s.watermarkOverlay}>
        {[...Array(12)].map((_, i) => (
          <WatermarkText key={i}>Vilonot Studio</WatermarkText>
        ))}
      </Box>

      <Container maxWidth="md" sx={s.contentWrapper}>
        <Box component="header" sx={s.header}>
          <Typography variant="h1" sx={s.mainTitle}>קצת עלינו</Typography>
        </Box>

        <Box component="main" sx={s.main}>
          {data.map((item, index) => (
            <AboutSection 
              key={index} 
              title={item.title} 
              content={item.content} 
            />
          ))}
        </Box>

        <Box component="footer" sx={s.footer}>
          <Typography sx={s.signature}>Vilonot Studio</Typography>
        </Box>
      </Container>
    </Box>
  );
}


const s = {
  page: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
    direction: 'rtl',
    padding: '140px 20px 100px',
  },
  watermarkOverlay: {
    position: 'absolute',
    inset: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '50px',
    pointerEvents: 'none',
    zIndex: 1
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
  },
  header: {
    marginBottom: '80px',
  },
  mainTitle: {
    fontSize: { xs: '3rem', md: '4.5rem' }, // רספונסיבי - קטן יותר בנייד
    fontWeight: '400',
    color: '#b08b73',
    letterSpacing: '2px',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '100px',
  },
  section: {
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '300',
    marginBottom: '15px',
    letterSpacing: '1px',
  },
  goldLine: {
    width: '40px',
    height: '1px',
    backgroundColor: '#b08b73',
    margin: '0 auto 25px',
  },
  sectionText: {
    fontSize: '1.2rem',
    lineHeight: '1.8',
    color: '#ccc',
    fontWeight: '300',
    maxWidth: '700px',
    margin: '0 auto',
  },
  footer: {
    marginTop: '150px',
  },
  signature: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: '3rem',
    color: '#b08b73',
  }
};