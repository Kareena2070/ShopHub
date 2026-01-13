ShopHub - Project Overview & Implementation Guide

Project Summary

ShopHub is a modern, full-featured e-commerce application built with React 19, React Router v7, and React Query v5. It demonstrates essential e-commerce functionality including product browsing, detailed product views, shopping cart management, and checkout capabilities. The application communicates with a REST API backend for all data operations.

---

Core Architecture & Design Patterns

1. Technology Stack
- Frontend Framework: React 19 (UI components)
- Routing: React Router v7 (client-side navigation)
- Data Fetching: React Query v5 (server state management & caching)
- HTTP Client: Axios (API communication)
- Build Tool: Vite (development & production builds)

Feature Breakdown & Implementation Details

Feature 1: Product Listing (Home Page)

What it does:
- Fetches all products from the backend API
- Displays products in a responsive grid layout
- Shows product images, names, descriptions, and prices
- Allows adding products directly to cart with quantity 1

Feature 2: Product Details Page

What it does:
- Shows comprehensive information about a single product

Feature 3: Shopping Cart Management

What it does:
- Displays all items in the cart with pricing details
- Allows quantity adjustments (increment/decrement)
- Allows item removal from cart
- Calculates and displays order summary (subtotal, tax, total)

Key Implementation Points:
1. Three Mutations:
   - useUpdateCartItem(): Changes product quantity
   - useDeleteCartItem(): Removes product from cart
2. Data Calculation:
   - Subtotal = sum of (price x quantity) for all items
   - Tax = subtotal x 0.1 (10%)
   - Total = subtotal + tax
3. Quantity Controls:
   - Decrement button disabled when quantity is 1 (prevents 0 or negative)
   - Increment button always available
4. Empty State: Shows "Your cart is empty" when no items

Feature 4: Navigation Component

What it does:
- Provides persistent navigation bar across all pages
- Contains ShopHub logo/brand
- Links to Home and Cart pages

API Layer Architecture

API Client Setup (api.js)
Axios Instance -> baseURL: https://backendapi-cwp7.onrender.com/api
                ↓
        [Configured with base URL]

API Functions (Exported from api.js)

Function                                                    | Method | Endpoint            | Purpose
getProducts()                                           | GET       | /products/          | Fetch all products
getProductById(id)                                  | GET       | /products/{id}/   | Fetch single product details
getCartItems()                                          | GET       | /cart/                   | Fetch user's cart
addToCart(title, quantity, price)            | POST     | /cart/                   | Add item to cart
updateCartItem(cartItemId, quantity)  | PUT        | /cart/{id}/           | Update item quantity
deleteCartItem(cartItemId)                    | DELETE | /cart/{id}/           | Remove item from cart

React Query Hook Pattern (queries.js)

Each API function is wrapped in a React Query hook:

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],          // Unique cache key
    queryFn: getProducts,            // Function to call
  });
};

Query Hooks (for fetching data):
- useProducts(): Caches all products
- useProductById(id): Caches individual product with conditional enabling
- useCart(): Caches cart items

Mutation Hooks (for modifying data):
- useAddToCart(): Posts to API, invalidates cart cache on success
- useUpdateCartItem(): Updates quantity, invalidates cart cache
- useDeleteCartItem(): Removes item, invalidates cart cache
- useCheckout(): Submits order, invalidates cart cache

Cache Invalidation Strategy:
After any mutation that changes the cart, queryClient.invalidateQueries({ queryKey: ['cart'] }) is called. This forces React Query to refetch cart data, keeping the UI in sync with the backend.

---

React Router Configuration

Route Structure (App.jsx):
/                    -> Home page (product listing)
/product/:id        -> Product details page
/cart               -> Shopping cart page

Key Concepts:
1. useParams(): Extract URL parameters (e.g., product ID)
2. useNavigate(): Programmatically navigate to different routes