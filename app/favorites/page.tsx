'use client';

import { useState, useEffect, useCallback } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { pokemonService } from '@/services/pokemonService';
import { PokemonGrid } from '@/components/PokemonGrid';
import { PokemonModal } from '@/components/PokemonModal';
import { PokemonGridSkeleton } from '@/components/LoadingSkeleton';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Pokemon, PokemonDetail } from '@/utils/types';
import { usePokemonDetail } from '@/hooks/usePokemon';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, toggleFavorite, isFavorite, isLoaded } = useFavorites();
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const { pokemon: pokemonDetail } = usePokemonDetail(
    selectedPokemon?.name || null
  );

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isLoaded) return;

      if (favorites.length === 0) {
        setFavoritePokemon([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const pokemonData = await Promise.all(
          favorites.map(async (id) => {
            const detail = await pokemonService.getPokemonDetail(id);
            return {
              id: detail.id,
              name: detail.name,
              url: `https://pokeapi.co/api/v2/pokemon/${id}`,
              types: detail.types,
              sprites: detail.sprites,
            };
          })
        );
        setFavoritePokemon(pokemonData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load favorite Pokémon'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites, isLoaded]);

  const handlePokemonClick = useCallback((p: Pokemon) => {
    setSelectedPokemon(p);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPokemon(null);
  }, []);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (loading) {
    return <PokemonGridSkeleton count={favorites.length || 6} />;
  }

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            No Favorites Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start exploring and add your favorite Pokémon by clicking the heart icon
            on any Pokémon card.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Explore Pokémon
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3">
          <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Your Favorite Pokémon
            </h1>
            <p className="text-gray-600 text-sm">
              You have {favorites.length} favorite{favorites.length !== 1 && 's'}
            </p>
          </div>
        </div>
      </div>

      <PokemonGrid
        pokemon={favoritePokemon}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onPokemonClick={handlePokemonClick}
      />

      <PokemonModal
        pokemon={pokemonDetail}
        isOpen={!!selectedPokemon && !!pokemonDetail}
        onClose={handleCloseModal}
        isFavorite={pokemonDetail ? isFavorite(pokemonDetail.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
