# 🚗 CarDeals — Frontend File Brief

## `/public`
| File | Description |
|------|-------------|
| `favicon.ico` | Browser tab icon, car brand logo |
| `robots.txt` | Tells search engines which pages to crawl or ignore |
| `sitemap.xml` | List of all site URLs for search engine indexing |

---

## `/src/assets`
| Path | Description |
|------|-------------|
| `/images/cars` | All car listing photos organized by car ID or model |
| `/images/banners` | Hero section and promotional banner images |
| `/images/logos` | Brand logo, partner logos |
| `/videos/car-tours` | Car walkthrough and feature highlight videos |
| `/fonts` | Custom font files used across the site |

---

## `/src/components`

### `/layout`
| File | Description |
|------|-------------|
| `Header.jsx` | Top navigation bar, logo, auth buttons, theme switcher |
| `Footer.jsx` | Site links, contact info, social media, copyright |
| `Sidebar.jsx` | Filter panel sidebar for inventory browsing |
| `NavMenu.jsx` | Responsive dropdown/hamburger interactive navigation menu |

### `/ui`
| File | Description |
|------|-------------|
| `Button.jsx` | Reusable styled button with variants (primary, outline, danger) |
| `Modal.jsx` | Popup dialog used for confirmations, quick car previews |
| `SearchBar.jsx` | Search input for make, model, year, keyword |
| `FilterPanel.jsx` | Dropdowns and checkboxes for price, mileage, category, year |
| `PriceRangeSlider.jsx` | Draggable min/max price filter slider |
| `ThemeSwitcher.jsx` | Buttons or dropdown to switch between 3 themes |

### `/cars`
| File | Description |
|------|-------------|
| `CarCard.jsx` | Single car preview card showing image, price, year, mileage |
| `CarGrid.jsx` | Renders a grid layout of multiple CarCards |
| `CarImageGallery.jsx` | Scrollable/zoomable image gallery for a car listing |
| `CarSpecs.jsx` | Table or list of car specifications (engine, transmission, etc.) |
| `CarBadge.jsx` | Small label tag showing New, Used, Featured, or Sold |
| `CarComparison.jsx` | Side-by-side table comparing two or more car specs |

### `/media`
| File | Description |
|------|-------------|
| `VideoPlayer.jsx` | HTML5 video player for car tour videos |
| `ImageGallery.jsx` | General purpose image gallery with thumbnails |

### `/map`
| File | Description |
|------|-------------|
| `DealershipMap.jsx` | Leaflet.js map showing dealership locations with markers and popups |

### `/charts`
| File | Description |
|------|-------------|
| `PriceHistoryChart.jsx` | Line chart showing price trend over time for a car |
| `InventoryChart.jsx` | Bar or pie chart showing stock count by category |

---

## `/src/pages`

### `/static` — Static Pages (5)
| File | Description |
|------|-------------|
| `Home.jsx` | Hero banner, featured cars, promotional sections, call to action |
| `About.jsx` | Dealership history, team, mission statement |
| `Contact.jsx` | Contact form, phone, email, embedded dealership map |
| `FAQ.jsx` | Accordion list of common buying and financing questions |
| `NotFound.jsx` | 404 error page with link back to home |

### `/dynamic` — Dynamic Pages (10+)
| File | Description |
|------|-------------|
| `Inventory.jsx` | Full paginated car listings fetched from the database |
| `CarDetail.jsx` | Single car page with gallery, video, specs, price, contact button |
| `Search.jsx` | Displays results based on user search query from the API |
| `Compare.jsx` | Full page side-by-side comparison of user-selected cars |
| `Category.jsx` | Filtered inventory by type (SUV, Sedan, Truck, Electric, etc.) |
| `DealerLocator.jsx` | Interactive map page listing all dealer branches with info |
| `Financing.jsx` | Loan calculator — price, down payment, interest rate |
| `Dashboard.jsx` | 🔒 Private — user home showing saved cars, activity, alerts |
| `Profile.jsx` | 🔒 Private — view and edit personal account information |
| `SavedCars.jsx` | 🔒 Private — wishlist of cars the user bookmarked |
| `Notifications.jsx` | 🔒 Private — alerts for price drops or new matching inventory |

### `/auth`
| File | Description |
|------|-------------|
| `Login.jsx` | Email and password login form with JWT handling |
| `Register.jsx` | New user signup form with validation |
| `ForgotPassword.jsx` | Email input to trigger password reset flow |

### `/admin` — Admin Interface
| File | Description |
|------|-------------|
| `AdminDashboard.jsx` | Overview stats: total cars, users, recent activity |
| `CarListingEditor.jsx` | Form table to add, edit, or delete car records |
| `UserManager.jsx` | Table of all users with ability to disable or promote accounts |
| `ThemeManager.jsx` | UI to preview and set the active site theme |
| `Monitor.jsx` | Live status indicators for DB, API, and all services |

---

## `/src/themes`
| File | Description |
|------|-------------|
| `theme-default.css` | Clean professional look, neutral tones |
| `theme-dark.css` | Dark background, luxury feel with gold or silver accents |
| `theme-sport.css` | Bold red and black sporty color scheme |

---

## `/src/context`
| File | Description |
|------|-------------|
| `AuthContext.jsx` | Stores logged-in user state, login/logout functions, token |
| `ThemeContext.jsx` | Stores active theme name and provides theme switching function |
| `CarContext.jsx` | Stores user's saved cars list and cars selected for comparison |

---

## `/src/hooks`
| File | Description |
|------|-------------|
| `useAuth.js` | Shortcut hook to access AuthContext values |
| `useFetch.js` | Generic reusable hook for making API GET requests |
| `useTheme.js` | Shortcut hook to access and change the current theme |
| `useCarFilter.js` | Hook managing filter state (price, mileage, category, year) |

---

## `/src/services`
| File | Description |
|------|-------------|
| `api.js` | Axios instance with base URL and default auth headers |
| `authService.js` | Functions for login, register, logout API calls |
| `carService.js` | Functions for fetching, creating, updating, deleting car records |
| `userService.js` | Functions for fetching and updating user profile and admin actions |

---

## `/src/routes`
| File | Description |
|------|-------------|
| `AppRouter.jsx` | Defines all site routes mapped to their page components |
| `PrivateRoute.jsx` | Wrapper that redirects to login if user is not authenticated |

---

## `/src/utils`
| File | Description |
|------|-------------|
| `seo.js` | Helper to set page title, meta description, og tags per page |
| `formatCurrency.js` | Formats numbers into dollar amounts (e.g. 24500 → $24,500) |
| `helpers.js` | Misc utility functions (date formatting, string truncation, etc.) |

---

## `/src/onboarding`
| File | Description |
|------|-------------|
| `TourGuide.jsx` | React Joyride step-by-step interactive tour highlighting key features |
| `HowToGuide.jsx` | Static step-by-step page explaining how to browse and buy a car |

---

## `/src` Root
| File | Description |
|------|-------------|
| `App.jsx` | Root component, wraps app in context providers and renders the router |
| `App.css` | Global base styles shared across the entire app |
| `index.js` | CRA entry point, mounts the React app into the HTML DOM |