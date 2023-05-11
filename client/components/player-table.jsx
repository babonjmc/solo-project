import React from 'react';
import Table from 'react-bootstrap/Table';

const PlayerTable = (props) => {
  return (
    <Table>
      <thead>
        <tr>
        <th>
          <span className="id-header">ID</span>
          </th>
          <th>Name</th>
          <th>Height</th>
          <th>Weight</th>
          <th>Team</th>
          <th>Position</th>
          <th>Conference</th>
        </tr>
      </thead>
      <tbody>
        {props.players?.map((player) => (
          <tr key={player.id} onClick={() => props.handlePlayerClick(player.id)}>
            <td> 
              <a href="#" className="id-link">
                {player.id}
              </a>
            </td>
            <td>{`${player.first_name} ${player.last_name}`}</td>
            <td>{player.height_feet && player.height_inches ? `${player.height_feet}'${player.height_inches}` : ''}</td>
            <td>{player.weight_pounds ? player.weight_pounds : ''}</td>
            <td>{player.team.full_name ? player.team.full_name : ''}</td>
            <td>{player.position ? player.position : ''}</td>
            <td>{player.team.conference ? player.team.conference : ''}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default PlayerTable;