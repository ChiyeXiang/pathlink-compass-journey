import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { PageHeader } from "@/components/ui/page-header";
import { Trash2, ShoppingCart, User, Clock, DollarSign, ArrowRight } from "lucide-react";

interface CartItem {
  id: string;
  type: 'service';
  name: string;
  price: number;
  mentor: string;
  description?: string;
  duration?: string;
  sessions?: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 从 localStorage 读取购物车数据
  useEffect(() => {
    const loadCartItems = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cart);
      } catch (error) {
        console.error('Error loading cart data:', error);
        setCartItems([]);
      }
    };

    loadCartItems();
    
    // 监听购物车变化
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        loadCartItems();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // 触发购物车更新事件
    window.dispatchEvent(new CustomEvent('cartUpdate'));
  };

  const getTotalPrice = () => {
    return cartItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) return;
    
    // 保存选中的商品到 localStorage
    const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
    localStorage.setItem('checkoutItems', JSON.stringify(selectedCartItems));
    
    navigate('/payment');
  };

  const handleClearCart = () => {
    setCartItems([]);
    setSelectedItems([]);
    localStorage.removeItem('cart');
    
    // 触发购物车更新事件
    window.dispatchEvent(new CustomEvent('cartUpdate'));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <PageHeader />
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <ShoppingCart className="w-6 h-6 mr-3 text-primary" />
            <h1 className="text-xl font-bold text-foreground">购物车</h1>
          </div>

          <Card className="shadow-soft border-0">
            <CardContent className="p-12 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold text-foreground mb-2">购物车是空的</h2>
              <p className="text-muted-foreground mb-6">快去导师广场选择心仪的服务吧！</p>
              <Button onClick={() => navigate('/mentor-square')}>
                去导师广场
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <PageHeader />
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <ShoppingCart className="w-6 h-6 mr-3 text-primary" />
            <h1 className="text-xl font-bold text-foreground">购物车 ({cartItems.length})</h1>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClearCart}
            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            清空购物车
          </Button>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <Card key={item.id} className="shadow-soft border-0">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Checkbox 
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleSelectItem(item.id)}
                  />
                  
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          导师：{item.mentor}
                        </p>
                        {item.description && (
                          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        )}
                        
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {item.duration || '根据服务内容'}
                            </span>
                          </div>
                          {item.sessions && (
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {item.sessions} 次服务
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-primary">¥{item.price}</span>
                          <Badge variant="outline" className="text-xs text-primary border-primary">
                            导师服务
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Checkout Section */}
        <Card className="shadow-soft border-0 sticky bottom-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox 
                  checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedItems(cartItems.map(item => item.id));
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                />
                <span className="text-sm font-semibold">全选</span>
                <span className="text-sm text-muted-foreground">
                  已选择 {selectedItems.length} 项服务
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm">
                    <span className="text-muted-foreground">总计: </span>
                    <span className="text-2xl font-bold text-primary">¥{getTotalPrice().toFixed(0)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    含专业导师服务费
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="min-w-32"
                  onClick={handleCheckout}
                  disabled={selectedItems.length === 0}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  立即支付 ({selectedItems.length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;