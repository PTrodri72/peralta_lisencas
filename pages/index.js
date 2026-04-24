import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('peralta_token', data.token);
      router.push('/dashboard'); // Vai para o painel após o login
    } else {
      alert('Utilizador não autorizado!');
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Peralta Studios - Login</h1>
      <input 
        type="text" 
        placeholder="Teu Nome de Utilizador" 
        value={username}
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button onClick={handleLogin}>Entrar no Sistema</button>
    </div>
  );
}
