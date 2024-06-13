<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Descripción

Este es el proyecto de fin de máster que hemos realizado, que consiste en una aplicación de servidor para gestionar los pedidos que se puedan realizar en un restaurante

## Integrantes

- Miguel Pinzón
- Gorky Suquinagua

## Instalación

```bash
$ yarn install
```

El proyecto usa postgres sql como motor de base de datos, para instalarla es necesario ejecutar el siguiente comando de docker

```bash
$ docker compose up -d
```

## Ejecución de la aplicación

```bash
# desarrollo
$ yarn run start

# modo de observación de cambios
$ yarn run start:dev

# modo producción
$ yarn run start:prod
```

## Test

```bash
# pruebas unitarias
$ yarn run test

# pruebas e2e
$ yarn run test:e2e

# pruebas de cobertura
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
