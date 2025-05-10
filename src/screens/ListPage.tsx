import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import PokemonList from '../components/pokemon/PokemonList';
import PokemonDetailsDialog from '../components/pokemon/PokemonDetailsDialog';
import { useNavigate, useParams } from 'react-router-dom';

const ListPage = () => {
  const classes = useStyles();
  const { name } = useParams();
  const navigate = useNavigate();

  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(
    name || null
  );

  const closeDialog = () => {
    setSelectedPokemon(null);
    navigate('/pokemon');
  };

  useEffect(() => {
    setSelectedPokemon(name || null);
  }, [name]);

  return (
    <div className={classes.root}>
      <PokemonList
        onPokemonClick={(pokemonName) => setSelectedPokemon(pokemonName)}
      />
      {selectedPokemon && (
        <PokemonDetailsDialog
          pokemonName={selectedPokemon}
          onClose={closeDialog}
        />
      )}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
    },
  },
  { name: 'ListPage' }
);

export default ListPage;
