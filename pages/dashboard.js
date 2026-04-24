import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const [licencas, setLicencas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('peralta_token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Busca a lista de licenças usando o seu arquivo list-licenses.js
    fetch(`/api/list-licenses?token=${token}`)
      .then(res => res.json())
      .then(data => setLicencas(data));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Painel de Controle</h1>
      <p>Bem-vindo ao gerenciador de licenças.</p>
      {/* Aqui você pode criar a tabela para listar as licenças */}
    </div>
  );
}
