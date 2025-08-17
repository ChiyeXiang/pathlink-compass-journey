// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  userId: string;
  name?: string;
  email?: string;
  createdAt?: string;
};

interface AuthContextType {
  isAuthenticated: boolean;
  checkingAuth: boolean;      
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser]   = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // 1) 初始：从 localStorage 读取 token 并尝试校验
  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) {
      setToken(stored);
      // 尝试校验
      (async () => {
        try {
          const r = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${stored}` },
          });
          if (r.ok) {
            const data = await r.json();
            setUser(data);
            setIsAuthenticated(true);
            console.log('AuthContext: 已验证 token');
          } else {
            console.warn('AuthContext: token 校验失败，状态码', r.status);
            // 不要立刻清除 token，交给 UI 或后续逻辑
            setIsAuthenticated(false);
          }
        } catch (e) {
          console.warn('AuthContext: 校验异常', e);
          setIsAuthenticated(false);
        } finally {
          setCheckingAuth(false);
        }
      })();
    } else {
      console.log('AuthContext: 未找到 token');
      setCheckingAuth(false);
    }
  }, []);

  // 2) 监听跨标签 token 同步
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'token') {
        const next = e.newValue;
        setToken(next);
        setIsAuthenticated(!!next);
        if (!next) setUser(null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    // 可选：登录后立即拉取用户信息
    (async () => {
      try {
        const r = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${newToken}` },
        });
        if (r.ok) setUser(await r.json());
      } catch {}
    })();
    console.log('AuthContext: 登录成功');
  };

  const logout = () => {
    localStorage.removeItem('token');
    // 根据你的项目，别的本地存储也可以清理
    localStorage.removeItem('student');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    console.log('AuthContext: 已退出登录');
    // 不强制刷新；让路由守卫或调用方决定跳转
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, checkingAuth, token, user, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
