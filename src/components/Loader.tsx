import React from 'react';

export const Loader: React.FC<{ text?: string }> = ({ text = 'Загрузка...' }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.spinner}></div>
        <p style={{ margin: 0, fontWeight: 600 }}>{text}</p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(4px)',
  },
  card: {
    background: '#1a1a24',
    padding: '28px 40px',
    borderRadius: '16px',
    border: '1px solid #2e2e42',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(255,255,255,0.1)',
    borderTopColor: '#c084fc',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};