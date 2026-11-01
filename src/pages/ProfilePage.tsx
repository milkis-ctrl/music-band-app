import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { Loader } from '../components/Loader';
import { containerStyle, cardStyle, inputStyle, btnStyle } from './LoginPage';

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await api.get('/api/profile');
      setProfile(res.data);
      setName(res.data.name || res.data.username || '');
      setBio(res.data.bio || '');
    } catch {
      localStorage.removeItem('token');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const res = await api.put('/api/profile', { name, bio });
      setProfile(res.data);
      setIsEditing(false);
      setMsg('Профиль успешно обновлен!');
    } catch {
      setMsg('Ошибка сохранения данных.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) return <Loader text="Загрузка данных профиля..." />;

  return (
    <div style={containerStyle}>
      {loading && <Loader text="Сохранение..." />}
      <div style={{ ...cardStyle, maxWidth: 450, textAlign: 'left' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>🎸 Профиль фаната</h2>
        {msg && <p style={{ color: '#4ade80', fontSize: '0.9rem', textAlign: 'center' }}>{msg}</p>}

        {!isEditing ? (
          <div>
            <p><strong>Username:</strong> {profile?.username}</p>
            <p><strong>Email:</strong> {profile?.email}</p>
            <p><strong>Имя:</strong> {profile?.name || 'Не указано'}</p>
            <p><strong>О себе / Статус:</strong> {profile?.bio || 'Пусто'}</p>
            <button onClick={() => setIsEditing(true)} style={{ ...btnStyle, marginTop: 16 }}>
              Редактировать профиль
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <label style={{ fontSize: '0.85rem' }}>Имя</label>
            <input
              style={inputStyle}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label style={{ fontSize: '0.85rem' }}>О себе</label>
            <textarea
              style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" style={btnStyle}>Сохранить</button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                style={{ ...btnStyle, background: '#374151' }}
              >
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};