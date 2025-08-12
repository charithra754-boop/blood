import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #2c5364 0%, #0f2027 100%);
  padding: 2rem;
`;

const RewardBox = styled.div`
  background: rgba(30, 0, 40, 0.95);
  border: 2px solid #00fff7;
  box-shadow: 0 0 40px #00fff7, 0 0 80px #ff003c;
  border-radius: 20px;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  color: #fff;
`;

const Title = styled.h1`
  color: #ff003c;
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px #ff003c, 0 0 20px #00fff7;
`;

export default function Rewards() {
  const [rewards, setRewards] = useState<any>(null);
  useEffect(() => {
    // Replace with real donor ID after login integration
    const mockId = '64d5f2c2e1b2a1a2b3c4d5e6';
    fetch(`http://localhost:3000/rewards/donor/${mockId}`)
      .then(res => res.json())
      .then(setRewards);
  }, []);
  return (
    <Container>
      <Title>My Rewards</Title>
      {rewards ? (
        <RewardBox>
          <div><strong>Points:</strong> {rewards.points}</div>
          <div><strong>Badges:</strong> {rewards.badges.join(', ')}</div>
          <div><strong>Tier:</strong> {rewards.tier}</div>
        </RewardBox>
      ) : (
        <RewardBox>Loading...</RewardBox>
      )}
    </Container>
  );
}
