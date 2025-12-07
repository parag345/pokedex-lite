"use client";

import { useState, useCallback } from "react";
import { usePokemonList, usePokemonTypes } from "@/hooks/usePokemon";
import { useFavorites } from "@/hooks/useFavorites";
import { PokemonGrid } from "@/components/PokemonGrid";
import { SearchBar } from "@/components/SearchBar";
import { TypeFilter } from "@/components/TypeFilter";
import { Pagination } from "@/components/Pagination";
import { PokemonModal } from "@/components/PokemonModal";
import { PokemonGridSkeleton } from "@/components/LoadingSkeleton";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Pokemon } from "@/utils/types";
import { usePokemonDetail } from "@/hooks/usePokemon";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const {
    pokemon,
    loading,
    error,
    nextPage,
    prevPage,
    goToPage,
    currentPage,
    totalPages,
    hasNext,
    hasPrev,
    refetch,
  } = usePokemonList(20, searchQuery, selectedTypes);

  const { types, loading: typesLoading } = usePokemonTypes();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { pokemon: pokemonDetail, loading: detailLoading } = usePokemonDetail(
    selectedPokemon?.name || null
  );

  const handlePokemonClick = useCallback((p: Pokemon) => {
    setSelectedPokemon(p);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPokemon(null);
  }, []);

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 w-full lg:w-auto">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search Pokémon by name..."
            />
          </div>

          <div className="text-sm text-gray-600 font-medium">
            Showing {pokemon.length} Pokémon
            {(searchQuery || selectedTypes.length > 0) && ` (filtered)`}
          </div>
        </div>

        {!typesLoading && types.length > 0 && (
          <div className="mt-4">
            <TypeFilter
              types={types}
              selectedTypes={selectedTypes}
              onChange={setSelectedTypes}
            />
          </div>
        )}
      </div>

      {loading ? (
        <PokemonGridSkeleton />
      ) : (
        <>
          <PokemonGrid
            pokemon={pokemon}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onPokemonClick={handlePokemonClick}
          />

          {pokemon.length > 0 && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              hasNext={hasNext}
              hasPrev={hasPrev}
            />
          )}

          {pokemon.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No Pokémon found matching your criteria
              </p>
            </div>
          )}
        </>
      )}

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
