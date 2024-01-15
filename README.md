# Angular and NestJS app with Nx

## Instructions

create a `.env` file in the project root. Add below environment configurations accordingly:

```yml
DATABASE_URL="postgresql+psycopg2://<username>:<password>@localhost:5432/<db_name>"
```

## Nx commands

- Generate a module

```yml
 npx nx g @nx/nest:module <module_name> --directory=apps/backend-app/src/app/<module_dir>
 ```

- Generate a controller

```yml
 npx nx g @nx/nest:controller <controller_name> --directory=apps/backend-app/src/app/<module_dir>
```

- Generate a service

```yml
npx nx g @nx/nest:service <service_name> --directory=apps/backend-app/src/app/<module_dir>
```