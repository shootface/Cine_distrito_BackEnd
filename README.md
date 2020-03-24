# Api-Rest Cine distrito

## Seminario de ingeniria de software

Api para la gestion de boleteria, snacks y asignación de empleados de la empresa ficticia CineDistrito.

## Integrantes

* Juan Camilo Guaba
* Cristian Patiño
* Paula Avendaño
* Neider Puentes

### Dependencias

```javascript
    "bcryptjs": "^2.4.3",
    "connect-flash": "^0.1.1",
    "cookie-parser": "^1.4.4",
    "express": "^4.17.1",
    "express-session": "^1.17.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "^1.9.1",
    "pg": "^7.12.1",
    "quick-encrypt": "^1.0.8",
    "sequelize": "^5.21.1"
```

---

## Seguridad

Se implementa jsonwebtoken para las rutas privadas que se descirben más adelante. El TOKEN se genera al hacer una petición POST <b>/login</b> que contenga en su <b>req.BODY</b> lo siguiente:

```javascript
{
    "pk_cedula":INTEGER,
    "pass":STRING(128)
}
```

Tras esta petición sí es exitosa la respuesta contendra en <b>res.HEADER</b> el siguiente campo :

```javascript
'auth-token':TOKEN
```

Este token debe ser enviado en el request <b>HEADER</b> con el mismo nombre para permitir el acceso a las rutas privadas.

## Peticiones

### Personas

#### GET

<b>/personas</b> : Obtendra todos los usuarios registrados en la base de datos

### Empleados

#### GET

<b>/empleados</b> : Obtendra todos los empleados registrados en la base de datos.
Ejemplo de respuesta:

```javascript
"data": [
        {
            "fk_persona": 212341233,
            "n_descuento": "10.00",
            "fk_numcontrato": 20
        },
        {
            "fk_persona": 34342351,
            "n_descuento": "34.00",
            "fk_numcontrato": 21
        },
        {
            "fk_persona": 34342352,
            "n_descuento": "34.00",
            "fk_numcontrato": 21
        }
    ]
```

<b>/empleados/:fk_persona</b> : Obtendra los datos de un solo empleado.
Ejemplo de respuesta:
Ejemplo de respuesta:

```javascript
 "data": {
        "fk_persona": 212341233,
        "n_descuento": "10.00",
        "fk_numcontrato": 20
    }
```

#### POST

<b>/empleados/crear</b> : Registra un nuevo empleado en la base de datos, la estructura de la petición debe ser :

```javascript
{ 
    pk_cedula: '34342312',
    v_primernombre: 'ffff',
    v_segundonombre: 'ssss',
    v_primerapellido: 'asafa',
    v_segundoapellido: 'aasdasd',
    i_telefono: '534545',
    v_direccion: 'sdvdvv',
    pass: 'holA',
    n_descuento: '34',
    fk_numcontrato: '21'
}
```