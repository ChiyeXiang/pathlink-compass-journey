import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Welcome from "./pages/Welcome";
import Recommendations from "./pages/Recommendations";
import MentorDetail from "./pages/MentorDetail";
import MentorMarketplace from "./pages/MentorMarketplace";
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
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/mentor-detail" element={<MentorDetail />} />
          <Route path="/mentor-marketplace" element={<MentorMarketplace />} />
          <Route path="/coffee-chat" element={<CoffeeChat />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/mentor-registration" element={<MentorRegistration />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/mentor-setup" element={<MentorSetup />} />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
