---
layout: post
title: 'Apuntes de TypeScript'
author: [Vicente]
tags: ['coding']
image: img/Cover28122020.png
date: '2020-12-28'
draft: false
excerpt: Estos son mis apuntes que he tomado mientras aprendía TypeScript, lo he hecho lo más ordenado posible para que mi yo del futuro o cualquiera pueda entenderlo.
---

# Apuntes de TypeScript

Hola, compartiré por aquí los apuntes que tomé mientras aprendía TypeScript, espero que les sirva :).

No está todo el contenido que puede abarcar TypeScript ya que lo sigo aprendiendo, actualizaré esto cuando tenga más contenido.

## Qué es TypeScript
Es un superconjunto tipado e Javascript, que compila a Javascript.

* Tipado, posee un conjunto de tipos para poder usarlos con las variables, pudiendo personalizarlos o extenderlos.
* Lenguaje de alto nivel, es entendible por humanos.
* Genera como resultado código Javascript, compatible con navegadores y otras herramientas.
* Código abierto.
* Puede ejecutarse en cualquier plataforma que soporte Javascript.

## Beneficios
* Programación orientada a objetos.
* Potenciar tu código Javascript.
* Mayor productividad.
* Poderoso sistema de tipos.
* Compila a ES5, ES6 y más.
* Proyecto muy activo.
* Comunidad creciente.
* Puede prevenir 15% bugs.

## Integración con VSCode
* Snippets.
* JSDocs.
* IntelliSense.
* etc.

## Instalación
```js
//Instalación desde NPM
npm i -g typescript

//Comprobar versión
tsc --v

//Usando el compilador tsc
tsc hello.ts
//Compila este archivo a Javascript
// hello.ts >>> hello.ts

//Usando el --watch
tsc --watch hello.ts

//Generar archivo de configuración
tsc --init
```
## Tips
Si queremos ejecutar archivos de .ts sin transpilar, podemos usar una librería que se llama **ts-node**.

Por ejemplo en el package.json
```json
 "dev": "ts-node index.ts"
```
En el package.json
```json
"dev": "nodemon --exec ts-node -- ./server.ts",
```

## Tipado en TypeScript
* Explícito
    Define una sintaxis para la creación de variables con tipo de dato.
```ts
let nombreVariable : tipoDeDato
```

* Inferido.
    TypeScript tiene la habilidad de "deducir" el tipo en función de un valor.
```ts
let nombreVariable = valor
```

### Tipos Básicos
* Number
  * Numéricos.
  * Hexadecimales.
  * Binarios.
  * Octales.

```ts
//* Number
//Explicito
let phone: number
phone = 1
phone = 6475647843
// phone = 'hfsfa' //? Error

//Inferido
let phoneNumber = 6475647843
phone = 123
// phone = true //? Error

let hex: number = 0xffff
let binary: number = 0b1010
let octal: number = 0o74470
```

* Boolean
  
```ts
//* Boolean
//Explicito
let isPro: boolean
isPro = true
// isPro = 1 //? Error

//Inferido
let isUserPro = true
isUserPro = false
// isUserPro = 10 //? Error
```

* String

```ts
//* "String"
//Explicito
let username: string = 'Vicente'
username = 'Pepe'
// username = true //? Error

//Inferido
let userName = 'Vicente'
userName = 'Pepe'

//* Template String // Caracter backtick/backquote ` para definir expresiones
let userInfo : string
userInfo = `
    User Info:
    username: ${username}
    firstName: ${username + 'Aviles'}
    phone: ${phone}
    isPro: ${isPro}
`
```

* Array

```ts
//* Array []

//Explicito
let users: string[]
users = ['vicente015', 'pepesito', 'bbsita']

// users = [1, true, 'test'] //? Error

//Inferido
let otherUsers = ['vicente015', 'pepesito', 'bbsita']

//* Array<Tipo>
let pictureTitles: Array<string>
pictureTitles = ['Vacation Time', 'Landscape', 'Favorite Sunset']

//* Acceder a los valores
console.log('first user', users[0])
console.log('first title', pictureTitles[0])

//* Propiedades en Array
users.push('Awoo123')
users.sort()
console.log(users)
```

* Tuple

```ts
//* Tuple
let user : [number, string]
user = [1, 'vicente015']

console.log('user', user)
console.log('username', user[1])
console.log('id', user[0])

//* Tuplas con varios valores
// id, username, isUserPro
let userInfo: [number, string, boolean];
userInfo = [2, 'vicente00015', true]

console.log('userInfo', userInfo)

//* Array de Tuplas
let array : [number, string][] = [];
array.push([1, 'vicente015'])
array.push([2, 'xdxdxd'])
array.push([3, 'feefefe'])
array.push([4, '656436546'])
array.push([5, 'frgrgtg'])
array.push([6, 'xdcdxfdsgsr'])

console.log('array', array);

//* Uso de funciones Array
array[2][1] = array[2][1].concat('001');

console.log('array', array);
```

* Enum
  * Los enumerados permiten definir un conjunto de cosntantes con nombre.
  * Tienen la ventaja de adaptarse al contexto de la aplicación.

```ts
//* Enum
/*
const landscape = 0;
const portrait = 1;
const square = 2;
const panorama = 3;
*/

