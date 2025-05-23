## Implementation

- ran `nestjs new` for a new project
- added mikroorm
- ensured versions matched repo with problem
- ensured orm config also matched
- added simple example parent entity, with child collection; child collection containing JSONB field

````bash
pnpm install
prpm run start:db # start the db via docker-compose
pnpm run start:dev # mainly for running migrations, but can also hit the endpoint to view query logs
````

Simple test failing with expected number of updates (via `version`):

```bash
pnpm run test:e2e
```
