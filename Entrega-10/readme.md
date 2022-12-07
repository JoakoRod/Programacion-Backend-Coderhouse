cURL de cada EndPoint:

Productos:

cURL de GET:
curl --location --request GET 'localhost:8080/api/productos/2'

cURL de POST:
curl --location --request POST 'localhost:8080/api/productos/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "timestamp": 123,
    "nombre": "Globo Terráqueo",
    "descripcion": "soy un Globo Terráqueo",
    "codigo": 13231,
    "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    "precio": 345.67,
    "stock": 1
}'

cURL de PUT:
curl --location --request PUT 'localhost:8080/api/productos/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "1"
}'

cURL de DELETE:
curl --location --request DELETE 'localhost:8080/api/productos/1'

carritos:

cURL de GET:
curl --location --request GET 'localhost:8080/api/carrito/1/productos'

cURL de POST (agregar carrito):
curl --location --request POST 'localhost:8080/api/carrito'

cURL de POST (agregar producto al carrito):
curl --location --request POST 'localhost:8080/api/carrito/1/productos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 3
}'

cURL de DELETE (Eliminar carrito):
curl --location --request DELETE 'localhost:8080/api/carrito/4'

cURL de DELETE (Eliminar un producto del carrito):
curl --location --request DELETE 'localhost:8080/api/carrito/1/productos/3'