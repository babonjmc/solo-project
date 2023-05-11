import React from 'react';
import Card from 'react-bootstrap/Card';

 const PlayerCard = (props) => {
    const {player} = props;
    console.log(player);
    return (
      <Card>
        <Card.Body>
          <Card.Title>{`${player.first_name} ${player.last_name}`}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{player.team?.full_name}</Card.Subtitle>
          <Card.Text>
            Average Points Per Game: {player.stats.averagePointsPerSeason} <br />
            Average Assists Per Game: {player.stats.averageAssistsPerSeason} <br />
            Average Rebounds Per Game: {player.stats.averageReboundsPerSeason} <br />
            Average Steals Per Game: {player.stats.averageStealsPerSeason} <br />
            Average Blocks Per Game: {player.stats.averageBlocksPerSeason} <br />
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  export default PlayerCard;