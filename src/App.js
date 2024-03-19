import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './App.css';

const StyledAPI = styled.div`
  font-size: 30px;
  text-align: center;
`;
const StyledPokemon = styled.div`
  font-size: 30px;
  text-align: center;
`;

const Styledbutton = styled.button`
  height: 40px;
  width: 180px;
  margin: auto; 
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #2965f1; 
  color: #ffffff; 
  transition: background-color 0.3s ease;
  display: block;
  &:hover {border: 3px solid #a4bcf4; };
`;

const Dataframe = styled.div`
  border: 2px solid #13790c;
  border-radius: 5px;
  padding: 5px;
  margin: 5px; 
  background-color: #90db57;
  text-align: left;
  width: 390px; 
  @media (min-width: 576px) {
    margin: 5px auto;
  }
`;

const Photoframe = styled.div`
  width: 200px;
  background-color: #ffffff;
  text-align: left;
`;


function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [showPokemon, setShowPokemon] = useState(false);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151');
      setPokemonList(response.data.results);
    };
    fetchPokemonList();
  }, []);

  const ButtonClick = async () => {
    if (!showPokemon) {
      const response = await Promise.all(pokemonList.map(async (pokemon) => {
        const detailRes = await axios.get(pokemon.url);
        return detailRes.data;
      }));
      setPokemonList(response);
      setShowPokemon(true);
    }
  };

  return (
    <div>
      <div class="StyledAPI">API</div>
      <div class="StyledPokemon">Pokemon</div>
      <div class="Styledbutton" onClick={ButtonClick}>Get pokemon dex</div>
      {showPokemon && pokemonList.map((pokemon, index) => (
        <div class="Dataframe" key={index}>
          <div class="Photoframe" key={index}>
            <img src={pokemon.sprites.front_default} alt={`${pokemon.name} front`} />
            <img src={pokemon.sprites.back_default} alt={`${pokemon.name} back`} />
          </div>
          <div><strong>Name:</strong> <span style={{ textTransform: 'uppercase' }}>{pokemon.name}</span></div>
          <div><strong>Type 1:</strong> {pokemon.types[0].type.name}</div>
          {pokemon.types[1] && <div><strong>Type 2:</strong> {pokemon.types[1].type.name}</div>}
          <div><strong>Base Stats:</strong></div>
          {pokemon.stats.map(stat => (
            <div key={stat.stat.name}>{stat.stat.name} = {stat.base_stat}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
