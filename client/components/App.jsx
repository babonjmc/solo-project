import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import axios from 'axios';

import PlayerTable from './components/player-table';
import PlayerCard from './components/player-card';
// import Alert from './components/alert';
import SearchBar from './components/search-bar';
import { Jumbotron } from 'react-bootstrap';

function App() {
  const lebron = {
    id: 237,
    first_name: 'LeBron',
    last_name: 'James',
    team: { abbreviation: 'LAL', full_name: 'Los Angeles Lakers' },
    stats: {
      averageAssistsPerGame: 7.38,
      averageBlocksPerGame: 0.65,
      averagePointsPerGame: 26.97,
    },
  };

  const [name, setName] = useState('LeBron James');
  const [allPlayers, setAllPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([lebron]);
  const [selectedPlayer, setSelectedPlayer] = useState(lebron);
  const [loading, setLoading] = useState(true);
  // const [showAlert, setShowAlert] = useState(false);

  const getAllPlayers = useCallback((page, players) => {
    if (page) {
      return axios
        .get(`https://www.balldontlie.io/api/v1/players?per_page=100&page=${page}`)
        .then((response) => response.data)
        .catch(() => new Promise((r) => setTimeout(r, 25000)).then(() => getAllPlayers(page, players)))
        .then((result) => {
          return getAllPlayers(result.meta?.next_page, players.concat(result.data));
        });
    } else return players;
  }, []);

  useEffect(() => {
    getAllPlayers(1, [])
      .then(setAllPlayers)
      .finally(() => setLoading(false));
  }, [getAllPlayers]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) await getPlayers(name);
    else setFilteredPlayers(allPlayers.filter((player) => `${player.first_name} ${player.last_name}`.includes(name)));
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  async function getPlayers(name) {
    const url = `https://www.balldontlie.io/api/v1/players?per_page=100&search=${name}`;
    const result = await fetchData(url);
    setFilteredPlayers(result.data);
  }

  function averagePlayerStats(stats) {
    const assists = stats.data.map((game) => game.ast);
    const blocks = stats.data.map((game) => game.blk);
    const points = stats.data.map((game) => game.pts);
    return {
      averageAssistsPerGame: calculateAverage(assists),
      averageBlocksPerGame: calculateAverage(blocks),
      averagePointsPerGame: calculateAverage(points),
    };
  }

  function calculateAverage(stats) {
    const total = stats.reduce((acc, c) => acc + c, 0);
    return total / stats.length;
  }

  async function getPlayerById(id) {
    return await fetchData(`https://www.balldontlie.io/api/v1/players/${id}`);
  }

  async function handlePlayerClick(id) {
    const url = `https://www.balldontlie.io/api/v1/stats?player_ids[]=${id}`;
  
    const results = await fetchData(url).then(averagePlayerStats);
  
    let playerData = loading ? await getPlayerById(id) : allPlayers.find((player) => player.id === id);
  
    setSelectedPlayer({
      ...playerData,
      stats: {
        averageAssistsPerGame: results.averageAssistsPerGame,
        averageBlocksPerGame: results.averageBlocksPerGame,
        averagePointsPerGame: results.averagePointsPerGame,
      },
    });
  }

  async function fetchData(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      setShowAlert(true);
      console.log(error);
    }
  }
  
  return (
    <article>
      <section className="center search-form">
        <Jumbotron>
          <PlayerCard className="card" player={selectedPlayer}></PlayerCard>
        </Jumbotron>
        <SearchBar name={name} handleSubmit={handleSubmit} handleChange={handleChange}></SearchBar>
      </section>
      <section>
        <PlayerTable players={filteredPlayers} handlePlayerClick={handlePlayerClick}></PlayerTable>
      </section>
    </article>
  );
  }
export default App;