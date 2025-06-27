# TDS Currency Converter

A simple, accessible, and modern currency conversion tool built with React, TypeScript, and Vite.

## Project Overview
This app allows users to convert between currencies using real-time rates from the [Currency Beacon API](https://currencybeacon.com). It is designed for clarity, accessibility, and best practices in component composition and code quality.

## Features
- Select currencies to convert from and to (with swap functionality)
- Input amount to convert
- Real-time conversion using Currency Beacon API
- Locale-aware, accessible result formatting
- Loading spinner and user-friendly error messages
- Keyboard and screen reader accessible
- Alphabetically sorted currency list
- Unit tests for conversion logic (Vitest)

## Setup & Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/sekarasiewicz/tds-currency-converter
   cd tds-currency-converter
   ```
2. **Install dependencies:**
   ```sh
   bun install
   ```
3. **Set up your API key:**
   - Register for a free account at [currencybeacon.com](https://currencybeacon.com/register)
   - Create a `.env` file in the project root with:
     ```env
     VITE_CURRENCY_API_KEY=your_api_key_here
     ```
4. **Run the app locally:**
   ```sh
   bun run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (or as indicated in your terminal).

## Usage
- Select the currencies and enter the amount to convert.
- The result updates automatically.
- Use the swap button to quickly reverse the conversion direction.

## Testing
- Unit tests for conversion logic are written with [Vitest](https://vitest.dev/).
- To run tests:
  ```sh
  bun run test
  ```

## Environment Variables
- `VITE_CURRENCY_API_KEY`: Your API key from Currency Beacon (required).

## Assumptions & Decisions
- The app uses the free tier of Currency Beacon, which may have rate limits.
- API key is required and must be set in `.env` (never committed).
- Only the two required endpoints are used: `/currencies` and `/convert`.
- Accessibility and user experience are prioritized (live regions, keyboard navigation, clear feedback).
- No use of `any` as a type (TypeScript best practices).

## Tech Stack
- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Hook Form + Zod (validation)
- React Query (data fetching/caching)
- Vitest (testing)

## Credits
- [Currency Beacon API](https://currencybeacon.com)
- [React](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)

---

If you have any questions or need clarification, feel free to reach out!
