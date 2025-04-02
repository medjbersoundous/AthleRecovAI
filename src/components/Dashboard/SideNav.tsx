import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  Chip,
} from "@mui/material";
import { Home, History, Logout, Insights } from "@mui/icons-material";

export type ActiveView = "dashboard" | "history" | "prediction";

interface SideNavProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

export default function SideNav({ activeView, setActiveView }: SideNavProps) {
  const theme = useTheme();

  const handleNavigation = (view: "dashboard" | "history" | "prediction") => {
    if (view === "history") return; // Disable navigation for history
    setActiveView(view);
  };

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        backgroundColor: theme.palette.background.paper,
        boxShadow: "4px 0 10px -5px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          marginBottom: 4,
          color: theme.palette.primary.main,
          fontWeight: "bold",
          letterSpacing: "0.5px",
          padding: "0 16px",
        }}
      >
        Athlete Dashboard
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <List sx={{ flex: 1, padding: "0 16px" }}>
        <ListItemButton
          selected={activeView === "dashboard"}
          onClick={() => handleNavigation("dashboard")}
          sx={{
            borderRadius: "8px",
            marginBottom: "4px",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            "&.Mui-selected": {
              backgroundColor: theme.palette.action.selected,
            },
          }}
        >
          <ListItemIcon
            sx={{ minWidth: "40px", color: theme.palette.text.primary }}
          >
            <Home />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{
              fontWeight: "medium",
              fontSize: "0.95rem",
            }}
          />
        </ListItemButton>
        <ListItemButton
          selected={activeView === "prediction"}
          onClick={() => handleNavigation("prediction")}
          sx={{
            borderRadius: "8px",
            marginBottom: "4px",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            "&.Mui-selected": {
              backgroundColor: theme.palette.action.selected,
            },
          }}
        >
          <ListItemIcon
            sx={{ minWidth: "40px", color: theme.palette.text.primary }}
          >
            <Insights />
          </ListItemIcon>
          <ListItemText
            primary="Recovery Time Prediction"
            primaryTypographyProps={{
              fontWeight: "medium",
              fontSize: "0.95rem",
            }}
          />
        </ListItemButton>

        <ListItemButton
          disabled
          sx={{
            borderRadius: "8px",
            marginBottom: "4px",
            opacity: 0.7,
            cursor: "not-allowed",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <ListItemIcon
            sx={{ minWidth: "40px", color: theme.palette.text.disabled }}
          >
            <History />
          </ListItemIcon>
          <ListItemText
            primary="Recovery History"
            primaryTypographyProps={{
              fontWeight: "medium",
              fontSize: "0.95rem",
              color: theme.palette.text.disabled,
            }}
          />
          <Chip
            label="Coming Soon"
            size="small"
            sx={{
              ml: 1,
              fontSize: "0.65rem",
              height: "20px",
              bgcolor: theme.palette.grey[300],
              color: theme.palette.grey[700],
            }}
          />
        </ListItemButton>
        <ListItemButton
          disabled
          sx={{
            borderRadius: "8px",
            marginBottom: "4px",
            opacity: 0.7,
            cursor: "not-allowed",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <ListItemIcon
            sx={{ minWidth: "40px", color: theme.palette.text.disabled }}
          >
            <History />
          </ListItemIcon>
          <ListItemText
            primary="Match Agenda"
            primaryTypographyProps={{
              fontWeight: "medium",
              fontSize: "0.95rem",
              color: theme.palette.text.disabled,
            }}
          />
          <Chip
            label="Coming Soon"
            size="small"
            sx={{
              ml: 1,
              fontSize: "0.65rem",
              height: "20px",
              bgcolor: theme.palette.grey[300],
              color: theme.palette.grey[700],
            }}
          />
        </ListItemButton>

       
      </List>

      <Divider sx={{ marginBottom: 2 }} />

      <List sx={{ padding: "0 16px" }}>
        <ListItemButton
          sx={{
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: theme.palette.error.light,
              color: theme.palette.error.contrastText,
              "& .MuiListItemIcon-root": {
                color: theme.palette.error.contrastText,
              },
            },
          }}
        >
          <ListItemIcon
            sx={{ minWidth: "40px", color: theme.palette.error.main }}
          >
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontWeight: "medium",
              fontSize: "0.95rem",
            }}
          />
        </ListItemButton>
      </List>
    </Box>
  );
}