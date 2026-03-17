# How the project will look like

```text
/wise-web-warriors
│
├── /docs
│   ├── /frontend                  # JSDoc generated docs
│   ├── /admin                     # Admin documentation
│   ├── /user                      # End-user how-to guide
│   └── INSTALL.md                 # Installation instructions
│
├── /frontend                      # React App (Create React App)
│   ├── /public
│   │   ├── favicon.ico
│   │   ├── robots.txt             # SEO
│   │   └── sitemap.xml            # SEO
│   │
│   ├── /src
│   │   ├── /assets
│   │   │   ├── /images
│   │   │   │   ├── /cars          # Car listing images
│   │   │   │   ├── /banners       # Hero/promotional banners
│   │   │   │   └── /logos
│   │   │   ├── /videos
│   │   │   │   └── /car-tours     # Car walkthrough videos
│   │   │   └── /fonts
│   │   │
│   │   ├── /components
│   │   │   ├── /layout
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── NavMenu.jsx        # Interactive menu
│   │   │   ├── /ui
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── SearchBar.jsx      # Search by make/model/year
│   │   │   │   ├── FilterPanel.jsx    # Filter by price, mileage etc.
│   │   │   │   ├── PriceRangeSlider.jsx
│   │   │   │   └── ThemeSwitcher.jsx  # 3-theme switcher
│   │   │   ├── /cars
│   │   │   │   ├── CarCard.jsx        # Car listing card
│   │   │   │   ├── CarGrid.jsx        # Grid of CarCards
│   │   │   │   ├── CarImageGallery.jsx
│   │   │   │   ├── CarSpecs.jsx       # Engine, mileage, year etc.
│   │   │   │   ├── CarBadge.jsx       # New / Used / Featured
│   │   │   │   └── CarComparison.jsx  # Side-by-side compare
│   │   │   ├── /media
│   │   │   │   ├── VideoPlayer.jsx    # Car tour videos
│   │   │   │   └── ImageGallery.jsx
│   │   │   ├── /map
│   │   │   │   └── DealershipMap.jsx  # Leaflet.js dealership locator
│   │   │   └── /charts
│   │   │       ├── PriceHistoryChart.jsx   # Car price trends
│   │   │       └── InventoryChart.jsx      # Stock by category
│   │   │
│   │   ├── /pages
│   │   │   ├── /static              # ── STATIC PAGES (5+) ──
│   │   │   │   ├── Home.jsx           # Hero + featured cars
│   │   │   │   ├── About.jsx          # About the dealership
│   │   │   │   ├── Contact.jsx        # Contact + dealership map
│   │   │   │   ├── FAQ.jsx            # Buying/financing FAQ
│   │   │   │   └── NotFound.jsx       # 404
│   │   │   │
│   │   │   ├── /dynamic             # ── DYNAMIC PAGES (10+) ──
│   │   │   │   ├── Inventory.jsx      # All car listings (DB-driven)
│   │   │   │   ├── CarDetail.jsx      # Single car + gallery + video
│   │   │   │   ├── Search.jsx         # Search results
│   │   │   │   ├── Compare.jsx        # Compare selected cars
│   │   │   │   ├── Category.jsx       # SUV / Sedan / Truck etc.
│   │   │   │   ├── DealerLocator.jsx  # Interactive map page
│   │   │   │   ├── Financing.jsx      # Loan calculator (dynamic)
│   │   │   │   ├── Dashboard.jsx      # User saved cars (private)
│   │   │   │   ├── Profile.jsx        # User profile (private)
│   │   │   │   ├── SavedCars.jsx      # Wishlist (private)
│   │   │   │   └── Notifications.jsx  # Price drop alerts (private)
│   │   │   │
│   │   │   ├── /auth
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── ForgotPassword.jsx
│   │   │   │
│   │   │   └── /admin               # ── ADMIN INTERFACE ──
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── CarListingEditor.jsx   # Add/edit/delete cars
│   │   │       ├── UserManager.jsx        # Disable/manage accounts
│   │   │       ├── ThemeManager.jsx       # Switch site templates
│   │   │       └── Monitor.jsx            # Service status page
│   │   │
│   │   ├── /themes
│   │   │   ├── theme-default.css    # Classic dealership look
│   │   │   ├── theme-dark.css       # Dark/luxury feel
│   │   │   └── theme-sport.css      # Bold/sporty red accent
│   │   │
│   │   ├── /context
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── CarContext.jsx       # Saved cars, compare list
│   │   │
│   │   ├── /hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useFetch.js
│   │   │   ├── useTheme.js
│   │   │   └── useCarFilter.js      # Filter/sort car listings
│   │   │
│   │   ├── /services
│   │   │   ├── api.js               # Axios base instance
│   │   │   ├── authService.js
│   │   │   ├── carService.js        # Car CRUD API calls
│   │   │   └── userService.js
│   │   │
│   │   ├── /routes
│   │   │   ├── AppRouter.jsx
│   │   │   └── PrivateRoute.jsx
│   │   │
│   │   ├── /utils
│   │   │   ├── seo.js               # Meta tags per car listing
│   │   │   ├── formatCurrency.js    # Price formatting
│   │   │   └── helpers.js
│   │   │
│   │   ├── /onboarding
│   │   │   ├── TourGuide.jsx        # React Joyride site tour
│   │   │   └── HowToGuide.jsx       # How to buy a car guide
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js                 # CRA entry point
│   │
│   ├── .env
│   └── package.json
│
├── /backend                         # Node.js + Express REST API
│   ├── /config
│   │   ├── db.js                    # MySQL connection (mysql2)
│   │   └── app.js                   # Express app setup, CORS
│   │
│   ├── /routes
│   │   ├── authRoutes.js
│   │   ├── carRoutes.js             # Car listings CRUD
│   │   ├── userRoutes.js
│   │   ├── dealerRoutes.js          # Dealership locations
│   │   └── monitorRoutes.js         # Health check endpoints
│   │
│   ├── /controllers
│   │   ├── authController.js
│   │   ├── carController.js
│   │   ├── userController.js
│   │   ├── dealerController.js
│   │   └── monitorController.js
│   │
│   ├── /models
│   │   ├── User.js
│   │   ├── Car.js                   # make, model, year, price, mileage, status
│   │   └── Dealer.js
│   │
│   ├── /middleware
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── adminMiddleware.js       # Admin role check
│   │
│   ├── /utils
│   │   └── helpers.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── /database
│   ├── schema.sql                   # users, cars, dealers tables
│   ├── seed.sql                     # 20+ car records
│   └── /migrations
│       ├── 001_create_users.sql
│       ├── 002_create_cars.sql
│       └── 003_create_dealers.sql
│
├── .gitignore
├── README.md
└── INSTALL.md
```