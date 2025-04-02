import { 
    Box, Grid, Typography, Paper, Divider, Chip, 
    LinearProgress, styled, 
    Tooltip
  } from '@mui/material';
  import { 
    FitnessCenter as TrainingIcon,
    CalendarToday as CalendarIcon,
    AccessTime as RecoveryIcon,
    TrendingUp as ProgressIcon,
    Person as AthleteIcon,
    EmojiEvents as AchievementIcon,
    Person
  } from '@mui/icons-material';
  import useAuthStore from '../../store/authStore';
  
  // Styled metric card
  const MetricCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 16,
    height: '100%',
    background: 'linear-gradient(145deg, #f6f9fc, #eef2f5)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
    }
  }));
  
  export default function DashboardPage() {
    // Sample data - replace with your actual data
    const athleteStats = {
      name: "Medjber Soundous",
      trainingLoad: 72,
      recoveryScore: 68,
      weeklyHours: 14,
      injuryRisk: 'Low',
      upcomingMatches: 2,
      lastRecoveryPrediction: 1.5
    };
    const { user } = useAuthStore();
    if (!user?.athlete) {
        console.error('No athlete data available');
        return;
      }
    const athleteData = {
        fullName:user.athlete.fullName,
        Age: user.athlete.age,
        Height_cm: user.athlete.heightCm,
        Weight_kg: user.athlete.weightKg,
        position:user.athlete.position,
        Gender: user.athlete.gender.toLowerCase() as 'male' | 'female',
      };
  
    const formatRecoveryTime = (days: number) => {
      if (days >= 1) {
        const fullDays = Math.floor(days);
        const remainingHours = Math.round((days - fullDays) * 24);
        return `${fullDays}d ${remainingHours}h`;
      }
      return `${Math.round(days * 24)}h`;
    };
  
    return (
      <Box sx={{ p: 3 }}>
        {/* Header */}
      
        <Box sx={{ mb: 4 }} >
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Athlete Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Overview of your training performance and recovery metrics
          </Typography>
        </Box>
        {/* Main Grid */}
        <Grid container spacing={4}>
          {/* Athlete Summary */}
          <Grid item xs={12} md={4}>
            <MetricCard>
              <Box display="flex" alignItems="center" mb={3}>
                <AthleteIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" fontWeight={600}>
                  {athleteData.fullName}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Position</Typography>
                  <Typography variant="h6">{athleteData.position}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Team</Typography>
                  <Typography variant="h6">A-Team</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Age</Typography>
                  <Typography variant="h6">{athleteData.Age}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Height</Typography>
                  <Typography variant="h6">{athleteData.Height_cm}</Typography>
                </Grid>
              </Grid>
            </MetricCard>
          </Grid>
  
          {/* Training Load */}
          <Tooltip title="Coming Soon" arrow> 
          <Grid item xs={12} md={4} sx={{ opacity:0.6, cursor:'not-allowed'}}>
            <MetricCard>
              <Box display="flex" alignItems="center" mb={3}>
                <TrainingIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" fontWeight={600}>
                  Training Load
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h3" fontWeight={800} sx={{ mr: 2 }}>
                  {athleteStats.trainingLoad}
                </Typography>
                <Chip 
                  label={athleteStats.trainingLoad > 75 ? 'High' : 'Moderate'} 
                  color={athleteStats.trainingLoad > 75 ? 'warning' : 'success'} 
                  size="small" 
                />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={athleteStats.trainingLoad} 
                sx={{ 
                  height: 8,
                  borderRadius: 4,
                  mb: 2,
                  '.MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
                  }
                }} 
              />
              <Typography variant="body2" color="text.secondary">
                {athleteStats.weeklyHours} hours this week
              </Typography>
            </MetricCard>
          </Grid>
          </Tooltip>
          {/* Recovery Status */}
          <Tooltip title="Coming Soon" arrow> 
          <Grid item xs={12} md={4} sx={{cursor:'not-allowed', opacity:0.6}}>
            <MetricCard sx={{
              background: `linear-gradient(135deg, #f0f9ff, #e0f2fe)`,
              border: '1px solid #e0f2fe'
            }}>
              <Box display="flex" alignItems="center" mb={3}>
                <RecoveryIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" fontWeight={600}>
                  Recovery Status
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h3" fontWeight={800} sx={{ mr: 2 }}>
                  {athleteStats.recoveryScore}%
                </Typography>
                <Chip 
                  label={athleteStats.recoveryScore > 70 ? 'Optimal' : 'Monitor'} 
                  color={athleteStats.recoveryScore > 70 ? 'success' : 'warning'} 
                  size="small" 
                />
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Last recovery prediction: {formatRecoveryTime(athleteStats.lastRecoveryPrediction)}
              </Typography>
              <Typography variant="body2" sx={{ color: '#3b82f6', fontWeight: 500 }}>
                {athleteStats.injuryRisk} injury risk
              </Typography>
            </MetricCard>
          </Grid>
          </Tooltip>
          {/* Recent Performance */}
          {/* <Grid item xs={12} md={6}>
            <MetricCard sx={{
              background: `linear-gradient(135deg, #f5f3ff, #ede9fe)`
            }}>
              <Box display="flex" alignItems="center" mb={3}>
                <ProgressIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" fontWeight={600}>
                  Performance Trend
                </Typography>
              </Box>
              <Box sx={{ 
                height: 200, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundImage: 'url("/performance-chart-placeholder.svg")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}>
                <Typography variant="body2" color="text.secondary">
                  Performance chart visualization
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                +12% improvement over last month
              </Typography>
            </MetricCard>
          </Grid> */}
  
          {/* Upcoming Schedule */}
          {/* <Grid item xs={12} md={6}>
            <MetricCard sx={{
              background: `linear-gradient(135deg, #fff7ed, #ffedd5)`
            }}>
              <Box display="flex" alignItems="center" mb={3}>
                <CalendarIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" fontWeight={600}>
                  Upcoming Schedule
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Next Match
                </Typography>
                <Typography>
                  Saturday, Nov 12 • 3:00 PM
                </Typography>
              
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Training Sessions
                </Typography>
                <Typography>
                  {athleteStats.upcomingMatches} scheduled this week
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Next session: Tomorrow 9:00 AM
                </Typography>
              </Box>
            </MetricCard>
          </Grid> */}
  
          {/* Quick Actions */}
          <Tooltip title="Coming Soon" arrow>
          <Grid item xs={12} sx={{ cursor: 'not-allowed', opacity:0.6, }}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 4,
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              color: 'white'
            }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
                    }
                  }}>
                    <AchievementIcon sx={{ mb: 1, color: '#3b82f6' }} />
                    <Typography>Log Session</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
                    }
                  }}>
                    <ProgressIcon sx={{ mb: 1, color: '#3b82f6' }} />
                    <Typography>Performance</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
                    }
                  }}>
                    <CalendarIcon sx={{ mb: 1, color: '#3b82f6' }} />
                    <Typography>Match Agenda</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
                    }
                  }}>
                    <Person sx={{ mb: 1, color: '#3b82f6' }} />
                    <Typography>Update Profile</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          </Tooltip>
        </Grid>
      </Box>
    );
  }