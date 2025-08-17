import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean; // 默认需要登录
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
}) => {
  const { isAuthenticated, checkingAuth } = useAuth();
  const location = useLocation();

  // 1) 还在校验 token，先占位，避免闪跳
  if (requireAuth && checkingAuth) {
    return <div style={{ padding: 16 }}>检查登录状态中…</div>;
  }

  // 2) 不需要认证，直接渲染
  if (!requireAuth) return <>{children}</>;

  // 3) 需要认证但未登录 → 跳登录，并记录来源路由
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 4) 已登录
  return <>{children}</>;
};
