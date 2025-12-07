"use client";

import { useState, useEffect, useCallback } from "react";
import { pokemonService } from "@/services/pokemonService";
import { Pokemon, PokemonDetail, PokemonType } from "@/utils/types";

function extractIdFromUrl(url?: string): number | undefined {
  if (!url) return undefined;
  const parts = url.split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  const id = Number(last);
  return Number.isFinite(id) ? id : undefined;
}

function normalizeToPokemon(p: {
  name: string;
  url: string;
  id?: number;
  types?: PokemonType[];
  sprites?: any;
}): Pokemon {
  const id = p.id ?? extractIdFromUrl(p.url) ?? -1;
  const sprites = p.sprites ?? {
    front_default: "",
    other: { "official-artwork": { front_default: "" } },
  };
  const types = p.types ?? [];
  return {
    name: p.name,
    url: p.url,
    id,
    types,
    sprites,
  };
}

export function usePokemonList(
  limit: number = 20,
  searchQuery: string = "",
  selectedTypes: string[] = []
) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let allPokemon: Pokemon[] = [];
      let count = 0;

      if (searchQuery.trim()) {
        try {
          const detail = await pokemonService.searchPokemon(searchQuery);
          allPokemon = [
            {
              name: detail.name,
              url: `https://pokeapi.co/api/v2/pokemon/${detail.id}/`,
              id: detail.id,
              types: detail.types,
              sprites: detail.sprites,
            },
          ];
          count = 1;
        } catch {
          const data = await pokemonService.getPokemonList(1000, 0);
          const filtered = data.results.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

          const detailedPokemon = await Promise.all(
            filtered.slice(offset, offset + limit).map(async (p) => {
              try {
                const detail = await pokemonService.getPokemonDetail(p.name);
                return {
                  name: detail.name,
                  url: `https://pokeapi.co/api/v2/pokemon/${detail.id}/`,
                  id: detail.id,
                  types: detail.types,
                  sprites: detail.sprites,
                } as Pokemon;
              } catch {
                return normalizeToPokemon(p);
              }
            })
          );

          allPokemon = detailedPokemon;
          count = filtered.length;
        }
      } else if (selectedTypes.length > 0) {
        const typeData = await pokemonService.getPokemonByType(
          selectedTypes[0]
        );
        let typePokemon = typeData.pokemon.map((p) => ({
          name: p.pokemon.name,
          url: p.pokemon.url,
        }));

        if (selectedTypes.length > 1) {
          const detailedChecks = await Promise.all(
            typePokemon.map(async (p) => {
              try {
                const detail = await pokemonService.getPokemonDetail(p.name);
                const hasAllTypes = selectedTypes.every((type) =>
                  detail.types.some((t) => t.type.name === type)
                );
                return hasAllTypes ? detail : null;
              } catch {
                return null;
              }
            })
          );

          const validPokemon = detailedChecks.filter(
            (p): p is PokemonDetail => p !== null
          );
          allPokemon = validPokemon
            .slice(offset, offset + limit)
            .map((detail) => ({
              name: detail.name,
              url: `https://pokeapi.co/api/v2/pokemon/${detail.id}/`,
              id: detail.id,
              types: detail.types,
              sprites: detail.sprites,
            }));
          count = validPokemon.length;
        } else {
          const paginatedPokemon = typePokemon.slice(offset, offset + limit);

          const detailedPokemon = await Promise.all(
            paginatedPokemon.map(async (p) => {
              try {
                const detail = await pokemonService.getPokemonDetail(p.name);
                return {
                  name: detail.name,
                  url: `https://pokeapi.co/api/v2/pokemon/${detail.id}/`,
                  id: detail.id,
                  types: detail.types,
                  sprites: detail.sprites,
                } as Pokemon;
              } catch {
                return normalizeToPokemon(p);
              }
            })
          );

          allPokemon = detailedPokemon;
          count = typePokemon.length;
        }
      } else {
        const data = await pokemonService.getPokemonList(limit, offset);
        count = data.count;

        const detailedPokemon = await Promise.all(
          data.results.map(async (p) => {
            try {
              const detail = await pokemonService.getPokemonDetail(p.name);
              return {
                name: detail.name,
                url: `https://pokeapi.co/api/v2/pokemon/${detail.id}/`,
                id: detail.id,
                types: detail.types,
                sprites: detail.sprites,
              } as Pokemon;
            } catch {
              return normalizeToPokemon(p);
            }
          })
        );

        allPokemon = detailedPokemon;
      }

      setPokemon(allPokemon);
      setTotalCount(count);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch Pokémon");
    } finally {
      setLoading(false);
    }
  }, [limit, offset, searchQuery, selectedTypes]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  useEffect(() => {
    setOffset(0);
  }, [searchQuery, selectedTypes]);

  const nextPage = () => {
    if (offset + limit < totalCount) {
      setOffset((prev) => prev + limit);
    }
  };

  const prevPage = () => {
    if (offset > 0) {
      setOffset((prev) => Math.max(0, prev - limit));
    }
  };

  const goToPage = (page: number) => {
    setOffset(page * limit);
  };

  const currentPage = Math.floor(offset / limit);
  const totalPages = Math.ceil(totalCount / limit);

  return {
    pokemon,
    loading,
    error,
    nextPage,
    prevPage,
    goToPage,
    currentPage,
    totalPages,
    hasNext: offset + limit < totalCount,
    hasPrev: offset > 0,
    refetch: fetchPokemon,
  };
}

export function usePokemonDetail(nameOrId: string | number | null) {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nameOrId) {
      setPokemon(null);
      return;
    }

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await pokemonService.getPokemonDetail(nameOrId);
        setPokemon(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch Pokémon details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [nameOrId]);

  return { pokemon, loading, error };
}

export function usePokemonTypes() {
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await pokemonService.getTypes();
        setTypes(data.results.map((t) => t.name));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch types");
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  return { types, loading, error };
}
