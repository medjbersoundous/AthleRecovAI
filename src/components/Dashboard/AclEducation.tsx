import { 
    Box, Typography, Slider, Paper, Tooltip, 
    Chip, Divider, styled 
  } from '@mui/material';
  import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
  import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
  
  interface ACLRiskSectionProps {
    value: number;
    onChange: (value: number) => void;
  }
  
  // Progressive color slider
  const ProgressiveSlider = styled(Slider)(({ value }: { value: number }) => {
    const color = `hsl(${120 * (1 - value/10)}, 100%, 50%)`; // Green (0) to Red (10)
    return {
      color,
      height: 8,
      '& .MuiSlider-thumb': {
        backgroundColor: color,
        '&:hover': {
          boxShadow: `0 0 0 8px ${color}33`,
        },
      },
      '& .MuiSlider-rail': {
        backgroundColor: '#ebebeb',
      },
    };
  });
  
  export const ACLRiskSection = ({ value, onChange }: ACLRiskSectionProps) => {
    const riskLevel = value >= 8 ? 'High' : value >= 5 ? 'Moderate' : 'Low';
    const riskColor = value >= 8 ? 'error' : value >= 5 ? 'warning' : 'info';
  
    return (
      <Box>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 1 }}>
              ACL Risk Score (1-10)
            </Typography>
            <Tooltip title={
              <Box sx={{ p: 1 }}>
                <Typography variant="body2">
                  Measures susceptibility to ACL injuries based on:
                </Typography>
                <ul>
                  <li>Training intensity</li>
                  <li>Movement patterns</li>
                  <li>Previous injuries</li>
                  <li>Biomechanics</li>
                </ul>
              </Box>
            }>
              <HelpOutlineIcon fontSize="small" color="action" />
            </Tooltip>
          </Box>
          
          <ProgressiveSlider
            value={value}
            onChange={(_e, val) => onChange(val as number)}
            min={1}
            max={10}
            step={1}
            marks={[
              { value: 1, label: '1' },
              { value: 5, label: '5' },
              { value: 10, label: '10' }
            ]}
            valueLabelDisplay="auto"
            sx={{ mt: 3 }}
          />
        </Paper>
  
        {/* Education Panel */}
        <Paper elevation={0} sx={{ 
          p: 2, 
          mt: 2, 
          backgroundColor: '#f8f9fa',
          borderLeft: `4px solid ${riskColor === 'error' ? '#ff4757' : riskColor === 'warning' ? '#ffa502' : '#2e86de'}`
        }}>
          <Box display="flex" alignItems="center" mb={1}>
            <MedicalInformationIcon color={riskColor} sx={{ mr: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              ACL Risk Analysis
            </Typography>
            <Chip 
              label={`${riskLevel} Risk`} 
              color={riskColor} 
              size="small" 
              sx={{ ml: 1, fontWeight: 600 }}
            />
          </Box>
          
          <Typography variant="body2" paragraph>
            The <strong>Anterior Cruciate Ligament (ACL)</strong> stabilizes your knee during:
          </Typography>
          <ul style={{ paddingLeft: 20, marginTop: 0 }}>
            <li><Typography variant="body2">Sudden stops/direction changes</Typography></li>
            <li><Typography variant="body2">Jump landings</Typography></li>
            <li><Typography variant="body2">Pivoting movements</Typography></li>
          </ul>
  
          <Divider sx={{ my: 2 }} />
  
          {value >= 8 ? (
            <>
              <Typography color="error" variant="body2" fontWeight={500}>
                Recommended Precautions:
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                <li><Typography variant="body2">Incorporate plyometric training</Typography></li>
                <li><Typography variant="body2">Focus on hamstring strengthening</Typography></li>
                <li><Typography variant="body2">Avoid sudden pivots during recovery</Typography></li>
              </ul>
            </>
          ) : value >= 5 ? (
            <Typography variant="body2">
              Maintain proper landing mechanics and consider neuromuscular training.
            </Typography>
          ) : (
            <Typography variant="body2">
              Your current training profile shows normal ACL stress levels.
            </Typography>
          )}
        </Paper>
      </Box>
    );
  };