import { api } from './api';
import {
  PokemonListResponse,
  PokemonDetail,
  TypeListResponse,
  TypeResponse,
} from '@/utils/types';

export const pokemonService = {
  getPokemonList: async (
    limit: number = 20,
    offset: number = 0
  ): Promise<PokemonListResponse> => {
    return api.get<PokemonListResponse>(
      `/pokemon?limit=${limit}&offset=${offset}`
    );
  },

  getPokemonDetail: async (nameOrId: string | number): Promise<PokemonDetail> => {
    return api.get<PokemonDetail>(`/pokemon/${nameOrId}`);
  },

  getTypes: async (): Promise<TypeListResponse> => {
    return api.get<TypeListResponse>('/type');
  },

  getPokemonByType: async (typeName: string): Promise<TypeResponse> => {
    return api.get<TypeResponse>(`/type/${typeName}`);
  },

  searchPokemon: async (name: string): Promise<PokemonDetail> => {
    return api.get<PokemonDetail>(`/pokemon/${name.toLowerCase()}`);
  },
};
