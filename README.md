# Pokédex Lite

### A modern, responsive, and feature-rich Pokédex web application built with Next.js 13, TypeScript, and TailwindCSS

Browse, search, filter, and save your favorite Pokémon with a beautiful, production-ready interface

![Pokédex Lite](https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

---

## Features

### Core Features

- **Pokémon Listing** - Browse through a comprehensive grid of Pokémon with clean cards
- **Real-time Search** - Instantly filter Pokémon by name with debounced input
- **Type Filtering** - Filter Pokémon by one or multiple types (Fire, Water, Grass, etc.)
- **Pagination** - Navigate through pages seamlessly
- **Favorites System** - Save Pokémon to localStorage with a dedicated Favorites page

### Detailed View Modal

- High-quality official artwork
- Types with color-coded badges
- Height and weight
- Base stats
- Abilities (including hidden abilities)

### Additional UI Features

- Fully **responsive design** (mobile to desktop)
- Clean **loading skeletons**
- Friendly **error messages** with retry
- SEO-friendly layout using Next.js metadata

---

## Tech Stack

| Category             | Technology                   |
| -------------------- | ---------------------------- |
| **Framework**        | Next.js 13 (App Router)      |
| **Language**         | TypeScript                   |
| **Styling**          | TailwindCSS                  |
| **API**              | PokéAPI (https://pokeapi.co) |
| **Icons**            | Lucide React                 |
| **State Management** | React Hooks                  |
| **Storage**          | localStorage (Favorites)     |

---

## Project Structure

```
pokedex-lite/
├── app/
│   ├── favorites/
│   │   └── page.tsx              # Favorites page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page (grid, search, filters)
│   ├── providers.tsx              # Provider wrappers
│   └── globals.css                # Global styles
├── components/
│   ├── ErrorMessage.tsx
│   ├── LoadingSkeleton.tsx
│   ├── Pagination.tsx
│   ├── PokemonCard.tsx
│   ├── PokemonGrid.tsx
│   ├── PokemonModal.tsx
│   ├── SearchBar.tsx
│   └── TypeFilter.tsx
├── hooks/
│   ├── useFavorites.ts
│   └── usePokemon.ts
├── services/
│   ├── api.ts
│   └── pokemonService.ts
├── utils/
│   └── types.ts
└── public/
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

**Clone the repository**

```bash
git clone https://github.com/parag345/pokedex-lite.git
cd pokedex-lite
```

**Install dependencies**

```bash
npm install
```

**Run the development server**

```bash
npm run dev
```

**Open in your browser**

```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

### Type Check

```bash
npm run typecheck
```

---

## Key Features Explained

### Search Functionality

Debounced search prevents unnecessary re-renders and gives a smooth experience.

### Type Filtering

Select single or multiple types. UI updates instantly with type-colored badges.

### Favorites System

- Save Pokémon to localStorage
- Access in a dedicated Favorites page
- Persist across sessions

### Detailed Pokémon Modal

Shows artwork, stats, types, abilities, physical attributes with clean transitions.

---

## Challenges & Solutions

| Challenge                                | Solution                                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **API Missing Full Pokémon Data**        | PokéAPI list endpoint lacks full details. Fetch list then fetch each Pokémon detail via `Promise.all()` |
| **Search + Type Filtering + Pagination** | Complex logic when all three interact. Memoized filtering and disabling pagination when filters apply   |
| **Favorites Loading Delay**              | Fetching many favorites individually. Parallel fetches with skeleton loaders for clean UX               |

---

## Performance Optimizations

- Debounced search (300ms)
- Memoized computations
- Lazy loaded Pokémon detail
- Stable callbacks via `useCallback`
- Proper Next.js image optimization

---

## Browser Support

Compatible with Chrome, Firefox, Safari, and Edge.

---

## API Reference

This project uses the [PokéAPI](https://pokeapi.co):

| Endpoint                     | Description         |
| ---------------------------- | ------------------- |
| `/pokemon?limit=20&offset=0` | List Pokémon        |
| `/pokemon/{id}`              | Pokémon details     |
| `/type`                      | Get list of types   |
| `/type/{name}`               | Get Pokémon by type |

---

## Future Enhancements

- [ ] Infinite scrolling
- [ ] Evolution chain visualization
- [ ] Compare multiple Pokémon
- [ ] Move list
- [ ] Pokémon cries (audio)
- [ ] PWA support
- [ ] Dark mode
- [ ] Multi-language support

---

## Deployment

### Deploy on Vercel

1. Push code to GitHub
2. Import repo into Vercel
3. Deploy with Next.js defaults

---

## Contact

**Parag Mittal**

GitHub: [@parag345](https://github.com/parag345/pokedex-lite)

---
