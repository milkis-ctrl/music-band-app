import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import { Loader } from '../components/Loader';
import { containerStyle, cardStyle, inputStyle, btnStyle, errorStyle } from './LoginPage';

export const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/api/auth/register', { username, email, password });
      alert('Регистрация прошла успешно! Теперь войдите в аккаунт.');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при регистрации.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      {loading && <Loader text="Создаем твой профиль..." />}
      <form onSubmit={handleRegister} style={cardStyle}>
        <h2 style={{ marginBottom: 20 }}>Регистрация фаната</h2>
        {error && <div style={errorStyle}>{error}</div>}
        <input
          style={inputStyle}
          type="text"
          placeholder="Имя пользователя (username)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" style={btnStyle}>Зарегистрироваться</button>
        <p style={{ marginTop: 16, fontSize: '0.85rem' }}>
          Уже в клубе? <Link to="/login" style={{ color: '#c084fc' }}>Войти</Link>
        </p>
      </form>
    </div>
  );
};