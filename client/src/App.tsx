import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { GameProvider } from "./contexts/GameContext";
import { TourProvider } from "./contexts/TourContext";
import { DesignModeProvider } from "./contexts/DesignModeContext";

import Configurations from "./screens/Configurations";
import LandingForgotPassword from "./screens/ForgotPassword";
import LandingOtpVerification from "./screens/LandingVerification";
import LandingResetPassword from "./screens/LandingResetPassword";
import NotFound from "@/screens/not-found";
import LandingLogin from "@/screens/LandingLogin";
import SuperAdminDashboard from "@/screens/SuperAdminDashboard";
import UserManagement from "@/screens/UserManagement";
import ScenarioPlanning from "@/screens/ScenarioPlanning";
import ScenarioRetreat from "@/screens/ScenarioRetreat";
import ReportsLibrary from "@/screens/ReportsLibrary";
import Settings from "@/screens/Settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingLogin} />
      <Route path="/forgot" component={LandingForgotPassword} />
      <Route path="/verify" component={LandingOtpVerification} />
      <Route path="/reset" component={LandingResetPassword} />

      {/* Super Admin Routes */}
      <Route path="/dashboard" component={SuperAdminDashboard} />
      <Route path="/users" component={UserManagement} />
      <Route path="/scenarios" component={ScenarioPlanning} />
      <Route path="/retreats" component={ScenarioRetreat} />
      <Route path="/reports" component={ReportsLibrary} />
      <Route path="/configuration" component={Configurations} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <GameProvider>
            <TourProvider>
              <DesignModeProvider>
                <TooltipProvider>
                  <Toaster />
                  <Router />
                </TooltipProvider>
              </DesignModeProvider>
            </TourProvider>
          </GameProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
