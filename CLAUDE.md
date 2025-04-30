# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Frontend: `npm run dev` (development), `npm run build`, `npm run typecheck`
- Backend: `npm run build`, `npm run test`, `npm run dev` (local API)
- Single test: `npm test -- -t 'test name'` (backend)

## Code Style
- TypeScript: Strict mode with explicit types for functions and variables
- Imports: React first, then components; use type imports (`import type {...}`)
- Components: Functional components with TypeScript interfaces for props
- Error handling: Try/catch for async ops with proper HTTP status codes
- Backend: AWS CDK patterns with consistent Lambda response format
- Naming: PascalCase for components/types, camelCase for variables/functions

# Frontend guidelines
## General JS/TS coding guidelines
- Prefer immutable code (const, not let) 
- Use ALL_CAPS naming convention for constants
- Don't add comments to a piece of code if a reasonably competant junior engineer could just read the code and understand what it does. If a piece of code is not obvious then add a comment
- Use tabs, not spaces

## React
- In general seperate individual components into separate files 
- For TS React components add types in this style: 

```ts
const myComponent = ({
	myProperty
}): {
	myProperty: type
} => {
	// rest of component 
}

```

## Styling
- Never use inline styles
- Use TailwindCSS to specify styles
- Use ShadCN/UI components when reasonable
- Use ShadCN/UI and TailwindCSS in a clean well-structured idiomatic way. ie. utilise CSS variables found in global.css

## Testing 
- All components and utils files must have a corresponding test file in the src/tests directory. 
- Tests are written in vitest
- Components are tested with vitest and React Testing Library
- Don't test for styles in frontend tests