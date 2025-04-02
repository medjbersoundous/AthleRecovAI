import { useState, useEffect } from 'react';
import { 
  Box, Typography, TextField, Avatar, IconButton, Fade, Paper, CircularProgress, Collapse
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { 

  Cancel as CancelIcon,
  Height as HeightIcon,
  Scale as ScaleIcon,
  DirectionsRun as DirectionsRunIcon,
  Favorite as HeartIcon,
  SportsBasketball as PositionIcon
} from '@mui/icons-material';
import useAuthStore from '../../store/authStore';

interface ProfileState {
  fullName: string;
  age: number;
  heightCm: number;
  weightKg: number;
  gender: 'Male' | 'Female';
  position: 'Center' | 'Forward' | 'Guard';
  email: string;
}

export default function ProfileSection() {
  const { user, loading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileState | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (user?.athlete && !initialized) {
      setProfile({
        fullName: user.athlete.fullName,
        age: user.athlete.age,
        heightCm: user.athlete.heightCm,
        weightKg: user.athlete.weightKg,
        gender: user.athlete.gender,
        position: user.athlete.position,
        email: user.athlete.email
      });
      setInitialized(true);
    }
  }, [user, initialized]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev!,
      [name]: ['gender', 'position'].includes(name) ? value : Number(value),
    }));
  };

//   const handleSave = async () => {
//     if (!profile) return;
//     try {
//       await updateAthleteProfile({
//         fullName: profile.fullName,
//         age: profile.age,
//         heightCm: profile.heightCm,
//         weightKg: profile.weightKg,
//         gender: profile.gender,
//         position: profile.position,
//         email: profile.email
//       });
//       setIsEditing(false);
//     } catch (err) {
//       console.error('Profile update failed:', err);
//     }
//   };

  const handleCancel = () => {
    if (user?.athlete) {
      setProfile({
        fullName: user.athlete.fullName,
        age: user.athlete.age,
        heightCm: user.athlete.heightCm,
        weightKg: user.athlete.weightKg,
        gender: user.athlete.gender,
        position: user.athlete.position,
        email: user.athlete.email
      });
    }
    setIsEditing(false);
  };

  if (loading || !user || !profile) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  const initials = user.athlete.fullName 
    ? user.athlete.fullName.split(' ').map(n => n[0]).join('')
    : '';

    const avatarColor = user.athlete.gender === 'Male' ? 'primary.main' : 'secondary.main';

  return (
    <Box flex={1} sx={{ minHeight: '600px' }}> {/* Fixed height container */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Your Athlete Profile
        </Typography>
        {!isEditing ? (
          <IconButton onClick={() => setIsEditing(true)} color="primary">
            <RemoveRedEyeIcon />
          </IconButton>
        ) : (
          <Fade in={isEditing}>
            <Box>
              {/* <IconButton onClick={handleSave} color="success">
                <SaveIcon />
              </IconButton> */}
              <IconButton onClick={handleCancel} color="error">
                <CancelIcon />
              </IconButton>
            </Box>
          </Fade>
        )}
      </Box>
      
      {/* View Mode */}
      <Collapse in={!isEditing} timeout={500}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ 
              bgcolor: avatarColor, 
              mr: 2,
              color: 'white' 
            }}>
              {initials}
            </Avatar>
            <Typography>{user.athlete.fullName}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <HeartIcon color="action" sx={{ mr: 1 }} />
            <Typography>Age: {user.athlete.age}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <HeightIcon color="action" sx={{ mr: 1 }} />
            <Typography>Height: {user.athlete.heightCm} cm</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <ScaleIcon color="action" sx={{ mr: 1 }} />
            <Typography>Weight: {user.athlete.weightKg} kg</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <DirectionsRunIcon color="action" sx={{ mr: 1 }} />
            <Typography>Gender: {user.athlete.gender}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <PositionIcon color="action" sx={{ mr: 1 }} />
            <Typography>Position: {user.athlete.position}</Typography>
          </Box>
        </Paper>
      </Collapse>
      
      {/* Edit Mode */}
      <Collapse in={isEditing} timeout={500}>
        <Paper sx={{ p: 3, borderRadius: 2, mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Age"
            name="age"
            type="number"
            value={profile.age}
            onChange={handleChange}
            inputProps={{ min: 12, max: 100 }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Height (cm)"
            name="heightCm"
            type="number"
            value={profile.heightCm}
            onChange={handleChange}
            inputProps={{ min: 100, max: 250 }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Weight (kg)"
            name="weightKg"
            type="number"
            value={profile.weightKg}
            onChange={handleChange}
            inputProps={{ min: 30, max: 200 }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Gender"
            name="gender"
            select
            SelectProps={{ native: true }}
            value={profile.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            label="Position"
            name="position"
            select
            SelectProps={{ native: true }}
            value={profile.position}
            onChange={handleChange}
          >
            <option value="Center">Center</option>
            <option value="Forward">Forward</option>
            <option value="Guard">Guard</option>
          </TextField>
        </Paper>
      </Collapse>
    </Box>
  );
}