import React from 'react';
import Table from 'react-bootstrap/Table';

const PlayerTable = (props) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>team</th>
          <th>position</th>
          <th>conference</th>
        </tr>
      </thead>
      <tbody>
        {props.players?.map((player) => (
          <tr key={player.id} onClick={() => props.handlePlayerClick(player.id)}>
            <td>{player.id}</td>
            <td>{`${player.first_name} ${player.last_name}`}</td>
            <td>{player.team.full_name}</td>
            <td>{player.position}</td>
            <td>{player.team.conference}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default PlayerTable;