## API BASE

Api base con autenticación

## Instalación

```bash
$ npm install
```

## Pasos previos

- Copiar env.example.env a su archivo .env
- Colocar datos de la BD en el archivo .env
- Colocar los mismos datos de la BD en el archivo ormconfig.json
- Correr el comando

```bash
$ npm run migration:run
```

## Iniciar aplicación

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Generación de migraciones

Cualquier archivo que coincida con la Expresión Regular \*.entity será incluido en una migración.
Las migraciones toman los datos de las entidades para poder generar los archivos.
Para que toda modificación que se realice en uno o varios archivos de \*.entity surjan efecto debe generarse una migración y ejecutarla

- Cree o actualice su archivo \*.entity conforme a los ejemplos de user.entity
- Correr el comando

```bash
$ npm run migration:create <name_migration>
```

- Ejecutar la migración con el siguiente comando

```bash
$ npm run migration:run
```

- Para revertir una migración ejecutar el siguiente comando

```bash
$ npm run migration:revert
```
