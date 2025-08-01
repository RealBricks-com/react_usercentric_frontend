# RealBricks - Premium Real Estate Frontend

A modern, responsive real estate frontend application built with React, TypeScript, and Tailwind CSS. This application connects seamlessly to your .NET Web API backend for a complete real estate listing solution.

## Features

- **Property Browsing**: Browse properties with advanced filtering and search
- **Property Details**: Comprehensive property information with image galleries
- **Developer Profiles**: View verified developer information
- **Enquiry System**: Send enquiries directly to developers
- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Premium design with smooth animations
- **API Integration**: Ready to connect with your .NET backend

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd realbricks-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=https://your-api-url.com
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## API Configuration

This frontend is designed to work with your .NET Web API backend. To connect it:

1. **Update the API base URL** in `src/lib/api.ts` or set the `VITE_API_BASE_URL` environment variable
2. **Ensure CORS is configured** on your backend to allow requests from your frontend domain
3. **Verify endpoint compatibility** - the frontend expects the API endpoints as defined in your OpenAPI specification

### Required API Endpoints

The application expects these endpoints to be available:

- `GET /api/ProjectCore/cards` - Get property cards with filtering
- `GET /api/ProjectCore/full/{id}` - Get detailed property information
- `GET /api/Area` - Get available areas/locations
- `GET /api/DeveloperCore` - Get developer information
- `POST /api/Lead/sendenquiry` - Send property enquiries
- `GET /api/amenities` - Get available amenities

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout/          # Layout components (Header, Footer)
│   ├── Properties/      # Property-specific components
│   └── ui/              # shadcn/ui components
├── lib/                 # Utilities and API client
├── pages/               # Page components
├── types/               # TypeScript type definitions
└── assets/              # Images and other assets
```

## Key Components

### Property Card
Displays property information in a card format with image, price, location, and action buttons.

### Property Filters
Advanced filtering system for properties by location, type, price range, and status.

### Enquiry Modal
Modal form for users to send enquiries about properties to developers.

### Property Details
Comprehensive property detail page with image gallery, amenities, units, and location information.

## Customization

### Design System
The application uses a design system defined in:
- `src/index.css` - CSS custom properties for colors and design tokens
- `tailwind.config.ts` - Tailwind CSS configuration

### API Client
All API calls are centralized in `src/lib/api.ts`. You can modify this file to match your backend's exact API structure.

### Types
TypeScript types are defined in `src/types/api.ts` based on your OpenAPI specification.

## Technologies Used

- **React 18** - Frontend library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **React Query** - Data fetching and caching
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## Build and Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

3. **Deploy**
   - The `dist` folder contains the built application
   - Deploy to any static hosting service (Vercel, Netlify, etc.)
   - Configure your backend API URL for production

## Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://your-api-url.com

# Optional: Enable development features
VITE_DEV_MODE=true
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Note**: Make sure your .NET Web API backend is running and accessible before testing the frontend application.