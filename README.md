# Shoppy — Modern E-Commerce SPA

A clean, responsive e-commerce single-page application built with **React 18**, **Vite**, and **Tailwind CSS**. Connects to the [Platzi Fake Store API](https://api.escuelajs.co/api/v1) to display real product data across multiple categories.

## Features

- **Product catalog** with category navigation (Clothes, Electronics, Furniture, Toys, Others)
- **Live search** — filter products by title in real time
- **Product detail panel** — slide-in view with image, description and price
- **Shopping cart** — add, remove, increase/decrease quantities, with total price (+ 19% tax)
- **Cart persistence** — cart survives page reloads (stored in `localStorage`)
- **Order history** — completed orders are saved and browsable
- **Dark mode** — system-aware toggle
- **Authentication flow** — sign in / sign up / forgot password pages with protected routes
- **Responsive design** — mobile menu + desktop navbar

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Build Tool | Vite 4 |
| Styling | Tailwind CSS 3 |
| Routing | React Router DOM 6 |
| Icons | Heroicons 2 |
| Notifications | Toastify JS |
| API | Platzi Fake Store API |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd shoppy-ecommerce

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root (or copy `.env.development`):

```env
VITE_BASE_URL=https://api.escuelajs.co/api/v1
```

### Running locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Project Structure

```
src/
├── api/
│   ├── constants.js          # API base URL from env vars
│   └── services/api.js       # API service class
├── components/
│   ├── Card/                 # Product card
│   ├── CheckOutCart/         # Shopping cart sidebar
│   ├── InputSearch/          # Search bar
│   ├── MenuResponsive/       # Mobile navigation
│   ├── OrderCard/            # Single order item
│   ├── OrdersCard/           # Order summary card
│   ├── ProductDetail/        # Product detail sidebar
│   └── commons/              # Navbar, Dropdown, Switcher, Icons
├── context/
│   ├── AuthContext.jsx       # Authentication state
│   └── ShoppingContext.jsx   # Products, filters, cart state
├── hooks/
│   ├── useAuth.jsx
│   ├── useDarkMode.jsx
│   ├── useScrollTop.jsx
│   ├── useShopping.jsx
│   └── useShoppingCart.jsx   # Cart logic + localStorage persistence
├── pages/
│   ├── home/                 # Product listing with search & skeleton loader
│   ├── sign-in/              # Login form
│   ├── sign-up/              # Registration form
│   ├── account/              # User account page
│   ├── my-orders/            # Orders list
│   ├── my-order/             # Single order detail
│   ├── forgot/               # Password recovery
│   └── NotFound.jsx          # 404 page
└── router/
    ├── index.jsx             # Route definitions
    └── PrivateRoute.jsx      # Auth-protected route wrapper
```

## Notes for Developers

- **Authentication** is currently front-end only (no backend). Any valid email + password combination creates a session stored in `localStorage`. Replace with a real auth service (e.g. Supabase, Firebase, or a custom JWT API) before going to production.
- **OAuth buttons** (Google / GitHub) on the sign-in page are UI placeholders and need to be wired to a real OAuth provider.
- The API has a `limit=28` and `offset=1` default — adjust in `ShoppingContext.jsx` if you need pagination.

## License

MIT
