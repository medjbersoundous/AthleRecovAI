import { useState } from 'react';
import SideNav, { ActiveView } from "../components/Dashboard/SideNav";
import { Box } from "@mui/material";
import Header from "../components/Dashboard/Header";
import OverviewCard from "../components/Dashboard/OverviewCard";
import WorkoutChart from "../components/Dashboard/WorkoutChart";
import PredictionForm from "../components/Dashboard/PredictionForm";
import HistoryTable from "../components/Dashboard/HistoryTable";
import DashboardPage from '../components/Dashboard/DashboardComponent';
export default function Dashboard() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            <DashboardPage/>
          </>
        );
      case 'history':
        return <HistoryTable/>;
      case 'prediction':
        return <PredictionForm/>;
      default:
        return (
          <>
            <OverviewCard title="Heart Rate" value="72 bpm" />
            <OverviewCard title="Workout Duration" value="45 mins" />
            <WorkoutChart/>
          </>
        );
    }
  };

  return (
    <Box sx={{ 
      display: "flex", 
      height: "100vh", 
      overflow: "hidden" 
    }}>
      {/* Fixed SideNav */}
      <Box sx={{ 
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000
      }}>
        <SideNav activeView={activeView} setActiveView={setActiveView} />
      </Box>
      
      {/* Scrollable Content */}
      <Box sx={{ 
        flexGrow: 1,
        ml: "280px", // Match SideNav width
        height: "100vh",
        overflowY: "auto"
      }}>
        <Header />
        <Box sx={{ p: 3 }}>
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
}