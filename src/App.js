import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FortniteRewardSystem = () => {
  const [players, setPlayers] = useState([]);
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [newPlayer, setNewPlayer] = useState({ name: '', score: 0 });
  const [updatePlayer, setUpdatePlayer] = useState({ name: '', score: 0 });

  const addPlayer = () => {
    if (newPlayer.name && newPlayer.score) {
      setPlayers([...players, newPlayer]);
      setNewPlayer({ name: '', score: 0 });
    }
  };

  const updatePlayerScore = () => {
    if (updatePlayer.name && updatePlayer.score) {
      setPlayers(players.map(player => 
        player.name === updatePlayer.name 
          ? { ...player, score: player.score + parseInt(updatePlayer.score) }
          : player
      ));
      setUpdatePlayer({ name: '', score: 0 });
    }
  };

  const calculateRewards = () => {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const top10Players = sortedPlayers.slice(0, 10);
    const totalScore = top10Players.reduce((sum, player) => sum + player.score, 0);

    return top10Players.map(player => ({
      ...player,
      reward: (player.score / totalScore) * monthlyBudget
    }));
  };

  const rewardedPlayers = calculateRewards();

  const chartData = players.map(player => ({
    name: player.name,
    score: player.score
  }));

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>Fortnite E-sports Reward Management System</h1>
        <h2 style={{ color: '#0066cc', fontStyle: 'italic' }}>Produced by NEXCONNECT</h2>
      </div>
      
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
        <h3>新規プレイヤー追加</h3>
        <input
          type="text"
          placeholder="プレイヤー名"
          value={newPlayer.name}
          onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="number"
          placeholder="初期スコア"
          value={newPlayer.score}
          onChange={(e) => setNewPlayer({...newPlayer, score: parseInt(e.target.value)})}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={addPlayer} style={{ padding: '5px 10px', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: '3px' }}>追加</button>
      </div>

      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
        <h3>プレイヤースコア更新</h3>
        <select
          value={updatePlayer.name}
          onChange={(e) => setUpdatePlayer({...updatePlayer, name: e.target.value})}
          style={{ marginRight: '10px', padding: '5px' }}
        >
          <option value="">プレイヤーを選択</option>
          {players.map(player => (
            <option key={player.name} value={player.name}>{player.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="追加スコア"
          value={updatePlayer.score}
          onChange={(e) => setUpdatePlayer({...updatePlayer, score: parseInt(e.target.value)})}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={updatePlayerScore} style={{ padding: '5px 10px', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: '3px' }}>スコア更新</button>
      </div>

      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
        <h3>月間予算設定</h3>
        <input
          type="number"
          placeholder="月間予算"
          value={monthlyBudget}
          onChange={(e) => setMonthlyBudget(parseInt(e.target.value))}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <span>円</span>
      </div>

      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
        <h3>プレイヤースコア</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#0066cc" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
        <h3>TOP10 報酬分配</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#0066cc', color: 'white' }}>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>順位</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>プレイヤー名</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>スコア</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>報酬</th>
            </tr>
          </thead>
          <tbody>
            {rewardedPlayers.map((player, index) => (
              <tr key={player.name} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{index + 1}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{player.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{player.score}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{player.reward.toFixed(0)}円</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
        <p>© 2024 NEXCONNECT. All rights reserved.</p>
      </div>
    </div>
  );
};

export default FortniteRewardSystem;