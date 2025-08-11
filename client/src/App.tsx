import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Welcome from "./pages/Welcome";
import MentorDetail from "./pages/MentorDetail";
import MentorChain from "./pages/MentorChain";
import CoffeeChat from "./pages/CoffeeChat";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import BookingSuccess from "./pages/BookingSuccess";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import MentorRegistration from "./pages/MentorRegistration";
import ProfileSetup from "./pages/ProfileSetup";
import MentorSetup from "./pages/MentorSetup";
import MentorDashboard from "./pages/MentorDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LelandLandingPage from "./pages/LelandLandingPage";
import MentorSquare from "./pages/MentorSquare";

// Mentor Setup Pages
import BasicInfo from "./pages/mentor-setup/BasicInfo";
import Education from "./pages/mentor-setup/Education";
import WorkExperience from "./pages/mentor-setup/WorkExperience";
import CoachingCategory from "./pages/mentor-setup/CoachingCategory";
import ProgramSelection from "./pages/mentor-setup/ProgramSelection";
import CoachingServices from "./pages/mentor-setup/CoachingServices";
import Experience from "./pages/mentor-setup/Experience";
import FinalQuestions from "./pages/mentor-setup/FinalQuestions";
import PhoneNumber from "./pages/mentor-setup/PhoneNumber";
import MentorQuestionsDone from "./pages/mentor-setup/MentorQuestionsDone";
import TestNavigation from "./pages/mentor-setup/TestNavigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* 公开路由 - 不需要登录 */}
            <Route path="/" element={<LelandLandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mentor-square" element={<MentorSquare />} />
            <Route path="/mentor-registration" element={<MentorRegistration />} />
            
            {/* 受保护的路由 - 需要登录 */}
            <Route path="/welcome" element={
              <ProtectedRoute>
                <Welcome />
              </ProtectedRoute>
            } />
            <Route path="/mentor-detail" element={
              <ProtectedRoute>
                <MentorDetail />
              </ProtectedRoute>
            } />
            <Route path="/mentor-chain" element={
              <ProtectedRoute>
                <MentorChain />
              </ProtectedRoute>
            } />
            <Route path="/coffee-chat" element={
              <ProtectedRoute>
                <CoffeeChat />
              </ProtectedRoute>
            } />
            <Route path="/tasks" element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/booking-success" element={
              <ProtectedRoute>
                <BookingSuccess />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/payment" element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            } />
            <Route path="/payment-success" element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            } />
            <Route path="/profile-setup" element={
              <ProtectedRoute>
                <ProfileSetup />
              </ProtectedRoute>
            } />
            <Route path="/mentor-setup" element={
              <ProtectedRoute>
                <MentorSetup />
              </ProtectedRoute>
            } />
            <Route path="/mentor-dashboard" element={
              <ProtectedRoute>
                <MentorDashboard />
              </ProtectedRoute>
            } />
            
            {/* Mentor Setup 子页面路由 */}
            <Route path="/mentor-setup/basic-info" element={
              <ProtectedRoute>
                <BasicInfo />
              </ProtectedRoute>
            } />
            <Route path="/mentor-setup/education" element={
              <ProtectedRoute>
                <Education />
              </ProtectedRoute>
            } />
            <Route path="/mentor-setup/work-experience" element={
              <ProtectedRoute>
                <WorkExperience />
              </ProtectedRoute>
            } />
            <Route path="/mentor-setup/coaching-category" element={
              <ProtectedRoute>
                <CoachingCategory />
              </ProtectedRoute>
            } />
            <Route path="/mentor-setup/program-selection" element={
              <ProtectedRoute>
                <ProgramSelection />
              </ProtectedRoute>
            } />
            <Route path="/mentor-setup/coaching-services" element={
              <ProtectedRoute>
                <CoachingServices />
              </ProtectedRoute>
            } />
            <Route path="/mentor-setup/experience" element={
              <ProtectedRoute>
                <Experience />
              </ProtectedRoute>
            } />
            <Route path="/mentor-setup/final-questions" element={
              <ProtectedRoute>
                <FinalQuestions />
              </ProtectedRoute>
            } />
            <Route path="/mentor-setup/phone-number" element={
              <ProtectedRoute>
                <PhoneNumber />
              </ProtectedRoute>
            } />
            <Route path="/mentor-setup/mentor-questions-done" element={
              <ProtectedRoute>
                <MentorQuestionsDone />
              </ProtectedRoute>
            } />
            <Route path="/mentor-setup/test" element={
              <ProtectedRoute>
                <TestNavigation />
              </ProtectedRoute>
            } />
            
            {/* 404页面 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
