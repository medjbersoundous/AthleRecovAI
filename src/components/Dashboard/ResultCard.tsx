import { Collapse, Grow, Typography, Paper, Box, Chip } from '@mui/material';
import { keyframes } from '@emotion/react';

interface ResultCardProps {
  showResult: boolean;
  prediction: number | null;
  error: string | null;
}

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export default function ResultCard({ showResult, prediction, error }: ResultCardProps) {
  // Format the prediction into days and hours
  const formatRecoveryTime = (days: number) => {
    // Convert to total minutes and round to nearest minute
    const totalMinutes = Math.round(days * 24 * 60);
    
    // Calculate components
    const fullDays = Math.floor(totalMinutes / (24 * 60));
    const remainingAfterDays = totalMinutes % (24 * 60);
    const fullHours = Math.floor(remainingAfterDays / 60);
    const remainingMinutes = remainingAfterDays % 60;
  
    // Build primary text (always shows largest unit)
    let primaryText = '';
    if (fullDays > 0) {
      primaryText = `${fullDays} ${fullDays === 1 ? 'Day' : 'Days'}`;
    } else if (fullHours > 0) {
      primaryText = `${fullHours} ${fullHours === 1 ? 'Hour' : 'Hours'}`;
    } else {
      primaryText = `${remainingMinutes} ${remainingMinutes === 1 ? 'Minute' : 'Minutes'}`;
    }
  
    // Build secondary text (remaining smaller units)
    const remainingParts = [];
    if (fullDays > 0) {
      if (fullHours > 0) {
        remainingParts.push(`${fullHours} ${fullHours === 1 ? 'Hour' : 'Hours'}`);
      }
      if (remainingMinutes > 0) {
        remainingParts.push(`${remainingMinutes} ${remainingMinutes === 1 ? 'Minute' : 'Minutes'}`);
      }
    } 
    else if (fullHours > 0 && remainingMinutes > 0) {
      remainingParts.push(`${remainingMinutes} ${remainingMinutes === 1 ? 'Minute' : 'Minutes'}`);
    }
  
    return {
      primaryText,
      secondaryText: remainingParts.length > 0 ? remainingParts.join(' ') : null
    };
  };

  const recoveryTime = prediction ? formatRecoveryTime(prediction) : null;

  return (
    <>
      <Collapse in={showResult && prediction !== null}>
        <Grow in={showResult && prediction !== null}>
          <Paper sx={{ 
            mt: 4,
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            }
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              mb: 1,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: 1
            }}>
              Recovery Prediction
            </Typography>
            
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1
            }}>
              <Typography variant="h2" sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: `${pulseAnimation} 2s ease infinite`,
                lineHeight: 1
              }}>
                {recoveryTime?.primaryText}
              </Typography>
              
              {recoveryTime?.secondaryText && (
                <Chip 
                  label={`+ ${recoveryTime.secondaryText}`}
                  color="primary"
                  variant="outlined"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    px: 2,
                    py: 0.5,
                    borderWidth: 2,
                    '& .MuiChip-label': {
                      px: 1
                    }
                  }}
                />
              )}
            </Box>
            
            <Typography variant="body1" sx={{ 
              mt: 3,
              color: 'text.secondary',
              fontStyle: 'italic'
            }}>
              Based on your training data and profile
            </Typography>
          </Paper>
        </Grow>
      </Collapse>
      
      <Collapse in={!!error}>
        <Paper sx={{ 
          mt: 2,
          p: 3,
          borderRadius: 2,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #fff5f5 0%, #ffebee 100%)',
          borderLeft: '4px solid #ef4444'
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600,
            color: 'error.main',
            mb: 1
          }}>
            Prediction Error
          </Typography>
          <Typography color="error" sx={{ fontWeight: 500 }}>
            {error}
          </Typography>
        </Paper>
      </Collapse>
    </>
  );
}