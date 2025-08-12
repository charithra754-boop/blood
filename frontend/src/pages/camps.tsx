import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f2027 0%, #2c5364 100%);
  padding: 2rem;
`;

const CampBox = styled.div`
  background: rgba(30, 0, 40, 0.95);
  border: 2px solid #ff003c;
  box-shadow: 0 0 40px #ff003c, 0 0 80px #00fff7;
  border-radius: 20px;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  color: #fff;
`;

const Title = styled.h1`
  color: #00fff7;
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px #00fff7, 0 0 20px #ff003c;
`;

export default function Camps() {
  const [camps, setCamps] = useState<any[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/camps')
      .then(res => res.json())
      .then(setCamps);
  }, []);
  return (
    <Container>
      <Title>Upcoming Blood Donation Camps</Title>
      {camps.map(camp => (
        <CampBox key={camp._id}>
          <div><strong>Name:</strong> {camp.name}</div>
          <div><strong>Date:</strong> {camp.date ? camp.date.substring(0, 10) : ''}</div>
          <div><strong>Location:</strong> {camp.location}</div>
          <div><strong>Attendees:</strong> {camp.attendees.length}</div>
        </CampBox>
      ))}
    </Container>
  );
}
