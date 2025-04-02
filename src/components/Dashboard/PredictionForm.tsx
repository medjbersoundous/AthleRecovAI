import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Grow, 
  Divider, 
  Typography, 
  keyframes 
} from '@mui/material';
import ProfileSection from './ProfileSection';
import TrainingForm from './TrainingForm';
import ResultCard from './ResultCard';
import usePredictionStore from '../../store/PredictionStore';

// Colorful gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

export default function PredictionForm() {
  const [error] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  // Get prediction state from the store
  const { prediction, resetPrediction } = usePredictionStore();

  const handleReset = () => {
    resetPrediction(); // Use the store's reset function
    setShowResult(false);
  };

  return (
    <Grow in={true} timeout={500}>
      <Paper elevation={10} sx={{
        p: 4,
        maxWidth: "100%",
        mx: 'auto',
        borderRadius: 3,
        background: 'linear-gradient(45deg, #f3f4f6, #e5e7eb, #d1d5db)',
        backgroundSize: '300% 300%',
        animation: `${gradientAnimation} 8s ease infinite`,
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
        }
      }}>
        {/* Title without underline */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          width: '100%', 
          mb: 4,
        }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 800,
              textAlign: 'center',
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s ease',
              '&:hover': {
                letterSpacing: '2px'
              }
            }}
          >
            Recovery Time Prediction
          </Typography>
        </Box>
        
        {/* Animated Divider */}
        <Divider sx={{ 
          my: 3,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, transparent)',
          border: 'none',
          opacity: 0.7,
          transition: 'all 0.5s ease',
          '&:hover': {
            opacity: 1,
            height: '3px'
          }
        }} />
        <Box 
          display="flex" 
          flexDirection={{ xs: 'column', md: 'row' }} 
          gap={4}
          sx={{
            transition: 'all 0.5s ease'
          }}
        >
          <ProfileSection />
          <TrainingForm 
            setShowResult={setShowResult}
            handleReset={handleReset}
          />
        </Box>
        
        {/* Result with pop-in animation */}
        <Grow in={showResult} timeout={800}>
          <Box>
          <ResultCard 
              showResult={showResult} 
              prediction={prediction} // Now using the store's prediction
              error={error} // Now using the store's error
            />
          </Box>
        </Grow>
      </Paper>
    </Grow>
  );
}