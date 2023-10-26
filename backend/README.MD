# BACKEND
## How to run
1. Install dependencies
```bash
npm install express
node app.js 
```
2. Use http://localhost:3000 to access the API

## Routes
### 1 - Get all cities
`curl http://localhost:3000/villes`
### 2 - Get a city by postal code
`curl http://localhost:3000/villes/75001`
### 3 - Update a city by postal code
`curl -X PUT -H "Content-Type: application/json" -d '{
  "datasetid": "laposte_hexasmal",
  "recordid": "280ce9ecd2e3da645d644da68a1445e83afdaa28",
  "fields": {
    "nom_de_la_commune": "MARSEILLE",
    "libelle_d_acheminement": "PARIS",
    "code_postal": "75001",
    "coordonnees_gps": [48.862549876, 2.336419316],
    "code_commune_insee": "75101"
  },
  "geometry": { "type": "Point", "coordinates": [2.336419316, 48.862549876] },
  "2022-03-21T00:35:00+01:00"
}' http://localhost:3000/villes/75001`
### 4 - Delete a city by postal code
`curl -X DELETE http://localhost:3000/villes/75001`

