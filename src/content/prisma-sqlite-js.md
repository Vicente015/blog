---
layout: post
title: 'Prisma, SQLite y JavaScript'
author: [Vicente]
tags: ['coding', 'databases']
image: img/Cover09012021.png
date: '2021-01-09'
draft: false
excerpt: Apuntes de Prisma con SQLite y JavaScript.
github: 'https://github.com/Vicente015/prisma-sqlite-js'
---

# Prisma, SQLite y JavaScript
Estuve aprendiendo [Prisma](https://prisma.io), implementado con sqlite y js.
Esto es todo lo básico que aprendí, la documentación es demasiado extensa así que hice mis propios apuntes resumiéndolo, puede que añada más en un futuro si me interesa implementar esto en otros proyectos.

- [Prisma, SQLite y JavaScript](#prisma-sqlite-y-javascript)
  - [Documentación](#documentación)
  - [¿Qué es Prisma?](#qué-es-prisma)
  - [Cómo funciona Prisma](#cómo-funciona-prisma)
    - [Ejemplo](#ejemplo)
  - [Ventajas de Prisma](#ventajas-de-prisma)
  - [Desventajas de Prisma (que he podido encontrar googleando)](#desventajas-de-prisma-que-he-podido-encontrar-googleando)
  - [Extensión de Visual Studio Code](#extensión-de-visual-studio-code)
  - [Instalación](#instalación)
    - [Proyecto de iniciación](#proyecto-de-iniciación)
  - [Tu primera consulta con Prisma Client](#tu-primera-consulta-con-prisma-client)
    - [`.env`](#env)
    - [`schema.prisma`](#schemaprisma)
    - [`index.js`](#indexjs)
  - [Funciones](#funciones)

## Documentación
Toda la información está obtenida de:
* [Documentación de Prisma](https://www.prisma.io/docs/).

## ¿Qué es Prisma?
Prisma es un ORM moderno de código abierto.

**Definición de Wikipedia.**
> El mapeo objeto-relacional es una técnica de programación para convertir datos entre el sistema de tipos utilizado en un lenguaje de programación orientado a objetos y la utilización de una base de datos relacional como motor de persistencia.

**Lo que yo entiendo**
> Básicamente nos permite asignar esquemas de datos con tipos de datos y poder relacionarlos y concadenarlos entre ellos usando bases de datos basadas en SQL.

Prisma consta de las siguientes partes:
* Prisma Client, Genera consultas de tipado seguro para Node.js y TypeScript.
* Prisma Migrate, Sistema de migración de bases de datos.
* Prisma Studio, Interfaz para ver y editar tu base de datos.
  ![Prisma Studio Screenshot](https://i.imgur.com/aitqJZE.png)

## Cómo funciona Prisma
Cada proyecto que usa Prisma usa el [esquema de datos de Prisma](https://www.prisma.io/docs/concepts/components/prisma-schema/). Este esquema (schema en inglés) nos permite definir los modelos de datos de una forma intuitiva, además contiene la conexión con la base de datos.

### Ejemplo
`schema.prisma`
```js
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
generator client {
  provider = "prisma-client-js"
}
model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields:  [authorId], references: [id])
  authorId  Int?
}
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
```

En este esquema tu podrás configurar tres cosas:
* Fuente de datos, Especifica la conexión con la base de datos.
* Generador, Indica que quieres usar el cliente de Prisma.
* Módelo de datos, Define los modelos de tu aplicación.

## Ventajas de Prisma
* Pensar en objetos en lugar de mapear datos relacionales.
* Consultas, no clases para evitar objetos de modelo complejos.
* Fuente única para modelos de aplicaciones y bases de datos.
* Restricciones saludables que evitan errores y antipatrones comunes.
* Consultas de bases de datos con seguridad de tipos que se pueden validar en tiempo de compilación.
* Menos repetitivo para que los desarrolladores puedan centrarse en las partes importantes de su aplicación.
* Autocompletar en editores de código en lugar de tener que buscar documentación

## Desventajas de Prisma (que he podido encontrar googleando)
* Tienes que aprenderlo, y la biblioteca no es ligera.
* Tienes que configurarlo y se puede hacer tedioso.
* El rendimiento está bien para las consultas habituales, pero un maestro de SQL siempre funcionará mejor con su propio SQL para proyectos grandes.

## Extensión de Visual Studio Code
Prisma tiene su propia extensión de Visual Studio Code, esta nos da formato a los archivos `.prisma` e incluye mejor autocompletado.

* [Enlace](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)

## Instalación
Instala todo desde cero.
```bash
npm i @prisma/client --save && npm i @prisma/cli --save-dev
```

### Proyecto de iniciación
Puede clonar mi repositorio [prisma-sqlite-js](https://github.com/Vicente015/prisma-sqlite-js) donde está ya toda la documentación.
```bash
git clone https://github.com/Vicente015/prisma-sqlite-js.git
```

*Con [GitHub CLI](https://cli.github.com/):*
```bash
gh repo clone Vicente015/prisma-sqlite-js
```

O puede utilizar el básico de la documentación.
```bash
curl https://codeload.github.com/prisma/quickstart/tar.gz/master -o master.tar.gz && tar -zxvf master.tar.gz quickstart-master/javascript/starter && move quickstart-master\javascript\starter starter && rmdir /S /Q quickstart-master && del /Q master.tar.gz
```
## Tu primera consulta con Prisma Client
Esto es un esquema (schema) básico de Prisma, aquí se declara la base de datos y los modelos o datos que va a tener.

Antes, declara tu .env con la ruta de tu base de datos.

### `.env`
```js
DATABASE_URL="file:./dev.db"
```

Este debe ser tu esquema de ejemplo.

### `schema.prisma`
```js
// Declara la base de datos
datasource db {
  provider = "sqlite"
  // Obtiene el archivo de la db desde el .env
  url      = env("DATABASE_URL")
}

// Declara el cliente
generator client {
  provider = "prisma-client-js"
}

// Declara el modelo de una publicación.
model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int?
}

// Declara el modelo de un usuario
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
```

Ahora vamos a realizar las consultas.

### `index.js`
```js
// Importa el cliente de prisma del módulo
const { PrismaClient } = require('@prisma/client')

// Inicia el cliente de prisma
const prisma = new PrismaClient()

// Define una función asincrónica que hace peticiones a la base de datos.
const main = async () => {
  //* Crea un nuevo post y lo enlaza con un usuario mediante su email
  const post = async () => {
    await prisma.post.create({
      data: {
        title: "Prisma hace las bases de datos más sencillas",
        author: {
          connect: { email: "sarah@prisma.io" }
        }
      }
    })
  }
  //console.log(await post())

  //* Actualiza la publicación para activar la propiedad de "publicado"
  const postUpdate = async () => {
    await prisma.post.update({
      where: { id: 2 },
      data: { published: true }
    })
  }
  //console.log(await postUpdate())

  //* Borrar posts repetidos
  const deleteRepeatedPosts = async () => {
    //? Borra los posts repetidos filtrado por el título si la ID no es 19
    const deletePost = await prisma.post.deleteMany({
      where: { title: 'Prisma hace las bases de datos más sencillas', NOT: { id: 19 } }
    })
    console.log(deletePost)
    //? Muestra los posts restantes
    const allPosts = await prisma.post.findMany({
      where: { title: 'Prisma hace las bases de datos más sencillas' }
    })
    console.log(allPosts)
  }
  //console.log(await deleteRepeatedPosts())

  //* Obtiene todos usuarios de la db, incluyendo los posts con los que están relacionados.
  const allUsers = await prisma.user.findMany({
    include: { posts: true }
  })
  //console.dir(allUsers, { depth: null })//? Se usa console.dir para poder ver bien objectos enlazados
}

main()
  //? Devuelve un error si o hay
  .catch(e => {
    throw e
  })
  // Cierra la conexión con la base de datos después de las consultas
  .finally(async () => {
    await prisma.$disconnect()
  })
```

## Funciones
Prisma ofrece funciones [CRUD](https://www.prisma.io/docs/concepts/components/prisma-client/crud):
* **C**reate, crear.
* **R**ead, leer.
* **U**pdate, actualizar.
* **D**elete, borrar.

Las funciones de los modelos de datos son:
- findFirst
- findUnique
- findMany
- create
- update
- updateMany
- upsert
- delete
- deleteMany
- count
