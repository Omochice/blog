# Omochice Personal Blog

Personal Japanese tech blog built with Astro, containing 70+ technical posts from 2021-2025 about vim, programming tools, and development experiences.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap, build, and test the repository:

- Install pnpm globally: `npm install -g pnpm@lasest`
- Install dependencies: `pnpm install` -- takes 33 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
- Run all checks: `pnpm run check` -- takes 19 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
- Build the site: `pnpm run build` -- takes 5 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
- Run tests: `pnpm run test` -- takes 1 second. Set timeout to 30+ seconds.

### Development workflow:

- Start development server: `pnpm run dev` -- starts on http://localhost:4321/blog
- Start preview server: `pnpm run preview` -- serves built static files on http://localhost:4321/blog
- Format code: `pnpm run fmt` -- takes 5 seconds.
- Alternative dev command: `pnpm run start` (alias for dev)

### Content management:

- Blog posts are in `src/content/post/` as Markdown files
- Uses zk (zettelkasten) for note management - config in `.zk/config.toml`
- Create new blog post: `zk blog` (uses zk templates)
- Posts require frontmatter: title, date, type (tech/poem/idea), optional description/updatedDate

## Validation

- ALWAYS run through the complete build and test cycle after making changes: `pnpm install && pnpm run check && pnpm run build && npx vitest run`
- ALWAYS manually validate the blog loads correctly by starting dev server and navigating to http://localhost:4321/blog
- ALWAYS test both homepage and individual blog post navigation to ensure routing works
- Run `pnpm run clean && pnpm run fmt` before committing to ensure code formatting
- The site is in Japanese - ensure any changes preserve Japanese text rendering and BudouX text wrapping

## CI/CD Requirements

- Always run the complete check suite before committing: `pnpm run check`
- GitHub Actions CI runs with 30-minute timeouts for build and check jobs
- Site auto-deploys to GitHub Pages at https://Omochice.github.io/blog on main branch pushes
- Requires all linting to pass: astro check, prettier, biome, markuplint, stylelint

## Common Tasks

### Repository structure

```
src/
├── content/
│   ├── config.ts          # Astro content collections schema
│   └── post/              # Blog posts (70+ markdown files)
├── components/            # Reusable Astro components
├── layouts/               # Page layout templates
├── pages/                 # Astro pages (routes)
├── lib/                   # Utility functions with tests
└── styles/                # Global CSS styles

.github/workflows/         # CI/CD pipelines
.zk/                      # Zettelkasten note management config
astro.config.ts           # Astro configuration
package.json              # Dependencies and scripts
```

### Key configuration files

- `astro.config.ts`: Site URL (https://Omochice.github.io/blog), base path (/blog), integrations
- `tsconfig.json`: Extends astro/tsconfigs/strictest with strict null checks
- `biome.json`: JavaScript/TypeScript linting and formatting
- `markuplint.config.ts`: HTML validation for .astro files
- `stylelint.config.ts`: CSS linting for styles and .astro files
- `package.json`: Uses pnpm-managed pnpm and node

### Content schema

Posts in `src/content/post/` must have frontmatter:

```yaml
---
title: "Post Title"
date: 2025-01-01
type: tech # or poem or idea
description: "Optional description"
updatedDate: 2025-01-02 # optional
---
```

### Available npm scripts

- `pnpm run dev` / `pnpm run start`: Development server
- `pnpm run build`: Build static site
- `pnpm run preview`: Preview built site
- `pnpm run check`: Run all linters and type checking
- `pnpm run fmt`: Format all code (run clean first)
- `pnpm run clean`: Remove dist directory

### Linting components

- `check:astro:astro`: Astro type checking
- `check:astro:prettier`: Prettier formatting check for .astro files
- `check:biome`: Biome JavaScript/TypeScript linting
- `check:markuplint`: HTML validation
- `check:stylelint`: CSS linting

### Known issues

- One acceptable biome warning about `!important` in `.sr-only` CSS class
- Some Shiki warnings about missing language definitions (fortran, conf, reST) - these are non-blocking

### Dependencies and toolchain

- **CRITICAL**: Use pnpm not npm. Package manager version specified in package.json.
- Node.js version is specified in pnpm.executionEnv
- Astro for static site generation
- Vitest for testing (only one test file currently)
- Multiple linters: Biome, Prettier, Stylelint, Markuplint
- MDX integration for enhanced markdown posts
- BudouX for Japanese text line breaking
- Rehype plugins for heading links and slugs

### Timing expectations

- **NEVER CANCEL** any build or check commands
- Install: 33 seconds (set timeout 60+ seconds)
- Check: 19 seconds (set timeout 30+ seconds)
- Build: 5 seconds (set timeout 30+ seconds)
- Format: 5 seconds (set timeout 30+ seconds)
- Tests: 1 second (set timeout 30+ seconds)

### Testing

- Test files: `src/lib/*.test.ts`
- Run tests: `pnpm run test`
- Currently one test file: `is-test-year.test.ts`
