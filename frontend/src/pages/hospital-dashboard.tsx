import React from 'react';
import styled from 'styled-components';
// ...existing code...
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
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { FaHospital, FaSyringe, FaBell } from 'react-icons/fa';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #2c5364 0%, #0f2027 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const DashboardBox = styled.div`
  background: rgba(30, 0, 40, 0.95);
  border: 2px solid #00fff7;
  box-shadow: 0 0 40px #00fff7, 0 0 80px #ff003c;
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
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px #ff003c, 0 0 20px #00fff7;
`;

const StatBox = styled.div`
  background: rgba(0, 255, 247, 0.15);
  border: 1px solid #00fff7;
  border-radius: 12px;
  padding: 1rem 2rem;
  margin: 1rem 0;
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  box-shadow: 0 0 10px #00fff7;
`;

const Icon = styled.span`
  color: #ff003c;
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const ThreeBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

import { useEffect, useState } from 'react';

export default function HospitalDashboard() {
  const [hospital, setHospital] = useState<any>(null);
  const mockId = '64d5f2c2e1b2a1a2b3c4d5e7';
  useEffect(() => {
    fetch(`http://localhost:3000/hospitals/${mockId}`)
      .then(res => res.json())
      .then(setHospital);
    fetch(`http://localhost:3000/alerts/hospital/${mockId}`)
      .then(res => res.json())
      .then(setAlerts);
  }, []);

  const [alerts, setAlerts] = useState<any[]>([]);

  const [editMode, setEditMode] = useState(false);
  const [inventory, setInventory] = useState<Record<string, number>>({});

  useEffect(() => {
    if (hospital && hospital.inventory) {
      setInventory(hospital.inventory);
    }
  }, [hospital]);

  const handleInventoryChange = (bg: string, value: number) => {
    setInventory(prev => ({ ...prev, [bg]: value }));
  };

  const handleSave = () => {
    fetch(`http://localhost:3000/hospitals/${mockId}/inventory`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inventory }),
    })
      .then(res => res.json())
      .then(data => {
        setHospital(data);
        setEditMode(false);
        alert('Inventory updated!');
      });
  };
  return (
    <Container>
      <ThreeBg>
        <Canvas camera={{ position: [0, 0, 7] }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} color="#00fff7" intensity={2} />
          <Box args={[2, 2, 2]}>
            <meshStandardMaterial color="#00fff7" emissive="#ff003c" emissiveIntensity={0.7} />
          </Box>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </ThreeBg>
      <DashboardBox>
        <Title>Hospital Dashboard</Title>
        {hospital ? (
          <>
            <StatBox><Icon><FaHospital /></Icon> Name: {hospital.name}</StatBox>
            {editMode ? (
              <>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                  <StatBox key={bg}>
                    <Icon><FaSyringe /></Icon>
                    {bg}: <input type="number" value={inventory[bg] || 0} min={0} style={{ background: '#1a0030', color: '#fff', border: 'none', borderBottom: '2px solid #00fff7', borderRadius: '8px', padding: '0.7rem 1rem', fontSize: '1.1rem', width: '70%' }} onChange={e => handleInventoryChange(bg, Number(e.target.value))} /> units
                  </StatBox>
                ))}
                <NeonButton onClick={handleSave}>Save Inventory</NeonButton>
                <NeonButton style={{ marginTop: '1rem', background: 'linear-gradient(90deg, #ff003c 0%, #00fff7 100%)' }} onClick={() => setEditMode(false)}>Cancel</NeonButton>
              </>
            ) : (
              <>
                <StatBox><Icon><FaSyringe /></Icon> Inventory: {hospital.inventory ? Object.values(hospital.inventory).reduce((a: number, b: number) => a + b, 0) : 0} units</StatBox>
                <NeonButton onClick={() => setEditMode(true)}>Edit Inventory</NeonButton>
              </>
            )}
            <StatBox><Icon><FaBell /></Icon> Active Alerts:
              <ul>
                {alerts.map(alert => (
                  <li key={alert._id}>{alert.bloodGroup} - {alert.status}</li>
                ))}
              </ul>
            </StatBox>
          </>
        ) : (
          <StatBox>Loading...</StatBox>
        )}
      </DashboardBox>
    </Container>
  );
}
