# Contact API Spec

## Create Contact

Endpoint: POST /api/contacts

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
     "first_name" : "Eko Kurniawan",
     "last_name" : "Khannedy",
     "email" : "eko@example.com",
     "phone" : "08975516342"
}
```

Response Body (Succes) : 
```json
{
     "data" : {
          "id": 1,
          "first_name": "name",
          "last_name": "last",
          "email" : "email@gmail.com",
          "phone" : "10269190568"
     }
}
```

Response Failed : 

```json
{
     "errors" : "first name must not blank,...."
}
```

## Get Contact

Endpoint: GET /api/contacts/:id

Request Header :

- X-API-TOKEN : token

Response Body (Succes) : 
```json
{
     "data" : {
          "id": 1,
          "first_name": "name",
          "last_name": "last",
          "email" : "email@gmail.com",
          "phone" : "10269190568"
     }
}
```

Response Failed : 

```json
{
     "errors" : "contact not found,...."
}
```

## Update Contact


Endpoint: PATCH /api/contacts/:id

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
     "first_name" : "Eko Kurniawan",
     "last_name" : "Khannedy",
     "email" : "eko@example.com",
     "phone" : "08975516342"
}
```

Response Body (Succes) : 
```json
{
     "data" : {
          "id": 1,
          "first_name": "name",
          "last_name": "last",
          "email" : "email@gmail.com",
          "phone" : "10269190568"
     }
}
```

Response Failed : 

```json
{
     "errors" : "first name must not blank,...."
}
```

## Remove Contact


Endpoint: DELETE /api/contacts/:id

Request Header :

- X-API-TOKEN : token

Response Body (Succes) : 
```json
{
     "data" : "OK"
}
```

Response Failed : 

```json
{
     "errors" : "contact is not found,...."
}
```

## Search Contact


Endpoint: GET /api/contacts

Query Parameter :
- name : string, contact first name or contact last name, optional
- phone : string, contact, optional
- email : string, contact, optional
- page : number, default 1
- size : number, default 10

Request Header :

- X-API-TOKEN : token

Response Body (Succes) : 
```json
{
     "data" : [
     {
          "id": 1,
          "first_name": "name",
          "last_name": "last",
          "email" : "email@gmail.com",
          "phone" : "10269190568"
     },
     {
          "id": 1,
          "first_name": "name",
          "last_name": "last",
          "email" : "email@gmail.com",
          "phone" : "10269190568"
     }
     ],
     "paging" : {
          "curent_page" : 1,
          "total_page" : 10,
          "size" : 10
     }
}
```

Response Body (Failed) : 

```json
{
     "errors" : "unautorized,...."
}
```