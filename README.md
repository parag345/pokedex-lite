# Pokédex Lite

A modern, responsive, and feature-rich Pokédex web application built with Next.js 13, TypeScript, and TailwindCSS. Browse, search, filter, and save your favorite Pokémon with a clean and intuitive interface.

![Pokédex Lite](https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

### Core Features

- **Pokemon Listing**: Browse through a grid of Pokémon with clean, responsive cards.
- **Real-time Search**: Instantly filter Pokémon by name as you type.
- **Type Filtering**: Filter Pokémon by single or multiple types (Fire, Water, Grass, etc.).
- **Pagination**: Navigate easily between pages.
- **Favorites System**: Save your favorite Pokémon to `localStorage`.
- **Detailed View**: Click on a Pokémon to open a modal with:
  - Official artwork  
  - Types  
  - Stats  
  - Abilities  
  - Height and weight  

### Additional Features

- **Smooth UI**: Fully responsive design (mobile → desktop)
- **Loading States**: Skeleton loaders while data is being fetched
- **Error Handling**: Clean error messages with retry option
- **SEO optimized** using Next.js metadata

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **API**: PokéAPI (https://pokeapi.co)
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Storage**: Browser localStorage (Favorites)

## Project Structure

pokedex-lite/
├── app/
│ ├── favorites/
│ │ └── page.tsx # Favorites page
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Home page (listing + filters)
│ ├── providers.tsx # Providers
│ └── globals.css # Global styles
├── components/
│ ├── ErrorMessage.tsx
│ ├── LoadingSkeleton.tsx
│ ├── Pagination.tsx
│ ├── PokemonCard.tsx
│ ├── PokemonGrid.tsx
│ ├── PokemonModal.tsx
│ ├── SearchBar.tsx
│ └── TypeFilter.tsx
├── hooks/
│ ├── useFavorites.ts
│ └── usePokemon.ts
├── services/
│ ├── api.ts
│ └── pokemonService.ts
├── utils/
│ └── types.ts
└── public/

bash
Copy code

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/parag345/pokedex-lite.git
cd pokedex-lite
Install dependencies:

bash
Copy code
npm install
Run the development server:

bash
Copy code
npm run dev
Open your browser:

arduino
Copy code
http://localhost:3000
Build for Production
bash
Copy code
npm run build
npm start
Type Checking
bash
Copy code
npm run typecheck
Key Features Explained
Search Functionality
Debounced search input for improved performance and reduced re-renders.

Type Filtering
Select one or multiple Pokémon types. The UI updates instantly with matching results.

Favorites System
Favorite Pokémon persist across sessions using localStorage. View them anytime on the Favorites Page.

Pokémon Detail Modal
Shows detailed information with a smooth UI experience:

Artwork

Stats

Types

Abilities

Physical attributes

Challenges & Solutions
Challenge 1: Fetching Pokémon Details Efficiently
Problem: API list endpoint doesn't include full Pokémon info.
Solution: Fetch list first, then fetch individual details using Promise.all().

Challenge 2: Filtering + Pagination
Problem: Search and type filters shouldn't interfere with pagination.
Solution: Filters apply on fetched data, and pagination is disabled when filters are active.

Challenge 3: Loading Many Favorites
Problem: Multiple API requests for each favorited Pokémon.
Solution: Parallel fetching with skeleton loaders for smooth UX.

Performance Optimizations
Debounced search

Memoized filtered lists

Lazy-loaded Pokémon details

Shallow renders using useCallback

Optimized static image sizing

Browser Support
Chrome

Firefox

Safari

Edge

API Reference
This project uses the PokéAPI:

GET /pokemon?limit=20&offset=0

GET /pokemon/{id}

GET /type

GET /type/{name}

Future Enhancements
 Infinite scrolling

 Compare Pokémon

 Evolution chain

 Audio (Pokémon cries)

 Dark mode

 PWA (offline use)

 Advanced filters

Deployment
Deploy on Vercel
Push repository to GitHub

Import project to Vercel

Deploy using the default Next.js configuration

Contact
Parag Mittal
Repository: https://github.com/parag345/pokedex-lite

Screenshots
Home Page
Browse and search Pokémon in a clean UI.

Favorites Page
Access your saved Pokémon.

Pokémon Detail Modal
Full detail view with artwork and stats.