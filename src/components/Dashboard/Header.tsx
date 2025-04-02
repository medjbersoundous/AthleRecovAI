import { Box, Typography, CircularProgress, useTheme, Fade } from "@mui/material";
import useAuthStore from "../../store/authStore";
import { useEffect, useState } from "react";

export default function Header() {
  const theme = useTheme();
  const { user, loading, initializeAuth } = useAuthStore();
  const [currentDate, setCurrentDate] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("Welcome");
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    // Update date and greeting (no need to wait for auth check)
    const now = new Date();
    const formattedDate = now.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(formattedDate);

    const hours = now.getHours();
    const timeGreeting = hours < 12 ? "Good Morning" :
                        hours < 18 ? "Good Afternoon" : "Good Evening";
    setGreeting(timeGreeting);

    // Check if we need to verify auth state
    const checkAuth = async () => {
      try {
        // Only call initializeAuth if we don't have a user but might have a token
        if (!user && localStorage.getItem('token')) {
          await initializeAuth();
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [initializeAuth, user]);

  // Show loading state only if we're actually checking auth AND don't have a user yet
  const showLoading = (loading || isCheckingAuth) && !user;

  if (showLoading) {
    return (
      <Box sx={{ 
        padding: 3,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 120,
        boxShadow: theme.shadows[2],
        transition: "all 0.3s ease",
      }}>
        <Fade in={true} style={{ transitionDelay: '200ms' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CircularProgress color="inherit" size={28} thickness={4} />
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Loading your dashboard...
            </Typography>
          </Box>
        </Fade>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      padding: 3,
      backgroundColor: theme.palette.primary.main,
      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
      color: theme.palette.primary.contrastText,
      textAlign: "center",
      boxShadow: theme.shadows[3],
      transition: "all 0.3s ease",
      '&:hover': {
        boxShadow: theme.shadows[5],
      }
    }}>
      <Fade in={true}>
        <Box>
          <Typography variant="h4" sx={{ 
            fontWeight: 700,
            letterSpacing: '0.5px',
            mb: 0.5,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {greeting}, {user?.athlete?.fullName || "Athlete"}
          </Typography>
          
          <Typography variant="subtitle1" sx={{ 
            fontSize: "1rem",
            opacity: 0.9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            '&:before, &:after': {
              content: '""',
              flex: 1,
              borderBottom: `1px solid rgba(255,255,255,0.2)`,
            },
            '&:before': {
              mr: 1,
            },
            '&:after': {
              ml: 1,
            }
          }}>
            {currentDate}
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
}