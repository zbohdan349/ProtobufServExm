
## Intro

Test protobuf

## Environment variable

| Name  | Description |
| ------------- | ------------- |
| DATABASE_URL  | Url to the database |
| NATS_HOST  | Url to the NATS server  |

## Deploing
1.Configure `.env`

2.Choose the next option:

```bash
# development
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```