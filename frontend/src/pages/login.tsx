import React, { useState } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { FaUser, FaLock } from 'react-icons/fa';

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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend API for authentication
    alert('Login attempted!');
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
      </LoginBox>
    </NeonContainer>
  );
}
