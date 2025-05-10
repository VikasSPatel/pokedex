import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import PokemonItem from '../PokemonItem/PokemonItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PokemonDetailsDialog from '../PokemonDetailsDialog/PokemonDetailsDialog';
import { Pokemon } from '../../types/pokemonTypes';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedPokemonId, setSelectedPokemonId] = useState<string | null>(
    null
  );
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);

  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const loadMorePokemons = useCallback(() => {
    // Logic for lazy loading as you scroll
    if (pokemons && pokemons.length > displayedPokemons.length) {
      setDisplayedPokemons((prev) => [
        ...prev,
        ...pokemons.slice(prev.length, prev.length + 10), // Show 10 more at a time
      ]);
    }
  }, [pokemons, displayedPokemons]);

  useEffect(() => {
    // Initialize Intersection Observer for lazy loading
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
    // Load initial data when the component mounts
    if (pokemons.length) {
      setDisplayedPokemons(pokemons.slice(0, 10)); // Show first 10 items
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
  // Handle opening dialog when a Pokémon is clicked
  const handlePokemonClick = (id: string) => {
    setSelectedPokemonId(id); // Set the selected Pokémon's id
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setSelectedPokemonId(null);
  };

  return (
    <>
      <div className={classes.searchContainer}>
        <input
          type="text"
          placeholder="Search by name, type, or number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={classes.searchInput}
        />
      </div>
      {(loading || loadingDetails) && (
        <div className={classes.container}>
          <div className={classes.ball}></div>
        </div>
      )}
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
              <PokemonItem
                pokemon={pkmn}
                onClick={() => handlePokemonClick(pkmn.id)} // Trigger on click
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        !loading &&
        (search ? (
          <div className={classes.noResults}>
            Oops! This Pokémon isn't listed in the Pokédex.
          </div>
        ) : (
          <div className={classes.noResults}>
            No Data Found! Please try again later.
          </div>
        ))
      )}
      <div
        ref={(el) => {
          if (el) observer?.observe(el);
        }}
      />
      {selectedPokemonId && (
        <PokemonDetailsDialog
          open={Boolean(selectedPokemonId)}
          onClose={handleCloseDialog}
          pokemonId={selectedPokemonId} // Pass the ID to the dialog to fetch details
          showLoader={setLoadingDetails} // Pass the loading state to the dialog
        />
      )}
    </>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 20,
      padding: '2rem',
      justifyItems: 'center',
      position: 'relative',
    },
    searchInput: {
      padding: '0.5rem 1rem',
      borderRadius: 8,
      border: '1px solid #ccc',
      width: '100%',
      color: '#000',
      height: 40,
    },
    searchContainer: {
      marginTop: 15,
      marginInline: 32,
    },
    // Transition group styles
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

    '@keyframes roll': {
      from: { transform: 'rotate(0)' },
      '90%': { transform: 'rotate(720deg)' },
      to: { transform: 'rotate(720deg)' },
    },

    '@keyframes button': {
      from: { boxShadow: '0 0 8px -1px #c62828 inset' },
      '25%': { boxShadow: '0 0 6px -1px #1300ea inset' },
      '50%': { boxShadow: '0 0 8px -1px #c62828 inset' },
      '75%': { boxShadow: '0 0 6px -1px #1300ea inset' },
      to: { boxShadow: '0 0 8px -1px #c62828 inset' },
    },

    container: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },

    ball: {
      width: 60, // Reduced width to 60px
      height: 60, // Reduced height to 60px
      borderRadius: '50%',
      position: 'relative',
      background:
        'linear-gradient(to bottom, #e83e35 0%, #e83e35 50.5%, #ffffff 50.51%, #ffffff 100%)',
      boxShadow: '-6px 0 rgba(0, 0, 0, 0.1) inset',
      animation: '$roll 1s ease-in-out infinite',

      '&::after': {
        content: '""',
        position: 'absolute',
        top: 'calc(30px - 2px)', // Adjusted for smaller size
        left: 0,
        width: 60, // Reduced width to match the ball
        height: 4,
        background: '#3f3f3f',
      },

      '&::before': {
        content: '""',
        position: 'absolute',
        top: 20, // Adjusted for smaller size
        left: 20, // Adjusted for smaller size
        width: 15, // Smaller inner circle width
        height: 15, // Smaller inner circle height
        border: '3px solid #3f3f3f',
        borderRadius: '50%',
        background: 'white',
        zIndex: 1,
        boxShadow: '0 0 8px -1px #c62828 inset',
        animation: '$button 3s ease infinite',
      },
    },
    loadMoreContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 40,
    },
    loadMoreButton: {
      margin: '2rem auto',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      borderRadius: 8,
      border: 'none',
      backgroundColor: '#3f51b5',
      color: '#fff',
      cursor: 'pointer',
      transition: 'background 0.3s',
      '&:hover': {
        backgroundColor: '#2c3ea8',
      },
      alignContent: 'center',
    },
    noResults: {
      textAlign: 'center',
      marginTop: '2rem',
      color: '#666',
      fontSize: '1.2rem',
    },
  },
  { name: 'PokemonList' }
);
