import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: 800, margin: '0 auto', color: '#fff' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '16px', color: '#c084fc' }}>NEON PULSE</h1>
      <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '32px' }}>
        Официальный фан-клуб рок-группы Neon Pulse.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <Link to="/register" style={{ padding: '12px 24px', background: '#9333ea', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}>
          Регистрация
        </Link>
        <Link to="/login" style={{ padding: '12px 24px', background: '#1e1e2d', color: '#fff', borderRadius: '8px', textDecoration: 'none', border: '1px solid #333' }}>
          Войти
        </Link>
      </div>
    </div>
  );
};