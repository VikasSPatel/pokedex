import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import PokemonItem from './PokemonItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Pokemon, PokemonListProps } from '../../types/pokemonTypes';
import { Link } from 'react-router-dom';
import Loader from '../common/Loader';
import { Box, TextField, Typography } from '@material-ui/core';

const PokemonList: React.FC<PokemonListProps> = ({ onPokemonClick }) => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const loadMorePokemons = useCallback(() => {
    if (pokemons && pokemons.length > displayedPokemons.length) {
      setDisplayedPokemons((prev) => [
        ...prev,
        ...pokemons.slice(prev.length, prev.length + 10),
      ]);
    }
  }, [pokemons, displayedPokemons]);

  useEffect(() => {
    const newObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMorePokemons();
      }
    });

    setObserver(newObserver);

    return () => {
      newObserver.disconnect();
    };
  }, [loadMorePokemons]);

  useEffect(() => {
    if (pokemons.length) {
      setDisplayedPokemons(pokemons.slice(0, 10));
    }
  }, [pokemons]);

  const filteredPokemons = displayedPokemons.filter((pokemon) => {
    const query = debouncedSearch.toLowerCase();
    return (
      pokemon.name.toLowerCase().includes(query) ||
      pokemon.number.includes(query) ||
      pokemon.types.some((type) => type.toLowerCase().includes(query))
    );
  });

  return (
    <>
      <Box className={classes.searchContainer}>
        <TextField
          placeholder="Search by name, type, or number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={classes.searchInput}
          variant="outlined"
        />
      </Box>
      {loading && <Loader />}
      {filteredPokemons.length > 0 ? (
        <TransitionGroup className={classes.root}>
          {filteredPokemons.map((pkmn) => (
            <CSSTransition
              key={pkmn.id}
              timeout={500}
              classNames={{
                enter: classes.fadeEnter,
                enterActive: classes.fadeEnterActive,
                exit: classes.fadeExit,
                exitActive: classes.fadeExitActive,
              }}
            >
              <Link
                to={`/pokemon/${pkmn.name}`}
                onClick={() => onPokemonClick(pkmn.name)}
                className={classes.cardLink}
              >
                <PokemonItem pokemon={pkmn} />
              </Link>
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        !loading && (
          <>
            {search && filteredPokemons.length === 0 && (
              <Box className={classes.noResults}>
                Oops! This Pokémon isn't listed in the Pokédex.
              </Box>
            )}
            {!search && pokemons.length === 0 && (
              <Box className={classes.noResults}>
                No Data Found! Please try again later.
              </Box>
            )}
          </>
        )
      )}
      <div
        ref={(el) => {
          if (el) observer?.observe(el);
        }}
      />
    </>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 30,
      padding: '2rem',
      justifyItems: 'center',
      position: 'relative',
    },
    searchInput: {
      padding: '0.5rem 1rem',
      border: '1px solid #ccc',
      width: '100%',
      color: '#000',
      height: 40,
      '& .MuiInputBase-root': {
        backgroundColor: '#fff',
        borderRadius: 8,
      },
    },
    searchContainer: {
      marginTop: 15,
      marginInline: 32,
    },
    fadeEnter: {
      opacity: 0,
      transform: 'scale(0.95)',
    },
    fadeEnterActive: {
      opacity: 1,
      transform: 'scale(1)',
      transition: 'opacity 500ms, transform 500ms',
    },
    fadeExit: {
      opacity: 1,
    },
    fadeExitActive: {
      opacity: 0,
      transform: 'scale(0.95)',
      transition: 'opacity 500ms, transform 500ms',
    },
    noResults: {
      textAlign: 'center',
      marginTop: '2rem',
      color: '#666',
      fontSize: '1.2rem',
    },
    cardLink: {
      textDecoration: 'none',
    },
  },
  { name: 'PokemonList' }
);

export default PokemonList;
