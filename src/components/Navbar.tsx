import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🎸 NEON PULSE</Link>
      <div style={styles.menu}>
        <Link to="/" style={styles.link}>Главная</Link>
        {token ? (
          <>
            <Link to="/profile" style={styles.link}>Мой профиль</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Вход</Link>
            <Link to="/register" style={styles.registerBtn}>Регистрация</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles: Record<string, React.CSSProperties> = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    background: '#12121a',
    borderBottom: '1px solid #232334',
  },
  logo: { fontSize: '1.25rem', fontWeight: 800, color: '#c084fc', textDecoration: 'none' },
  menu: { display: 'flex', alignItems: 'center', gap: '20px' },
  link: { color: '#e2e8f0', textDecoration: 'none', fontSize: '0.95rem' },
  registerBtn: {
    padding: '8px 16px',
    background: '#9333ea',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 600,
  },
  logoutBtn: {
    padding: '7px 14px',
    background: 'transparent',
    border: '1px solid #ef4444',
    color: '#ef4444',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
  },
};