import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signup', form);
      setMsg(res.data.message || 'Account created. Please login.');
      setTimeout(()=> navigate('/login'), 1200);
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Error');
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: 'auto', padding: 20 }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input required placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /><br/>
        <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /><br/>
        <input required type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /><br/>
        <button type="submit">Create account</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
