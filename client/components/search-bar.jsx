import React from 'react';

const SearchBar = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <label>
          <input type="text" value={props.name} onChange={props.handleChange} placeholder="Player's Name"/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
}

export default SearchBar;