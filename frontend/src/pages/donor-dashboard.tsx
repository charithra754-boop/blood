import React from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TorusKnot } from '@react-three/drei';
import { FaUser, FaMedal, FaHistory } from 'react-icons/fa';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f2027 0%, #2c5364 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const DashboardBox = styled.div`
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
  color: #00fff7;
  font-family: 'Orbitron', sans-serif;
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px #00fff7, 0 0 20px #ff003c;
`;

const StatBox = styled.div`
  background: rgba(255, 0, 60, 0.15);
  border: 1px solid #ff003c;
  border-radius: 12px;
  padding: 1rem 2rem;
  margin: 1rem 0;
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  box-shadow: 0 0 10px #ff003c;
`;

const Icon = styled.span`
  color: #00fff7;
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

export default function DonorDashboard() {
  const [donor, setDonor] = useState<any>(null);
  const mockId = '64d5f2c2e1b2a1a2b3c4d5e6';
  useEffect(() => {
    fetch(`http://localhost:3000/donors/${mockId}`)
      .then(res => res.json())
      .then(setDonor);
    fetch(`http://localhost:3000/alerts/donor/${mockId}`)
      .then(res => res.json())
      .then(setAlerts);
    fetch(`http://localhost:3000/donation-history/donor/${mockId}`)
      .then(res => res.json())
      .then(setHistory);
  }, []);

  const [alerts, setAlerts] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBloodGroup, setEditBloodGroup] = useState('');
  const [editLocation, setEditLocation] = useState('');

  useEffect(() => {
    if (donor) {
      setEditName(donor.name || '');
      setEditBloodGroup(donor.bloodGroup || '');
      setEditLocation(donor.location || '');
    }
  }, [donor]);

  const handleSave = () => {
    fetch(`http://localhost:3000/donors/${mockId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName, bloodGroup: editBloodGroup, location: editLocation }),
    })
      .then(res => res.json())
      .then(data => {
        setDonor(data);
        setEditMode(false);
        alert('Profile updated!');
      });
  };
  return (
    <Container>
      <ThreeBg>
        <Canvas camera={{ position: [0, 0, 7] }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} color="#ff003c" intensity={2} />
          <TorusKnot args={[1.5, 0.5, 100, 16]}>
            <meshStandardMaterial color="#ff003c" emissive="#00fff7" emissiveIntensity={0.7} />
          </TorusKnot>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </ThreeBg>
      <DashboardBox>
        <Title>Donor Dashboard</Title>
        {donor ? (
          <>
            {editMode ? (
              <>
                <StatBox>
                  <Icon><FaUser /></Icon>
                  <input value={editName} onChange={e => setEditName(e.target.value)} style={{ background: '#1a0030', color: '#fff', border: 'none', borderBottom: '2px solid #ff003c', borderRadius: '8px', padding: '0.7rem 1rem', fontSize: '1.1rem', width: '70%' }} />
                </StatBox>
                <StatBox>
                  <Icon><FaMedal /></Icon>
                  <input value={editBloodGroup} onChange={e => setEditBloodGroup(e.target.value)} style={{ background: '#1a0030', color: '#fff', border: 'none', borderBottom: '2px solid #ff003c', borderRadius: '8px', padding: '0.7rem 1rem', fontSize: '1.1rem', width: '70%' }} />
                </StatBox>
                <StatBox>
                  <Icon><FaUser /></Icon>
                  <input value={editLocation} onChange={e => setEditLocation(e.target.value)} style={{ background: '#1a0030', color: '#fff', border: 'none', borderBottom: '2px solid #ff003c', borderRadius: '8px', padding: '0.7rem 1rem', fontSize: '1.1rem', width: '70%' }} />
                </StatBox>
                <NeonButton onClick={handleSave}>Save</NeonButton>
                <NeonButton style={{ marginTop: '1rem', background: 'linear-gradient(90deg, #00fff7 0%, #ff003c 100%)' }} onClick={() => setEditMode(false)}>Cancel</NeonButton>
              </>
            ) : (
              <>
                <StatBox><Icon><FaUser /></Icon> Name: {donor.name}</StatBox>
                <StatBox><Icon><FaMedal /></Icon> Blood Group: {donor.bloodGroup}</StatBox>
                <StatBox><Icon><FaUser /></Icon> Location: {donor.location}</StatBox>
                <StatBox><Icon><FaMedal /></Icon> Points: {donor.points}</StatBox>
                <StatBox><Icon><FaHistory /></Icon> Last Donation: {donor.lastDonationDate ? donor.lastDonationDate.substring(0, 10) : 'N/A'}</StatBox>
                <StatBox><Icon><FaBell /></Icon> Alerts:
                  <ul>
                    {alerts.map(alert => (
                      <li key={alert._id}>{alert.bloodGroup} - {alert.status}</li>
                    ))}
                  </ul>
                </StatBox>
                <StatBox><Icon><FaHistory /></Icon> Donation History:
                  <ul>
                    {history.map(h => (
                      <li key={h._id}>{h.date ? h.date.substring(0, 10) : ''} at {h.hospitalId}</li>
                    ))}
                  </ul>
                </StatBox>
                <NeonButton onClick={() => setEditMode(true)}>Edit Profile</NeonButton>
              </>
            )}
          </>
        ) : (
          <StatBox>Loading...</StatBox>
        )}
      </DashboardBox>
    </Container>
  );
}
