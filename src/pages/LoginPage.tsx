import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import { Loader } from '../components/Loader';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/api/auth/login', { username, password });
      const token = res.data.token || res.data.accessToken || res.data;
      
      if (typeof token === 'string') {
        localStorage.setItem('token', token);
      } else if (token.token) {
        localStorage.setItem('token', token.token);
      }
      
      navigate('/profile');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка входа. Проверьте логин и пароль.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      {loading && <Loader text="Выполняем вход в систему..." />}
      <form onSubmit={handleLogin} style={cardStyle}>
        <h2 style={{ marginBottom: 20 }}>Вход в фан-клуб</h2>
        {error && <div style={errorStyle}>{error}</div>}
        <input
          style={inputStyle}
          type="text"
          placeholder="Логин или Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={btnStyle}>Войти</button>
        <p style={{ marginTop: 16, fontSize: '0.85rem' }}>
          Ещё нет аккаунта? <Link to="/register" style={{ color: '#c084fc' }}>Зарегистрироваться</Link>
        </p>
      </form>
    </div>
  );
};

export const containerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' };
export const cardStyle: React.CSSProperties = { background: '#161622', padding: 32, borderRadius: 16, border: '1px solid #272738', width: '100%', maxWidth: 380, textAlign: 'center' };
export const inputStyle: React.CSSProperties = { width: '100%', padding: '12px', marginBottom: 14, borderRadius: 8, border: '1px solid #2a2a40', background: '#0d0d14', color: '#fff', boxSizing: 'border-box' };
export const btnStyle: React.CSSProperties = { width: '100%', padding: '12px', backgroundColor: '#9333ea', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' };
export const errorStyle: React.CSSProperties = { color: '#f87171', background: 'rgba(239,68,68,0.1)', padding: 10, borderRadius: 8, marginBottom: 14, fontSize: '0.85rem' };