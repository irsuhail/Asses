import { useState, useRef } from 'react';
import api from '../api';
import { useLocation, useNavigate } from 'react-router-dom';

export default function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const loginId = location.state?.loginId;
  const email = location.state?.email;
  const [digits, setDigits] = useState(['','','','']);
  const [msg, setMsg] = useState('');
  const inputsRef = useRef([]);

  if (!loginId) {
    return <div style={{padding:20}}>No login data. Please login first.</div>;
  }

  function handleChange(idx, val) {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[idx] = val;
    setDigits(next);
    if (val && idx < 3) {
      inputsRef.current[idx+1]?.focus();
    }
  }

  function handleKeyDown(e, idx) {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputsRef.current[idx-1]?.focus();
    }
  }

  async function submitOTP(e) {
    e.preventDefault();
    const otp = digits.join('');
    if (otp.length < 4) { setMsg('Please enter 4 digits'); return; }

    try {
      const res = await api.post('/auth/verify-otp', { loginId, otp });
      const token = res.data.token;
      // save token
      localStorage.setItem('token', token);
      setMsg('Verified! Redirecting...');
      setTimeout(()=> navigate('/dashboard'), 800);
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Invalid OTP');
    }
  }

  async function resendOTP() {
    // Optionally implement: call login endpoint again to resend OTP
    try {
      await api.post('/auth/login', { email, password: '' }); // Ideally backend should allow resend based on email; alternatively create a resend endpoint
      setMsg('OTP resent (check email).');
    } catch (err) {
      setMsg('Resend failed. Use login again.');
    }
  }

  return (
    <div style={{maxWidth:420, margin:'auto', padding:20}}>
      <h3>Enter the 4-digit OTP sent to your email</h3>
      <form onSubmit={submitOTP} style={{display:'flex', gap:8}}>
        {digits.map((d, i)=>(
          <input key={i}
            ref={el => inputsRef.current[i] = el}
            value={d}
            onChange={e=>handleChange(i, e.target.value)}
            onKeyDown={e=>handleKeyDown(e, i)}
            maxLength={1}
            style={{width:50, height:50, fontSize:24, textAlign:'center'}}
            inputMode="numeric"
            />
        ))}
        <div style={{ display:'block' }}>
          <button type="submit">Verify</button>
          <button type="button" onClick={resendOTP}>Resend</button>
        </div>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
