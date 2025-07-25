import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, User, FileText, ShoppingCart, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface PageHeaderProps {
  showHomeButton?: boolean;
  showProfileButtons?: boolean;
}

export const PageHeader = ({ 
  showHomeButton = true, 
  showProfileButtons = true 
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCartNotification, setShowCartNotification] = useState(false);
  
  const isHomePage = location.pathname === '/' || location.pathname === '/index';

  useEffect(() => {
    const handleCartAdded = () => {
      setShowCartNotification(true);
      setTimeout(() => setShowCartNotification(false), 5000);
    };

    window.addEventListener('cartAdded', handleCartAdded);
    return () => window.removeEventListener('cartAdded', handleCartAdded);
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-background border-b border-border">
      <div className="flex items-center space-x-2">
        {!isHomePage && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回</span>
          </Button>
        )}
        {showHomeButton && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>首页</span>
          </Button>
        )}
      </div>

      {showProfileButtons && (
        <div className="flex items-center space-x-2 relative">
          <div className="relative">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/cart")}
              className="flex items-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>购物车</span>
            </Button>
            {showCartNotification && (
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-success text-success-foreground px-3 py-1 rounded-md text-sm whitespace-nowrap z-50">
                加购成功！
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-success rotate-45"></div>
              </div>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/tasks")}
            className="flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>个人中心</span>
          </Button>
        </div>
      )}
    </header>
  );
};