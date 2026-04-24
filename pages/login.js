import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const fazerLogin = async () => {
    const resposta = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });

    const dados = await resposta.json();

    if (dados.token) {
      // Salva o token no navegador para usar depois
      localStorage.setItem('peralta_token', dados.token);
      // Manda você para o dashboard
      router.push('/dashboard');
    } else {
      alert('Usuário não permitido!');
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Peralta Studios - Login</h1>
      <input 
        type="text" 
        placeholder="Digite seu nome" 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button onClick={fazerLogin}>Entrar</button>
    </div>
  );
}
