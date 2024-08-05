# AppEncrypt

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.3.

## Config
1.- Se genero los files de variables de entorno con el comando ```ng g environments``` despues se crear uno nuevo para prod con el nombre ```environment.prod.ts```.

el contenido de cada uno es:
```typescript
// environment.ts
export const environment = {
  title: 'local',
};
```

```typescript
// environment.development.ts
export const environment = {
  title: 'development',
};
```

```typescript
// environment.prod.ts
export const environment = {
  title: 'prod',
};
```

finalmente en el file de ```angular.json``` se agrega la configuraciones de los ambientes:

```json
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kB",
                  "maximumError": "4kB"
                }
              ],
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true,
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.development.ts"
                }
              ]
            }
          },
```

2.- En el projecto se usara la nueva funcionalidad sin zoneless para ellos se realiza lo siguiente:
```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
  ],
};
```

Tambien en el ```angular.json``` removemos de **polyfills** el **zone.js**
