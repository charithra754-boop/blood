import React, { useState } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { FaUser, FaLock, FaUserPlus } from 'react-icons/fa';

const NeonContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f2027 0%, #2c5364 100%);
  position: relative;
`;

const LoginBox = styled.div`
  background: rgba(30, 0, 40, 0.95);
  border: 2px solid #ff003c;
  box-shadow: 0 0 40px #ff003c, 0 0 80px #00fff7;
  border-radius: 20px;
  padding: 2rem 3rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #ff003c;
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px #ff003c, 0 0 20px #00fff7;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
  width: 100%;
`;

const Icon = styled.span`
  color: #00fff7;
  font-size: 1.3rem;
  margin-right: 0.7rem;
`;

const Input = styled.input`
  background: #1a0030;
  border: none;
  border-bottom: 2px solid #ff003c;
  color: #fff;
  font-size: 1.1rem;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  outline: none;
  width: 100%;
  transition: border-color 0.2s;
  &:focus {
    border-color: #00fff7;
  }
`;

const NeonButton = styled.button`
  background: linear-gradient(90deg, #ff003c 0%, #00fff7 100%);
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  padding: 0.8rem 2.5rem;
  border: none;
  border-radius: 12px;
  box-shadow: 0 0 20px #ff003c, 0 0 40px #00fff7;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: transform 0.1s, box-shadow 0.1s;
  &:active {
    transform: scale(0.97);
    box-shadow: 0 0 40px #ff003c, 0 0 80px #00fff7;
  }
`;

const ThreeBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('donor');
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.access_token) {
          alert('Login successful!');
        } else {
          alert('Login failed: ' + (data.message || 'Invalid credentials'));
        }
      })
      .catch(() => {
        alert('Login failed: Server error');
      });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: regEmail, password: regPassword, role: regRole }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert('Registration successful!');
          setShowRegister(false);
        } else {
          alert('Registration failed: ' + (data.error || 'Unknown error'));
        }
      })
      .catch(() => {
        alert('Registration failed: Server error');
      });
  };

  return (
    <NeonContainer>
      <ThreeBg>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} color="#ff003c" intensity={2} />
          <Sphere args={[1.5, 32, 32]}>
            <meshStandardMaterial color="#ff003c" emissive="#00fff7" emissiveIntensity={0.7} />
          </Sphere>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </ThreeBg>
      <LoginBox>
        <Title>Blood Portal</Title>
        {!showRegister ? (
          <>
            <form onSubmit={handleLogin} style={{ width: '100%' }}>
              <InputGroup>
                <Icon><FaUser /></Icon>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Icon><FaLock /></Icon>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
              <NeonButton type="submit">Login</NeonButton>
            </form>
            <NeonButton style={{ marginTop: '1rem', background: 'linear-gradient(90deg, #00fff7 0%, #ff003c 100%)' }} onClick={() => setShowRegister(true)}>
              <FaUserPlus style={{ marginRight: '0.5rem' }} /> Register
            </NeonButton>
          </>
        ) : (
          <form onSubmit={handleRegister} style={{ width: '100%' }}>
            <InputGroup>
              <Icon><FaUser /></Icon>
              <Input
                type="email"
                placeholder="Email"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Icon><FaLock /></Icon>
              <Input
                type="password"
                placeholder="Password"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Icon><FaUser /></Icon>
              <select value={regRole} onChange={e => setRegRole(e.target.value)} style={{
                background: '#1a0030', color: '#fff', border: 'none', borderBottom: '2px solid #ff003c', borderRadius: '8px', padding: '0.7rem 1rem', fontSize: '1.1rem', width: '100%'
              }}>
                <option value="donor">Donor</option>
                <option value="hospital">Hospital</option>
                <option value="admin">Admin</option>
              </select>
            </InputGroup>
            <NeonButton type="submit">Register</NeonButton>
            <NeonButton style={{ marginTop: '1rem', background: 'linear-gradient(90deg, #00fff7 0%, #ff003c 100%)' }} onClick={() => setShowRegister(false)}>
              Back to Login
            </NeonButton>
          </form>
        )}
      </LoginBox>
    </NeonContainer>
  );
}
