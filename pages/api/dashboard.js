import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('peralta_token');
    fetch(`/api/list-licenses?token=${token}`)
      .then(res => res.json())
      .then(data => setLicenses(data));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Gestão de Licenças</h1>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Discord ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map(lic => (
            <tr key={lic.key}>
              <td>{lic.key}</td>
              <td>{lic.discord_id}</td>
              <td>{lic.active ? '✅ Ativa' : '❌ Banida'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
