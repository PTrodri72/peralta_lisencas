import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('adminToken', data.token);
      alert('Login efetuado! Agora podes ir ao Dashboard.');
    } else {
      alert('Acesso negado.');
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Peralta Studios - Login</h1>
      <input 
        type="text" 
        placeholder="Teu Usuário" 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
