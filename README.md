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
├── /frontend                      # React App
│   ├── /public
│   │   ├── favicon.ico
│   │   ├── robots.txt             # SEO
│   │   └── sitemap.xml            # SEO
│   │
│   ├── /src
│   │   ├── /assets
│   │   │   ├── /images
│   │   │   ├── /videos
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
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   └── ThemeSwitcher.jsx  # 3-theme switcher
│   │   │   ├── /media
│   │   │   │   ├── VideoPlayer.jsx
│   │   │   │   └── ImageGallery.jsx
│   │   │   ├── /map
│   │   │   │   └── InteractiveMap.jsx # Leaflet.js
│   │   │   └── /charts
│   │   │       └── DataChart.jsx      # Recharts / Chart.js
│   │   │
│   │   ├── /pages
│   │   │   ├── /static              # ── STATIC PAGES (5+) ──
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Contact.jsx
│   │   │   │   ├── FAQ.jsx
│   │   │   │   └── NotFound.jsx
│   │   │   │
│   │   │   ├── /dynamic             # ── DYNAMIC PAGES (10+) ──
│   │   │   │   ├── Products.jsx
│   │   │   │   ├── ProductDetail.jsx
│   │   │   │   ├── Search.jsx
│   │   │   │   ├── Blog.jsx
│   │   │   │   ├── BlogPost.jsx
│   │   │   │   ├── Category.jsx
│   │   │   │   ├── MapPage.jsx
│   │   │   │   ├── Dashboard.jsx      # Private
│   │   │   │   ├── Profile.jsx        # Private
│   │   │   │   └── Notifications.jsx  # Private
│   │   │   │
│   │   │   ├── /auth
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── ForgotPassword.jsx
│   │   │   │
│   │   │   └── /admin               # ── ADMIN INTERFACE ──
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── RecordEditor.jsx   # Edit products/services
│   │   │       ├── UserManager.jsx    # Disable/manage accounts
│   │   │       ├── ThemeManager.jsx   # Switch site templates
│   │   │       └── Monitor.jsx        # Service status page
│   │   │
│   │   ├── /themes
│   │   │   ├── theme-default.css
│   │   │   ├── theme-dark.css
│   │   │   └── theme-light.css
│   │   │
│   │   ├── /context
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── /hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useFetch.js
│   │   │   └── useTheme.js
│   │   │
│   │   ├── /services
│   │   │   ├── api.js               # Axios base instance
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   └── userService.js
│   │   │
│   │   ├── /routes
│   │   │   ├── AppRouter.jsx
│   │   │   └── PrivateRoute.jsx      # Auth-protected wrapper
│   │   │
│   │   ├── /utils
│   │   │   ├── seo.js               # react-helmet-async helpers
│   │   │   └── helpers.js
│   │   │
│   │   ├── /onboarding
│   │   │   ├── TourGuide.jsx         # React Joyride
│   │   │   └── HowToGuide.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.jsx                  # React entry point
│   │
│   ├── .env
│   ├── index.html                    # HTML5 root
│   ├── vite.config.js
│   └── package.json
│
├── /backend                          # Node.js + Express REST API
│   ├── /config
│   │   ├── db.js                     # MySQL connection (mysql2)
│   │   └── app.js                    # Express app setup, CORS
│   │
│   ├── /routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   ├── blogRoutes.js
│   │   └── monitorRoutes.js          # Health check endpoints
│   │
│   ├── /controllers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── userController.js
│   │   ├── blogController.js
│   │   └── monitorController.js
│   │
│   ├── /models
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Post.js
│   │
│   ├── /middleware
│   │   ├── authMiddleware.js         # JWT verification
│   │   └── adminMiddleware.js        # Admin role check
│   │
│   ├── /utils
│   │   └── helpers.js
│   │
│   ├── .env                          # DB creds, JWT secret, PORT
│   ├── server.js                     # Entry point
│   └── package.json
│
├── /database
│   ├── schema.sql                    # Table definitions
│   ├── seed.sql                      # 20+ records
│   └── /migrations
│
├── .gitignore
├── README.md
└── INSTALL.md
```