import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { CreditCard, Smartphone, QrCode, Shield, Clock } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("alipay");
  const [isProcessing, setIsProcessing] = useState(false);

  const orderInfo = {
    total: 384.90,
    discount: 44,
    items: [
      { name: "精准选校咨询", price: 1299 },
      { name: "核心文书共创", price: 2599 },
      { name: "推荐信策略设计", price: 899 }
    ]
  };

  const paymentMethods = [
    {
      id: "alipay",
      name: "支付宝",
      icon: <Smartphone className="w-5 h-5" />,
      description: "推荐使用支付宝快捷支付"
    },
    {
      id: "wechat",
      name: "微信支付",
      icon: <QrCode className="w-5 h-5" />,
      description: "使用微信扫码支付"
    },
    {
      id: "card",
      name: "银行卡",
      icon: <CreditCard className="w-5 h-5" />,
      description: "储蓄卡或信用卡支付"
    }
  ];

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate('/payment-success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <PageHeader />
      <div className="container max-w-2xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">确认支付</h1>
          <p className="text-muted-foreground">请选择支付方式完成购买</p>
        </div>

        {/* Order Summary */}
        <Card className="shadow-soft border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-lg">订单信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderInfo.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-foreground">{item.name}</span>
                  <span className="text-sm font-semibold">¥{item.price}</span>
                </div>
              ))}
              
              <div className="border-t pt-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">小计</span>
                  <span>¥{orderInfo.items.reduce((sum, item) => sum + item.price, 0)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">优惠</span>
                  <span className="text-success">-¥{orderInfo.discount}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>总计</span>
                  <span className="text-primary">¥{orderInfo.total}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="shadow-soft border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-lg">支付方式</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="text-primary">{method.icon}</div>
                      <div>
                        <Label htmlFor={method.id} className="text-base font-medium cursor-pointer">
                          {method.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Security Info */}
        <Card className="shadow-soft border-0 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <Shield className="w-5 h-5 text-success" />
              <span>256位SSL加密保护，支付信息安全可靠</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Button */}
        <Button 
          className="w-full h-14 text-lg"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>处理中...</span>
            </div>
          ) : (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              立即支付 ¥{orderInfo.total}
            </>
          )}
        </Button>

        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            点击支付即表示您同意我们的服务条款和隐私政策
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;