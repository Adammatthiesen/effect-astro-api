# Effect Astro API

A demonstration project showing how to integrate [Effect](https://effect.website/) with [Astro](https://astro.build/) to build type-safe, composable APIs with automatic Swagger documentation.

## Overview

This project demonstrates using Effect's powerful functional programming primitives with Astro's server-side rendering capabilities to create a robust API platform. It leverages Effect's `@effect/platform` library to build HTTP APIs with built-in type safety, error handling, and automatic OpenAPI/Swagger documentation generation.

## Features

- 🎯 **Type-Safe APIs**: Built with Effect Schema for runtime type validation
- 📚 **Auto-Generated Swagger Docs**: Automatic OpenAPI documentation from your API definitions
- ⚡ **Effect Integration**: Leverages Effect's composable, type-safe error handling
- 🚀 **Astro SSR**: Server-side rendering with Astro's catch-all route handler
- 🔄 **Functional Programming**: Immutable, composable API design patterns

## Project Structure

```text
/
├── public/               # Static assets
├── src/
│   └── pages/
│       └── [...path].ts  # Catch-all API route handler
├── astro.config.mjs      # Astro configuration (SSR mode)
├── package.json
└── tsconfig.json
```

## Technology Stack

- **[Astro](https://astro.build/)** - Web framework with SSR support
- **[Effect](https://effect.website/)** - Functional programming library for TypeScript
- **[@effect/platform](https://effect.website/docs/platform/introduction)** - Effect's platform abstractions
- **[@effect/platform-node](https://effect.website/docs/platform/introduction)** - Node.js platform implementation

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Installation

```sh
pnpm install
```

### Development

Start the development server:

```sh
pnpm dev
```

The server will start at `http://localhost:4321`

### Building for Production

```sh
pnpm build
```

### Preview Production Build

```sh
pnpm preview
```

## API Structure

The project uses Effect's HttpApi system to define APIs:

1. **API Definition**: Define your API structure with groups and endpoints
2. **Schema Validation**: Use Effect Schema for request/response validation
3. **Handlers**: Implement endpoint logic with Effect's composable handlers
4. **Swagger**: Automatic OpenAPI documentation generation

### Example Endpoint

The included example demonstrates a simple GET endpoint:

- **Endpoint**: `GET /`
- **Response**: Returns "Hello, world!"
- **Swagger**: Available at `/docs` (when configured)

## How It Works

The project uses Astro's `[...path].ts` catch-all route to handle all API requests. The Effect HttpApi is converted to a standard web handler using `HttpApiBuilder.toWebHandler()`, which makes it compatible with Astro's API routes.

Key components:

- **HttpApi**: Defines the API structure and endpoints
- **HttpApiBuilder**: Implements the API handlers
- **HttpApiSwagger**: Generates OpenAPI/Swagger documentation
- **toWebHandler**: Converts Effect API to standard Web API handler

## Resources

- [Effect Documentation](https://effect.website/docs/introduction)
- [Effect Platform Guide](https://effect.website/docs/platform/introduction)
- [Astro Documentation](https://docs.astro.build)
- [Astro API Routes](https://docs.astro.build/en/guides/endpoints/)

## License

MIT

## Author

Adam Matthiesen ([@Adammatthiesen](https://github.com/Adammatthiesen))
