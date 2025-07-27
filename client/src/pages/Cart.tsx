import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { PageHeader } from "@/components/ui/page-header";
import { Trash2, Plus, Minus, ShoppingCart, Gift } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const cartItems = [
    {
      id: "1",
      name: "【易烊千玺同款】金属笔记本支架",
      description: "一体碳素钢轻松升降 | 舒适视界...",
      price: 85,
      originalPrice: 129,
      image: "/placeholder.svg",
      discount: 44,
      quantity: 1,
      shop: "天猫 绿联数码旗舰店",
      coupon: "聚划算直降",
      couponValue: 4,
      shipping: "先用后付"
    },
    {
      id: "2", 
      name: "赛鲸站立式可升降电脑笔记本支架",
      description: "2.9kg | D8笔记本支架 (胡桃木色)",
      price: 299.9,
      originalPrice: 399,
      image: "/placeholder.svg",
      quantity: 1,
      shop: "超市 天猫超市·单品包邮",
      guarantee: "15天价保 24小时发 破损包退"
    },
    {
      id: "3",
      name: "强烈推荐站着办公的电脑升降桌",
      description: "每日限量10单！【唰石黑】单层气动...",
      price: 109,
      originalPrice: 175,
      image: "/placeholder.svg",
      quantity: 1,
      shop: "天猫 拜浦旗舰店",
      discount: 66,
      flashSale: true
    }
  ];

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleQuantityChange = (itemId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + change)
    }));
  };

  const getTotalPrice = () => {
    return cartItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.price * (quantities[item.id] || item.quantity), 0);
  };

  const getTotalDiscount = () => {
    return cartItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => {
        const discount = item.originalPrice - item.price;
        return total + discount * (quantities[item.id] || item.quantity);
      }, 0);
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) return;
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <PageHeader />
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <ShoppingCart className="w-6 h-6 mr-3 text-primary" />
          <h1 className="text-xl font-bold text-foreground">购物车 ({cartItems.length})</h1>
        </div>

        {/* Level Selection */}
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" size="sm" className="text-destructive border-destructive">
            <Trash2 className="w-4 h-4 mr-1" />
            超级立减
          </Button>
          <Button variant="outline" size="sm" className="text-warning border-warning">
            <Gift className="w-4 h-4 mr-1" />
            降价
          </Button>
          <Button variant="outline" size="sm">
            分组
          </Button>
          <Button variant="outline" size="sm">
            常购
          </Button>
          <Button variant="outline" size="sm">
            筛选
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
                  
                  <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-bold text-primary">¥{item.price}</span>
                          <span className="text-xs text-muted-foreground line-through">¥{item.originalPrice}</span>
                        </div>
                        
                        {item.coupon && (
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className="text-xs text-destructive border-destructive">
                              {item.coupon}
                            </Badge>
                            <span className="text-xs text-destructive">立减 {item.couponValue} 元</span>
                            <span className="text-xs text-muted-foreground">{item.shipping}</span>
                          </div>
                        )}
                        
                        {item.guarantee && (
                          <p className="text-xs text-muted-foreground mb-2">{item.guarantee}</p>
                        )}
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">优惠合计</span>
                          <span className="text-xs font-semibold text-destructive">
                            {item.discount || Math.round(item.originalPrice - item.price)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Button variant="ghost" size="sm" className="text-muted-foreground mb-2">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={(quantities[item.id] || item.quantity) <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-sm font-semibold min-w-8 text-center">
                            {quantities[item.id] || item.quantity}
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-accent rounded">本店活动</span>
                  <span className="ml-2">下单领券，可享满129减40店铺优惠券</span>
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
                  checked={selectedItems.length === cartItems.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedItems(cartItems.map(item => item.id));
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                />
                <span className="text-sm font-semibold">全选</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm">
                    <span className="text-muted-foreground">合后合计: </span>
                    <span className="text-2xl font-bold text-primary">¥{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    共减 ¥{getTotalDiscount().toFixed(0)} 直接明细
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="min-w-32"
                  onClick={handleCheckout}
                  disabled={selectedItems.length === 0}
                >
                  领券结算 ({selectedItems.length})
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