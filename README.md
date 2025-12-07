# Pokédex Lite

A modern, responsive, and feature-rich Pokédex web application built with Next.js 13, TypeScript, and TailwindCSS. Browse, search, filter, and save your favorite Pokémon with a beautiful, production-ready interface.

![Pokédex Lite](https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

### Core Features

- **Pokemon Listing**: Browse through a comprehensive grid of Pokémon with beautiful cards
- **Real-time Search**: Instantly filter Pokémon by name as you type
- **Type Filtering**: Filter Pokémon by single or multiple types (Fire, Water, Grass, etc.)
- **Pagination**: Navigate through pages with an elegant pagination system
- **Favorites System**: Save your favorite Pokémon to localStorage with a dedicated favorites page
- **Detailed View**: Click any Pokémon to view detailed information including:
  - High-quality official artwork
  - Types with color-coded badges
  - Height and weight
  - Base stats with animated progress bars
  - Abilities (including hidden abilities)

### Bonus Features

- **Google OAuth**: Sign in with your Google account using NextAuth.js
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
  - Card hover effects
  - Modal transitions
  - Pagination animations
  - Stat bar animations
- **Responsive Design**: Fully responsive from mobile to desktop
  - Mobile: 1-2 columns
  - Tablet: 3-4 columns
  - Desktop: 5-6 columns
- **Loading States**: Beautiful skeleton loaders while data fetches
- **Error Handling**: Friendly error messages with retry functionality
- **SEO Optimized**: Proper metadata and semantic HTML

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Authentication**: NextAuth.js (Google OAuth)
- **API**: PokéAPI (https://pokeapi.co)
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Storage**: localStorage for favorites

## Project Structure

```
pokedex-lite/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts          # NextAuth API routes
│   ├── favorites/
│   │   └── page.tsx                  # Favorites page
│   ├── layout.tsx                    # Root layout with providers
│   ├── page.tsx                      # Home page with Pokemon grid
│   ├── providers.tsx                 # SessionProvider wrapper
│   └── globals.css                   # Global styles
├── components/
│   ├── ErrorMessage.tsx              # Error display component
│   ├── Header.tsx                    # Navigation header
│   ├── LoadingSkeleton.tsx           # Loading skeleton components
│   ├── Pagination.tsx                # Pagination controls
│   ├── PokemonCard.tsx               # Individual Pokemon card
│   ├── PokemonGrid.tsx               # Grid layout for cards
│   ├── PokemonModal.tsx              # Pokemon detail modal
│   ├── SearchBar.tsx                 # Search input with debounce
│   └── TypeFilter.tsx                # Type filter dropdown
├── hooks/
│   ├── useFavorites.ts               # Favorites management hook
│   └── usePokemon.ts                 # Pokemon data fetching hooks
├── services/
│   ├── api.ts                        # Base API client
│   └── pokemonService.ts             # Pokemon API endpoints
├── utils/
│   └── types.ts                      # TypeScript interfaces
└── public/                           # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Google OAuth credentials (optional, for authentication)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pokedex-lite.git
cd pokedex-lite
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

4. Configure environment variables (optional for OAuth):
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

To generate a secret key:
```bash
openssl rand -base64 32
```

To get Google OAuth credentials:
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select existing
- Enable Google+ API
- Create OAuth 2.0 credentials
- Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

### Type Check

```bash
npm run typecheck
```

## Key Features Explained

### Search Functionality
The search bar includes debouncing to prevent excessive API calls. It filters Pokémon in real-time as you type, working seamlessly with type filters and pagination.

### Type Filtering
Click on type badges to filter Pokémon. You can select multiple types simultaneously. Type badges use color-coded styling for easy identification:
- Fire: Red
- Water: Blue
- Grass: Green
- Electric: Yellow
- And more...

### Favorites System
- Click the heart icon on any Pokémon card to add/remove from favorites
- Favorites are stored in browser localStorage
- Access all favorites from the dedicated Favorites page
- Favorites persist across sessions

### Pokemon Detail Modal
Click any Pokémon card to open a detailed modal featuring:
- High-resolution official artwork
- Complete type information
- Physical attributes (height, weight)
- Base stats with color-coded progress bars
- All abilities including hidden ones
- Smooth animations on open/close

### Google Authentication
- Sign in with Google OAuth for a personalized experience
- User profile displayed in header
- Protected routes (future enhancement)
- Secure session management

## Challenges & Solutions

### Challenge 1: API Rate Limiting
**Problem**: PokéAPI doesn't provide detailed info in list endpoint
**Solution**: Batch fetch detailed data for each Pokémon in the current page with Promise.all(), with error handling for failed requests

### Challenge 2: Search + Filter + Pagination
**Problem**: Managing multiple filters simultaneously
**Solution**: Used useMemo to efficiently compute filtered results, disabling pagination when filters are active

### Challenge 3: Favorite Pokémon Loading
**Problem**: Loading detailed data for potentially many favorites
**Solution**: Parallel fetching with Promise.all() and skeleton loaders for better UX

### Challenge 4: Modal Animations
**Problem**: Smooth animations while maintaining accessibility
**Solution**: Framer Motion AnimatePresence with proper focus management and keyboard navigation

## Performance Optimizations

- Debounced search input (300ms delay)
- Memoized filtered results
- Lazy loading of Pokémon details
- Optimized re-renders with useCallback
- Image optimization with proper sizing
- Skeleton loaders for perceived performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## API Reference

This project uses the [PokéAPI](https://pokeapi.co/):
- `/pokemon?limit=20&offset=0` - List Pokémon with pagination
- `/pokemon/{id}` - Get Pokémon details
- `/type` - Get all Pokémon types
- `/type/{name}` - Get Pokémon by type

## Future Enhancements

- [ ] Infinite scroll option
- [ ] Advanced filters (generation, stats range)
- [ ] Compare Pokémon side-by-side
- [ ] Evolution chain visualization
- [ ] Move list and details
- [ ] Pokémon cries (audio)
- [ ] Share favorite lists
- [ ] PWA support for offline access
- [ ] Dark mode toggle
- [ ] Multi-language support

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in project settings
4. Deploy

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [PokéAPI](https://pokeapi.co/) for the comprehensive Pokémon data
- [Next.js](https://nextjs.org/) for the amazing React framework
- [TailwindCSS](https://tailwindcss.com/) for utility-first styling
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons
- [NextAuth.js](https://next-auth.js.org/) for authentication

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/pokedex-lite](https://github.com/yourusername/pokedex-lite)

## Screenshots

### Home Page
Browse and search through all Pokémon with beautiful cards

### Favorites Page
Access your saved favorite Pokémon in one place

### Pokemon Detail Modal
View comprehensive information about any Pokémon

---

Built with love by [Your Name] using Next.js and TypeScript
