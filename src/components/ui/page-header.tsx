import { Button } from "@/components/ui/button";
import { Home, User, FileText, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  showHomeButton?: boolean;
  showProfileButtons?: boolean;
}

export const PageHeader = ({ 
  showHomeButton = true, 
  showProfileButtons = true 
}: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 bg-background border-b border-border">
      <div className="flex items-center">
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
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/cart")}
            className="flex items-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>购物车</span>
          </Button>
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