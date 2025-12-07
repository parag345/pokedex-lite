'use client';

import { PokemonDetail, TYPE_COLORS } from '@/utils/types';
import { X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PokemonModalProps {
  pokemon: PokemonDetail | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function PokemonModal({
  pokemon,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}: PokemonModalProps) {
  if (!pokemon) return null;

  const imageUrl =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default;

  const statNames: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                <h2 className="text-2xl font-bold text-gray-800 capitalize">
                  {pokemon.name}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleFavorite(pokemon.id)}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isFavorite
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={isFavorite ? 'currentColor' : 'none'}
                    />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 flex items-center justify-center">
                      <img
                        src={imageUrl}
                        alt={pokemon.name}
                        className="w-48 h-48 object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                        Pokédex Number
                      </h3>
                      <p className="text-2xl font-bold text-gray-800">
                        #{String(pokemon.id).padStart(3, '0')}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                        Types
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {pokemon.types.map((typeInfo) => (
                          <span
                            key={typeInfo.slot}
                            className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${
                              TYPE_COLORS[typeInfo.type.name] || 'bg-gray-400'
                            }`}
                          >
                            {typeInfo.type.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                          Height
                        </h3>
                        <p className="text-xl font-bold text-gray-800">
                          {(pokemon.height / 10).toFixed(1)} m
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                          Weight
                        </h3>
                        <p className="text-xl font-bold text-gray-800">
                          {(pokemon.weight / 10).toFixed(1)} kg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Abilities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map((abilityInfo) => (
                      <span
                        key={abilityInfo.slot}
                        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium capitalize"
                      >
                        {abilityInfo.ability.name.replace('-', ' ')}
                        {abilityInfo.is_hidden && (
                          <span className="ml-1 text-xs">(Hidden)</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Base Stats
                  </h3>
                  <div className="space-y-3">
                    {pokemon.stats.map((statInfo) => {
                      const percentage = Math.min(
                        (statInfo.base_stat / 255) * 100,
                        100
                      );
                      return (
                        <div key={statInfo.stat.name}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 capitalize">
                              {statNames[statInfo.stat.name] || statInfo.stat.name}
                            </span>
                            <span className="text-sm font-bold text-gray-800">
                              {statInfo.base_stat}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                              className={`h-full rounded-full ${
                                statInfo.base_stat >= 100
                                  ? 'bg-green-500'
                                  : statInfo.base_stat >= 60
                                  ? 'bg-blue-500'
                                  : 'bg-yellow-500'
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