enum PhotoOrientation {
    Landscape,
    Portrait,
    Square,
    Panorama
}

const landscape: PhotoOrientation = PhotoOrientation.Landscape;

console.log('landscape', landscape)
console.log('Landscape', PhotoOrientation[0])

//* Enum Flexible
enum PictureOrientation {
    Landscape = 10,
    Portrait,
    Square,
    Panorama
}

console.log('portrait', PictureOrientation.Landscape)

enum Country {
    Bolivia = 'bol',
    Colombia = 'col',
    Mexico = 'mex',
    EEUU = 'isa',
    Espana = 'esp'
}

const country: Country = Country.Bolivia;
console.log('country', country)
```

* Any
  * La variable puede cambiar de tipo en el tiempo, solo debe ser usado cuando no conocemos de que tipo será nuestra variable.
  * Usado pra capturar valores dinámicos.
  * Los valores pueden cambiar de tipo en el tiempo:
    * APIs externas.
    * Librerías de terceros.

```ts
//* Any
//? Debe usarse como último recurso si no conocemos el tipo de nuestra variable.
//Explicito
let idUser: any
idUser = 1 //Number
idUser = '1' //String

//Inferido
//? Admite cualquier tipo de dato.
let otherId
otherId = 1
otherId = '1'
otherId = true

let surprise: any = 'Hello typescript'
//surprise.sayHello() //? Error
const res = surprise.substring(6)
```

* Void
  * Es lo opuesto de **any**, representa la suencia de tipo.
  * Comúnmente se usa como tipo de retorno en funciones.

```ts
//* Void
//Explicito
function showInfo(user: any) {
    console.log('User Info', user.id, user.username, user.firstName)
    // return 'Hola'
}

showInfo({id: 1, username: 'Vicente015', firstName: 'Vicente'})

//Inferido
function showFormattedInfo(user: any) {
    console.log('User Info', `
        id: ${user.id}
        username: ${user.username}
        firstName: ${user.firstName}
    `)
}

showFormattedInfo({id: 1, username: 'Vicente015', firstName: 'Vicente'})

// Void, como tipo de dato en variable
let unusable: void
// Usar null da error
unusable = undefined
```

* Null

```ts
//* Null
let nullVariable: null
nullVariable = null
// nullVariable = 1 //? Error

let otherVariable = null
otherVariable = 'test'

console.log('nullVariable', nullVariable)
console.log('otherVariable', otherVariable)
```

* Undefined

```ts
//* Undefined
let undefinedVariable : undefined = undefined
// undefinedVariable = 'test' //? Error

let otherUndefined = undefined
otherUndefined = 1

console.log('undefinedVariable', undefinedVariable)
console.log('otherUndefined', otherUndefined)

//* Null y undefined como subtipos
// --stricNullChecks
let albumName : string
//albumName = undefined
```

* Never
  * Representa el tipo de valor que __nunca__ ocurre:
    * Funciones que lanzn excepciones.
    * Funciones que nuncan retornan un valor.

```ts
//* Never
//? Si nunca retorna nada.
function handleError(code: number, message: string): never {
    // Process your code here
    // Generate a message
    throw new Error(`${message}. Code: ${code}`)
}

try {
handleError(404, 'Not found')
} catch(error) {
}

function sumNumber(limit : number) : never {
    let sum = 0
    while(true) {
        sum++
    }
}

sumNumber(10)
```

* Object

```ts
//* Object
//? Solo sirve para declararlo en TypeScript 
let user : object

user = {}

user = {
    id : 1,
    username: 'Vicente015',
    firstName: 'Vicente',
    isPro: true,
}

console.log('user', user)

//* Object vs object (clase JS vs Tipo TS)
//? Nos permite acceder a propiedades del Objeto.
const myObject = {
    id : 1,
    username: 'Vicente015',
    firstName: 'Vicente',
    isPro: true,
}
```

# Funciones en TypeScript
* Los parámetros en las funciones son tipados.
* Se puede definir parámetros opcionales.
* El tipo de retorno puede ser un tipo básico, anum, alias, tipo literal o una combinación de ellos.

```ts
//* Functions
//? Functions in JavaScript
/*
function createPicture(title, date, size) {
//ugly javascript
}*/

//? Functions in TypeScript
type SquareSize = '100x100' | '500x500' | '1000x1000';
function createPicture(title: string, date: Date, size: SquareSize) {
    console.log('create picture', title, date, size)
}

createPicture('Background', new Date, '100x100')
//create picture Background 2020-10-31T14:27:11.545Z 100x100

//? Optional parameters
// Usamos el ? delante del tipo de parámetro
function createPictures(title?: string, date?: Date, size?: SquareSize) {
    console.log('create picture', title, date, size)
}

createPictures('Wallpaper', new Date)

//? Flat Array Function
let createPic = (title: string, date: Date, size: SquareSize): object => {
    /*
    return {
        title: title,
        date: date,
        size: size
    };*/
    return { title, date, size };
};

const pic = createPic('furryPorn', new Date, '100x100');
console.log(pic)

//? Return type with TypeScript

function handleError(code: number, msg: string): string | never {
    if (msg === 'Error') {
        throw new Error(`bug bug bug bug\n${code}\n${message}`)
    } else {
        return ('bug bug error bug')
    }
}

let result = handleError(200, 'OK')
console.log(result)
```