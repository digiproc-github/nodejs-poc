# DigiProc node.js POC
DigiProc RESTful API backend, built on top of Node.js 18, Typescript and Fastify.

## Prerequisites
You must have Node.js 18+ installed.

## Local run
Open a terminal in the current folder and perform the following steps:
- `npm i`: this will install project's node.js dependencies
- open another terminal
- `npm run dev`: this will run the service with `tsx` with watch mode: it will watch the changed files and rebuild and restart the service using `esbuild`. The service will connect by default to the local database instance

## Build
The build is performed with standard `tsc` compiler, emitting node18 ecmascript modules, with source-mapping enabled.
All tests are excluded from the output build.
On CI the GitHub actions pipeline will containerize the application using `docker build` and push it on the Azure container registry, tagged by commit SHA.

## Tests
Run `npm test` to perform a single run, or `npm run test:watch` to have `vitest` (another `esbuild` based tool) run tests while watching files.
