# iWood Interiors

An independent React and TanStack Start website for iWood Interiors.

## Development

Use Node.js 22.12 or newer within the Node 22 release line and npm. The version is declared in `.nvmrc` and `package.json`.

```sh
git clone <this-repository-url>
cd <repository-name>
npm ci
npm run dev
```

## Deployment

This is a server-rendered TanStack Start app. Deploy both its server and public assets using the platform builds below. Uploading only the public directory to a static host will not serve the application routes.

| Host | Build command | Output / start command |
| --- | --- | --- |
| Vercel | `npm run build:vercel` | `.vercel/output` (handled by Nitro) |
| Netlify | `npm run build:netlify` | Publish `dist`; Nitro also generates server functions |
| Render, Railway, or another Node host | `npm run build:node` | `npm start` |

Use `npm ci` to install build dependencies, including dev dependencies. Use the repository root as the project root. npm and `package-lock.json` are the canonical dependency setup for development, CI, and deployment.

### GitHub and Vercel

Push the source, `package-lock.json`, and configuration files to your GitHub repository. Import that repository into Vercel and select Node.js 22. `vercel.json` supplies the framework, installation command, and build command. Leave the Output Directory override unset; Nitro generates Vercel's Build Output API configuration, including routing to the server.

The GitHub Actions workflow checks TypeScript, runs tests, and builds all three deployment targets on pushes and pull requests. It does not publish a deployment or require deployment credentials. Connect Vercel or Netlify to GitHub for automatic deployments.

This downloaded workspace may not contain `.git` metadata. Apply these files to a clone of your repository and make a normal commit. Do not force-push or replace its history.

GitHub Pages is static-only and is not supported by these server builds. It would require a separate static export with subpath-aware routing and assets.

### Netlify

Import the GitHub repository. `netlify.toml` sets Node 22, the build command, and the `dist` publish directory. Deploy through Netlify's build integration so the generated functions are included; do not drag and drop only `dist`.

### Node hosting

```sh
npm ci
npm run build:node
npm start
```

Deploy the complete `.output` directory if transferring a prebuilt artifact. The server listens on port 3000 by default and respects the host's `PORT` and `HOST` environment variables. `npm start` requires a Node build; Vercel and Netlify builds have different server entry points.

`npm run build` detects Vercel, Netlify, and Cloudflare Pages, otherwise choosing Node. Set `NITRO_PRESET` in the build environment for another Nitro-supported host. Additional presets must be verified on their target platform.

### Environment and verification

The current site requires no application secrets to build. Keep local `.env` files out of Git and configure any future secrets in your host's environment settings. Values prefixed with `VITE_` are public client configuration. Some images and fonts are hosted externally and require those services to remain available.

```sh
npm run typecheck
npm test
npm run build:node
```

Deployment references: [TanStack hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting), [Nitro Vercel](https://nitro.build/deploy/providers/vercel), [Nitro Netlify](https://nitro.build/deploy/providers/netlify), and [Nitro Node](https://nitro.build/deploy/runtimes/node).

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
