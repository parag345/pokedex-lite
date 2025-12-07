'use client';

import { Pokemon, TYPE_COLORS } from '@/utils/types';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onClick: () => void;
}

export function PokemonCard({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onClick,
}: PokemonCardProps) {
  const imageUrl =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default ||
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 border border-gray-100"
      onClick={onClick}
    >
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(pokemon.id);
          }}
          className={`p-2 rounded-full transition-all duration-200 ${
            isFavorite
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-white/90 text-gray-400 hover:bg-red-50 hover:text-red-500'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className="w-5 h-5"
            fill={isFavorite ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center h-48">
        <img
          src={imageUrl}
          alt={pokemon.name}
          className="w-32 h-32 object-contain drop-shadow-lg transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 capitalize">
            {pokemon.name}
          </h3>
          <span className="text-sm text-gray-500 font-semibold">
            #{String(pokemon.id).padStart(3, '0')}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {pokemon.types?.map((typeInfo) => (
            <span
              key={typeInfo.slot}
              className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                TYPE_COLORS[typeInfo.type.name] || 'bg-gray-400'
              }`}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
