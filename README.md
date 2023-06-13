Para levantar la App

1. Clonar el repositorio
2. Instalar las dependencias con `npm install`]
3. Crear la carpeta "environments" sobre la raiz del repositorio. Ejemplo: .../kimos-api/environments
4. Solicitar archivos de configuración a los administradores del repositorio (dev.env, docker.env, test.env)
5. Crear bajo la carpeta src/db el archivo (docker.datasource.ts y datasource.ts, remote.datasource.ts) con el siguiente contenido:

    ```typescript   
    /// docker.datasource.ts
    import { DataSource } from 'typeorm';
    
    const datasource = new DataSource({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'kimos',
      database: 'kimos',
      password: '1234',
      migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: false,
      logging: true,
    });
    datasource.initialize();
    export default datasource;
    ```
6. Ejecutar `npm run migration:docker:run` para crear las tablas en la base de datos

