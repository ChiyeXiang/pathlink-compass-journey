import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, User, FileText, ShoppingCart, ArrowLeft, LogOut, Settings, ChevronDown, Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface PageHeaderProps {
  showHomeButton?: boolean;
  showProfileButtons?: boolean;
  setIsLoggedIn?: (val: boolean) => void;
}

export const PageHeader = ({ 
  showHomeButton = true, 
  showProfileButtons = true ,
  setIsLoggedIn
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isAuthenticated } = useAuth();
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  
  const isHomePage = location.pathname === '/' || location.pathname === '/index';
  const isMentorRegistrationPage = location.pathname === '/mentor-registration';
  const isLoginPage = location.pathname === '/login';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (setIsLoggedIn) setIsLoggedIn(false);
    navigate('/');      
  };

  // 获取购物车商品数量
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItemCount(cart.length);
      } catch (error) {
        console.error('Error parsing cart data:', error);
        setCartItemCount(0);
      }
    };

    updateCartCount();
    
    // 监听购物车变化
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        updateCartCount();
      }
    };

    // 监听自定义事件
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdate', handleCartUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdate', handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    const handleCartAdded = () => {
      setShowCartNotification(true);
      setTimeout(() => setShowCartNotification(false), 5000);
    };

    window.addEventListener('cartAdded', handleCartAdded);
    return () => window.removeEventListener('cartAdded', handleCartAdded);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.settings-dropdown')) {
        setShowSettingsDropdown(false);
      }
    };

    if (showSettingsDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettingsDropdown]);

  return (
    <header className="flex items-center justify-between p-4 bg-background border-b border-border">
      {/* 左侧导航 */}
      <div className="flex items-center space-x-2">
        {isHomePage ? (
          // 首页显示logo
          <div className="flex items-center">
            <img 
              src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/20333cb4-3f98-418b-97b4-6084401c6291" 
              alt="Pathlink Logo" 
              className="h-8 w-auto"
            />
          </div>
        ) : (
          <>
            {!isMentorRegistrationPage && (
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
          </>
        )}
      </div>

      {/* 右侧按钮组 - 根据登录状态显示不同内容 */}
      {!isLoginPage && (
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
                        // 登录状态：显示导师广场/个人中心/购物车/设置/退出登录
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/mentor-square")}
                className="flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>导师广场</span>
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

              {/* 购物车按钮 */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/cart")}
                  className="flex items-center space-x-2 relative"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>购物车</span>
                  {cartItemCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </div>
                  )}
                </Button>
                {showCartNotification && (
                  <div className="absolute -top-10 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded shadow-lg animate-bounce">
                    已添加到购物车！
                  </div>
                )}
              </div>
                
              {/* Settings Button with Dropdown */}
              <div className="relative settings-dropdown">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                  className="flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>设置</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showSettingsDropdown ? 'rotate-180' : ''}`} />
                </Button>
                
                {showSettingsDropdown && (
                  <div className="absolute top-full mt-2 right-0 bg-background border border-border rounded-lg shadow-lg z-50 min-w-[160px]">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setShowSettingsDropdown(false);
                          navigate("/profile-setup");
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-accent transition-colors flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>个人信息</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowSettingsDropdown(false);
                          navigate("/mentor-registration");
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-accent transition-colors flex items-center space-x-2"
                      >
                        <FileText className="w-4 h-4" />
                        <span>切换到导师</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center space-x-2 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="w-4 h-4" />
                <span>退出登录</span>
              </Button>
            </>
          ) : (
            // 非登录状态：显示导师广场/成为导师/登录/开始匹配
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/mentor-square")}
                className="flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>导师广场</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/mentor-registration")}
                className="flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>成为导师</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate("/login")}
                className="flex items-center space-x-2"
              >
                <span>登录</span>
              </Button>
              
              <Button 
                size="sm" 
                onClick={() => navigate("/register")}
                className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-primary-foreground"
              >
                <span>开始匹配</span>
              </Button>
            </>
          )}
        </div>
      )}
    </header>
  );
};