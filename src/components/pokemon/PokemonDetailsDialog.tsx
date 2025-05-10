import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Box,
} from '@material-ui/core';
import { useGetPokemonDetails } from '../../hooks/useGetPokemonDetails';
import { createUseStyles } from 'react-jss';
import pokeColor from '../../utils/pokeColor';
import { PokemonDetailsDialogProps } from '../../types/pokemonTypes';
import Loader from '../common/Loader';

const PokemonDetailsDialog: React.FC<PokemonDetailsDialogProps> = ({
  pokemonName,
  onClose,
}) => {
  const classes = useStyles();
  const { pokemon, loading, error } = useGetPokemonDetails(
    undefined,
    pokemonName
  );

  if (loading) {
    return <Loader />;
  }

  if (!pokemon) return null;

  return (
    <Dialog open onClose={onClose} maxWidth="md">
      <DialogTitle className={`${classes.bg} ${classes.borderBottom}`}>
        <section className={classes.dialogTitle}>
          <Typography variant="h4">{pokemon?.name}</Typography>
          <Typography variant="h6">#{pokemon?.number}</Typography>
        </section>
      </DialogTitle>
      <DialogContent className={classes.root}>
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12} sm={6}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${parseInt(
                pokemon.number,
                10
              )}.png`}
              alt={pokemon?.name}
              className={classes.image}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card
              variant="outlined"
              className={`${classes.card} ${classes.bg}`}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  className={`${classes.section} ${classes.classification}`}
                >
                  <strong>{pokemon?.classification}</strong>
                </Typography>

                <Typography variant="body2" className={classes.section}>
                  <p>
                    <strong>Types:</strong>
                  </p>
                  {pokemon?.types?.map((type) => (
                    <Chip
                      key={type}
                      label={type}
                      className={classes.chip}
                      style={{
                        backgroundColor:
                          pokeColor[type.toLowerCase()] || '#ccc',
                        color: '#fff',
                      }}
                    />
                  ))}
                </Typography>

                <Typography variant="body2" className={classes.section}>
                  <strong>Height:</strong> {pokemon?.height?.minimum} -{' '}
                  {pokemon?.height?.maximum}
                </Typography>

                <Typography variant="body2" className={classes.section}>
                  <strong>Weight:</strong> {pokemon?.weight?.minimum} -{' '}
                  {pokemon?.weight?.maximum}
                </Typography>
                <Box className={classes.section}>
                  <Typography variant="body2">
                    <strong>Resistant:</strong>
                  </Typography>
                  {pokemon?.resistant?.map((type) => (
                    <Chip
                      key={type}
                      label={type}
                      className={classes.chip}
                      style={{
                        backgroundColor:
                          pokeColor[type.toLowerCase()] || '#ccc',
                        color: '#fff',
                      }}
                    />
                  ))}
                </Box>
                <Box className={classes.section}>
                  <Typography variant="body2" className={classes.section}>
                    <strong>Weaknesses:</strong>
                  </Typography>
                  {pokemon?.weaknesses?.map((type) => (
                    <Chip
                      key={type}
                      label={type}
                      className={classes.chip}
                      style={{
                        backgroundColor:
                          pokeColor[type.toLowerCase()] || '#ccc',
                        color: '#fff',
                      }}
                    />
                  ))}
                </Box>

                <Box className={classes.section}>
                  <Typography variant="body2">
                    <strong>Flee Rate:</strong> {pokemon?.fleeRate}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Max CP:</strong> {pokemon?.maxCP}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Max HP:</strong> {pokemon?.maxHP}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={`${classes.bg} ${classes.borderTop}`}>
        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          className={classes.buttonClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      backgroundColor: '#171E2B',
      color: '#fff',
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dialogTitle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    image: {
      width: 250,
      height: 250,
      borderRadius: 16,
      display: 'block',
      margin: 'auto',
    },
    chip: {
      marginRight: 8,
      marginBottom: 8,
      backgroundColor: '#efefef',
      fontWeight: 500,
    },
    card: {
      backgroundColor: '#171E2B',
      color: '#fff',
    },
    classification: {
      '&.MuiTypography-body2': {
        fontSize: '1.5rem',
      },
    },
    section: {
      '&.MuiTypography-body2': {
        marginTop: 15,
        marginBottom: 15,
      },
    },
    bg: {
      '&.MuiPaper-root, &.MuiDialogTitle-root, &.MuiDialogActions-root': {
        backgroundColor: '#171E2B',
        color: '#fff',
      },
      '&.MuiPaper-outlined': {
        border: 0,
      },
    },
    borderTop: {
      borderTop: '1px solid #ccc',
    },
    borderBottom: {
      borderBottom: '1px solid #ccc',
    },
    buttonClose: {
      paddingLeft: 32,
      paddingRight: 32,
    },
  },
  { name: 'ListPage' }
);

export default PokemonDetailsDialog;
