'use client';

import { Pokemon } from '@/utils/types';
import { PokemonCard } from './PokemonCard';

interface PokemonGridProps {
  pokemon: Pokemon[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onPokemonClick: (pokemon: Pokemon) => void;
}

export function PokemonGrid({
  pokemon,
  favorites,
  onToggleFavorite,
  onPokemonClick,
}: PokemonGridProps) {
  if (pokemon.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No Pokémon found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          isFavorite={favorites.includes(p.id)}
          onToggleFavorite={onToggleFavorite}
          onClick={() => onPokemonClick(p)}
        />
      ))}
    </div>
  );
}
