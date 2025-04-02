import { 
  Box, Typography, TextField, Button, Paper, Slider, 
  Grow, Fade, Collapse, styled, CircularProgress 
} from '@mui/material';
import { useState } from 'react';
import usePredictionStore from '../../store/PredictionStore';
import useAuthStore from '../../store/authStore';

interface TrainingFormProps {
  setShowResult: (value: boolean) => void;
  handleReset: () => void;
}

// Function to calculate gradient color based on value
const getSliderColor = (value: number) => {
  const ratio = value / 100; // Normalized to 0-100 range
  const red = Math.floor(50 + (205 * ratio));
  const green = Math.floor(150 - (150 * ratio));
  const blue = Math.floor(255 - (155 * ratio));
  return `rgb(${red}, ${green}, ${blue})`;
};

const ProgressiveSlider = styled(Slider)(({ value }: { value: number }) => {
  const color = getSliderColor(value);
  return {
    color: color,
    height: 8,
    '& .MuiSlider-thumb': {
      backgroundColor: color,
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0 0 0 8px ${color}33`,
      },
    },
    '& .MuiSlider-rail': {
      backgroundColor: `${color}40`,
    },
  };
});

export default function TrainingForm({ 
  setShowResult,
  handleReset 
}: TrainingFormProps) {
  const [inputData, setInputData] = useState({
    Training_Intensity: 5,
    Training_Hours_Per_Week: 10,
    Match_Count_Per_Week: 2,
    Rest_Between_Events_Days: 2,
    Fatigue_Score: 5,
    Performance_Score: 8,
    Team_Contribution_Score: 7,
    Load_Balance_Score: 80, // Changed to 0-100 scale
    ACL_Risk_Score: 20,     // Changed to 0-100 scale
    Injury_Indicator: 0
  });

  const { user } = useAuthStore();
  const { predictRecoveryTime, resetPrediction, loading } = usePredictionStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSliderChange = (name: string) => (_e: Event, value: number | number[]) => {
    setInputData(prev => ({ ...prev, [name]: value as number }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(false);
    
    if (!user?.athlete) {
      console.error('No athlete data available');
      return;
    }
    
    // Prepare user data (first argument)
    const userData = {
      Age: user.athlete.age,
      Height_cm: user.athlete.heightCm,
      Weight_kg: user.athlete.weightKg,
      Gender: user.athlete.gender.toLowerCase() as 'male' | 'female',
    };
  
    // Prepare training data (second argument)
    const trainingData = {
      Training_Intensity: inputData.Training_Intensity,
      Training_Hours_Per_Week: inputData.Training_Hours_Per_Week,
      Match_Count_Per_Week: inputData.Match_Count_Per_Week,
      Rest_Between_Events_Days: inputData.Rest_Between_Events_Days,
      Fatigue_Score: inputData.Fatigue_Score,
      Performance_Score: inputData.Performance_Score,
      Team_Contribution_Score: inputData.Team_Contribution_Score,
      Load_Balance_Score: inputData.Load_Balance_Score,
      ACL_Risk_Score: inputData.ACL_Risk_Score,
      Injury_Indicator: inputData.Injury_Indicator
    };
  
    console.log('Form data being submitted:', {
      userData,
      trainingData
    });
  
    try {
      const predictionDays = await predictRecoveryTime(userData, trainingData);
      console.log('Prediction successful. Days:', predictionDays);
      setShowResult(true);
    } catch (error) {
      console.error('Prediction failed:', error);
      setShowResult(false);
    }
  };

  const handleFormReset = () => {
    setInputData({
      Training_Intensity: 5,
      Training_Hours_Per_Week: 10,
      Match_Count_Per_Week: 2,
      Rest_Between_Events_Days: 2,
      Fatigue_Score: 5,
      Performance_Score: 8,
      Team_Contribution_Score: 7,
      Load_Balance_Score: 80,
      ACL_Risk_Score: 20,
      Injury_Indicator: 0
    });
    resetPrediction();
    handleReset();
  };

  return (
    <Box flex={1} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Training Information
      </Typography>
      
      <Grow in={true} timeout={600}>
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography gutterBottom sx={{ mb: 2 }}>
            Training Intensity 
          </Typography>
          <ProgressiveSlider
            value={inputData.Training_Intensity}
            onChange={handleSliderChange('Training_Intensity')}
            min={1}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
          />
        </Paper>
      </Grow>
      
      <Fade in={true} timeout={800}>
        <TextField
          fullWidth
          margin="normal"
          label="Training Hours Per Week"
          name="Training_Hours_Per_Week"
          type="number"
          value={inputData.Training_Hours_Per_Week}
          onChange={handleChange}
          inputProps={{ min: 0, max: 40 }}
        />
      </Fade>
      
      <Fade in={true} timeout={1000}>
        <TextField
          fullWidth
          margin="normal"
          label="Match Count Per Week"
          name="Match_Count_Per_Week"
          type="number"
          value={inputData.Match_Count_Per_Week}
          onChange={handleChange}
          inputProps={{ min: 0, max: 7 }}
        />
      </Fade>
      
      <Fade in={true} timeout={1200}>
        <TextField
          fullWidth
          margin="normal"
          label="Rest Between Events (Days)"
          name="Rest_Between_Events_Days"
          type="number"
          value={inputData.Rest_Between_Events_Days}
          onChange={handleChange}
          inputProps={{ min: 0, max: 7 }}
        />
      </Fade>
      
      <Grow in={true} timeout={1400}>
        <Paper elevation={2} sx={{ p: 3, mb: 3, mt: 2, borderRadius: 2 }}>
          <Typography gutterBottom sx={{ mb: 2 }}>
            Fatigue Score 
          </Typography>
          <ProgressiveSlider
            value={inputData.Fatigue_Score}
            onChange={handleSliderChange('Fatigue_Score')}
            min={1}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
          />
        </Paper>
      </Grow>
      
      <Grow in={true} timeout={1600}>
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography gutterBottom sx={{ mb: 2 }}>
            Performance Score 
          </Typography>
          <ProgressiveSlider
            value={inputData.Performance_Score}
            onChange={handleSliderChange('Performance_Score')}
            min={1}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
          />
        </Paper>
      </Grow>
      
      <Grow in={true} timeout={1800}>
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography gutterBottom sx={{ mb: 2 }}>
            Team Contribution Score 
          </Typography>
          <ProgressiveSlider
            value={inputData.Team_Contribution_Score}
            onChange={handleSliderChange('Team_Contribution_Score')}
            min={1}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
          />
        </Paper>
      </Grow>
      
      <Grow in={true} timeout={2000}>
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography gutterBottom sx={{ mb: 2 }}>
            Load Balance Score 
          </Typography>
          <ProgressiveSlider
            value={inputData.Load_Balance_Score}
            onChange={handleSliderChange('Load_Balance_Score')}
            min={0}
            max={100}
            step={1}
            valueLabelDisplay="auto"
          />
        </Paper>
      </Grow>
      
      <Grow in={true} timeout={2200}>
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography gutterBottom sx={{ mb: 2 }}>
            ACL Risk Score "Anterior Cruciate Ligament"
          </Typography>
          <ProgressiveSlider
            value={inputData.ACL_Risk_Score}
            onChange={handleSliderChange('ACL_Risk_Score')}
            min={0}
            max={100}
            step={1}
            valueLabelDisplay="auto"
          />
        </Paper>
      </Grow>
      
      <Collapse in={true} timeout={2400}>
        <Box display="flex" gap={2} mt={4}>
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth
            disabled={loading}
            sx={{
              py: 1.5,
              fontWeight: 600,
              fontSize: '1rem',
              background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
              '&:hover': {
                background: 'linear-gradient(90deg, #2563eb, #4f46e5)'
              }
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={24} sx={{ color: 'white', mr: 2 }} />
                Predicting...
              </>
            ) : 'Predict Recovery Time'}
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleFormReset}
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: 600,
              fontSize: '1rem',
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2
              }
            }}
          >
            Reset
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
}