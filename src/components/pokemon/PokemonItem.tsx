import React from 'react';
import { createUseStyles } from 'react-jss';
import pokeColor from '../../utils/pokeColor';
import { Pokemon } from '../../types/pokemonTypes';
import { Box, Typography } from '@material-ui/core';

function PokemonItem({ pokemon }: { pokemon: Pokemon }) {
  const classes = useStyles({ type: pokemon.types[0] });

  return (
    <Box className={classes.pokeCard}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${parseInt(
          pokemon.number,
          10
        )}.png`}
        alt={pokemon.name}
        className={`${classes.pokeImage} ${classes.pokeImageHover}`}
      />
      <Typography className={classes.backgroundOverlay} />
      <Typography className={classes.pokeName}>{pokemon.name}</Typography>
      <Typography className={classes.pokeNumber}>#{pokemon.number}</Typography>
      <Box className={classes.pokeTypes}>
        {pokemon.types.map((type, idx) => (
          <Typography key={idx} className={classes.pokeTypeTag}>
            {type}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

const useStyles = createUseStyles(
  {
    pokeCard: {
      borderRadius: 20,
      padding: '1rem',
      textAlign: 'center',
      width: 200,
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      cursor: 'pointer',
      alignItems: 'center',
      backgroundImage: `url('/pokeball-white.png') 0.5`,
      backgroundColor: (props: { type: string }) =>
        pokeColor[props.type.toLowerCase()] || '#fff',
      transition:
        'transform 0.3s ease, box-shadow 0.3s ease,  opacity 0.3s ease',

      '& $backgroundOverlay': {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url('/pokeball-white.png')`,
        backgroundSize: 'cover',
        backgroundPosition: '75px 100px',
        backgroundRepeat: 'no-repeat',
        opacity: 0.05,
      },

      '& $pokeName': {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'capitalize',
        marginBottom: 5,
      },
      '& $pokeNumber': {
        color: 'white',
        fontSize: 14,
        marginBottom: 10,
      },
      '& $pokeTypes': {
        display: 'flex',
        gap: 5,
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      '& $pokeTypeTag': {
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: '5px 15px',
        borderRadius: 20,
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
      },
      '& $pokeImage': {
        width: 100,
        height: 100,
        objectFit: 'contain',
        marginBottom: 10,
        transition: 'transform 0.7s ease-in-out',
      },

      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',

        '& $pokeImageHover': {
          transform: 'scale(1.1)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0)',
        },
      },
    },
    backgroundOverlay: {},
    pokeImage: {},
    pokeName: {},
    pokeNumber: {},
    pokeTypes: {},
    pokeTypeTag: {},
    pokeImageHover: {},
  },
  { name: 'PokemonItem' }
);

export default PokemonItem;
