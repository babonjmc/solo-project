import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

import PlayerTable from './player-table.jsx';
import PlayerCard from './player-card.jsx';
import Alerts from './alert.jsx';
import SearchBar from './search-bar.jsx';

function App() {
  const nbaPlayer = {
    id: null,
    first_name: '',
    last_name: '',
    team: { abbreviation: '', full_name: '' },
    stats: {
      averagePointsPerSeason: null,
      averageAssistsPerSeason: null,
      averageReboundsPerSeason: null,
      averageStealsPerSeason: null,
      averageBlocksPerSeason: null,
      
    },
  };

  const [name, setName] = useState('');
  const [allPlayers, setAllPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([nbaPlayer]);
  const [selectedPlayer, setSelectedPlayer] = useState(nbaPlayer);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showCard, setShowCard] = useState(false)

  const getAllPlayers = useCallback((page, players) => {
    if (page) {
      return fetch(`https://www.balldontlie.io/api/v1/players?per_page=100&page=${page}`)
        .then((response) => response.json())
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

  function getPlayerFullName(player) {
    const { first_name, last_name } = player;
    return `${first_name} ${last_name}`;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) {
      await getPlayers(name);
    } else {
      const lowercaseName = name.toLowerCase();
      setFilteredPlayers(allPlayers.filter(player => player && getPlayerFullName(player).toLowerCase().includes(lowercaseName)));
    }
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  async function getPlayers(name) {
    const url = `https://www.balldontlie.io/api/v1/players?per_page=100&search=${name}`;
    try {
      const result = await fetchData(url);
      if (result && result.data) {
        setFilteredPlayers(result.data);
      } else {
        setFilteredPlayers([]);
      }
    } catch (error) {
      console.log(error);
      throw new Error('Fetch error');
    }
  }

  async function getPlayerById(id) {
    return await fetchData(`https://www.balldontlie.io/api/v1/players/${id}`);
  }

  async function handlePlayerClick(id) {
    const url = `https://www.balldontlie.io/api/v1/season_averages?&player_ids[]=${id}`;

    const results = await fetchData(url);

    let playerData = loading ? await getPlayerById(id) : allPlayers.find((player) => player.id === id);
    const seasonStats = results.data[0];

    setSelectedPlayer({
      ...playerData,
      stats: {
        averagePointsPerSeason: seasonStats.pts,
        averageAssistsPerSeason: seasonStats.ast,
        averageReboundsPerSeason: seasonStats.reb,
        averageStealsPerSeason: seasonStats.stl,
        averageBlocksPerSeason: seasonStats.blk,
      },
    });
    setShowCard(true);
  }

  async function fetchData(url) {
    return await fetch(url).then(handleFetchResponse);
  }

  async function handleFetchResponse(r) {
    if (r.ok) {
      return await r.json();
    } else {
      setShowAlert(true);
      console.log(r);
    }
  }

  useEffect(() => {
    if (filteredPlayers && filteredPlayers.length > 0) {
      console.log('Filtered player data:', filteredPlayers);
    } else {
      console.log('No filtered player data');
    }
  }, [filteredPlayers]);
  
  return (
    <article>
      <section className="center search-form">
        <div className="jumbotron">
          {showCard && <PlayerCard className="card" player={selectedPlayer}></PlayerCard>}
        </div>
        <SearchBar name={name} handleSubmit={handleSubmit} handleChange={handleChange}></SearchBar>
      </section>
      <section>
        {showAlert ? <Alerts setShow={setShowAlert}></Alerts> : null}
        <PlayerTable players={filteredPlayers} handlePlayerClick={handlePlayerClick}></PlayerTable>
      </section>
    </article>
  );
}
export default App;