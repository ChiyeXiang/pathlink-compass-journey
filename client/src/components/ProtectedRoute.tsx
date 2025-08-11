import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // 如果不需要认证，直接渲染子组件
  if (!requireAuth) {
    return <>{children}</>;
  }

  // 如果需要认证但用户未登录，重定向到登录页面
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 用户已登录，渲染子组件
  return <>{children}</>;
};
