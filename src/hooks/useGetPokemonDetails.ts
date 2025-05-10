import { gql, useQuery } from '@apollo/client';
import { PokemonDetails } from '../types/pokemonTypes';
import { useMemo } from 'react';

export const GET_POKEMON_DETAILS = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemonDetails = (id?: string, name?: string) => {
  const { data, loading, error } = useQuery(GET_POKEMON_DETAILS, {
    variables: { id, name },
    skip: !id && !name, // skip query if no id or name
  });

  const pokemon: PokemonDetails = useMemo(() => data?.pokemon || [], [data]);

  return {
    pokemon,
    loading,
    error,
  };
};
