# User API Spec

## Register User

Endpoint: POST /api/users

Request Body :

```json
{
     "username": "khairul",
     "password": "rahasia negara",
     "name": "haru " 
}
```

Response Body (Success) :

```json
{
     "data": {
          "username": "username",
          "name": "name"
     }
}
```

Response Body (Failed) :

```json
{
     "errors": "username must not blanl, "
}
```

## Login User

Endpoint: POST /api/users/login

Request Body :

```json
{
     "username": "khairul",
     "password": "rahasia"
}
```

Response Body (Success) :

```json
{
     "data": {
          "username": "username",
          "name": "name",
          "token": "uuid"
     }
}
```

Response Body (Failed) :
```json
{
     "errors": "username or password wrong, "
}
```

## Get User

Endpoint: GET /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
     "data": {
          "username": "username",
          "name": "name"
     }
}
```

Response Body (Failed) :

```json
{
     "errors": "Unauthorized, ..."
}
```

## Update User

Endpoint: PATCH /api/users/current

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
     "password": "rahasia negara", //optional
     "name": "haru" //optional
}
```

Response Body (Success) :

```json
{
     "data": {
          "username": "username",
          "name": "name"
     }
}
```

Response Body (Failed) :

```json
{
     "errors": "unauthorized, "
}
```

## Logout User

Endpoint: DELETE /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
     "data": "OK"
}
```

Response Body (Failed) :

```json
{
     "errors": "unauthorized, "
}
```