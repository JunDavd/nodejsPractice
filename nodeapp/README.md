# NodeApp

## Installations

install dependecies with:

```sh
npm install
```

Copy environment variables example to .env:

```sh
cp .env.example .env
```

Review your new .env values to match your configuration

on first deploy you can use the next command to initialize the database:

```sh
npm run initDB
```

## API

Base URL: http://localhost:3000/api

### Agent list

GET/api/agents

```json
{
"results": [
{
"_id": "685c0cd96edcff34dd3f3b54",
"name": "Smith",
"age": 45,
"owner": "685c0cd96edcff34dd3f3b4e",
"updated": "2025-06-25T14:51:05.172Z",
"__v": 0
},
{
"_id": "685c0cd96edcff34dd3f3b55",
"name": "Brown",
"age": 33,
"owner": "685c0cd96edcff34dd3f3b4e",
"updated": "2025-06-25T14:51:05.173Z",
"__v": 0
},
{
"_id": "685c0cd96edcff34dd3f3b56",
"name": "Jones",
"age": 24,
"owner": "685c0cd96edcff34dd3f3b4f",
"updated": "2025-06-25T14:51:05.173Z",
"__v": 0
},
{
"_id": "685c7439f371ca4ca3a9604e",
"name": "Juan David Ruiz",
"age": 20,
"owner": "685c0cd96edcff34dd3f3b4e",
"avatar": "1750889529053-AtenciÃ³n.jpg",
"updated": "2025-06-25T22:12:09.069Z",
"__v": 0
}
]
}
```
