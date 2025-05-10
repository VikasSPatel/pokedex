export type Pokemon = {
  id: string;
  name: string;
  classification: string;
  types: Array<string>;
  image: string;
  number: string;
};

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
};

export interface PokemonDetails {
  id: string;
  number: string;
  name: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
}
