import React from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative' }}>
      {/* Login Button - absolute top right */}
      <div style={{ position: 'fixed', top: 24, right: 32, zIndex: 1000 }}>
        <button
          style={{
            padding: '8px 24px',
            background: '#15b078',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(21,176,120,0.08)'
          }}
          onClick={() => navigate('/login')}
        >
          登录
        </button>
      </div>
      
      {/* Simple Homepage Content */}
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '1rem',
          color: '#333'
        }}>
          PathLink
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#666',
          maxWidth: '600px',
          marginBottom: '2rem'
        }}>
          欢迎来到 PathLink，您的智能申请助手
        </p>
        <button
          style={{
            padding: '12px 32px',
            background: '#15b078',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(21,176,120,0.2)',
            transition: 'all 0.3s ease'
          }}
                     onMouseEnter={(e) => {
             (e.target as HTMLElement).style.transform = 'translateY(-2px)';
             (e.target as HTMLElement).style.boxShadow = '0 6px 16px rgba(21,176,120,0.3)';
           }}
           onMouseLeave={(e) => {
             (e.target as HTMLElement).style.transform = 'translateY(0)';
             (e.target as HTMLElement).style.boxShadow = '0 4px 12px rgba(21,176,120,0.2)';
           }}
          onClick={() => navigate('/welcome')}
        >
          开始使用
        </button>
      </div>
    </div>
  );
};

export default Index;