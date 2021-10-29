---
layout: post
title: 'Apuntes de Python'
author: [Vicente]
tags: ['coding']
image: img/Cover29102021.png
date: '2021-10-29'
draft: false
excerpt: Estos son mis apuntes que he tomado mientras aprendía Python, lo he hecho lo más ordenado posible para que mi yo del futuro o cualquiera pueda entenderlo.
---

# Apuntes de Python

## Funciones importantes

print - Mostrar un mensaje en la consola

```python
print("Hola mundo") # Hola mundo
```

type - Muestra el tipo de dato del valor

```python
type(dato)
```

len - Muestra la longitud de una cadena de caracteres.

```python
len("A") # 6
```

input - Pide un dato al usuario.

```python
edad = input("¿Cuantos años tienes?")
```

int - Convierte una cadena de texto a entero.

```python
int("5") # 5
```

append - Añade un elemento a una lista.

```python
nums = [1, 2, 3, 4]
nums.append(5) # [1, 2, 3, 4, 5]
```

remove  - Quita un elemento de uina lista.

```python
nums = [1, 2, 3, 4]
nums.remove(4) # [1, 2, 3] 
```

count - Cuenta cuantas veces está ese elemento en una lista.

reverse - Le da la vuelta.

sort - Ordena la lista.

pop - Devuelve y quita el último elemento de la lista.

extend - Añade varios elementos a la lista.

```python
lista = [1, 2, 3]
lista.extend([4, 5, 6]) # [1, 2, 3, 4, 5, 6]
```

str - Pasa de número a cadena de texto.

## Sintaxis / conceptos

### Variables

Asigna un valor a un espacio en la memoria del programa. En Python se hace mediante el símbolo de asignación `=`.

```python
nombreVariable = "Valor"
```

### Tipos de datos

En Python podemos trabajar con los siguientes tipos de datos.

* Entero, números no decimales.
* Flotantes, números que tienen decimales.
* Booleano, verdadero o falso.
* Cadena de caracteres, secuencia de caracteres entre comillas, para representar texto.
* Listas, una lista de datos. `[1, 2, 3, 4]`
* Tupla, estructura de datos **inmutable** que contiene una secuencia ordenada de elementos.
    * No pueden ser modificadas.
* Diccionario, es una estructura de datos que puede contener una clave y un valor.
    * Las claves deben ser únicas e inmutables.
```python
{"A": 45, "B": 30}
```

### Funciones

Es un bloque de código reutilizable que realiza una sola tarea específica.

```python
def nombreFunción(argumento):
    print("Hola " + argumento)
    # Código

nombreFunción("Vicente") # "Hola Vicente"
```

### Indexación / Índices

Podemos acceder a un elemento específico de un valor.

```python
variable = "Hola"
variable[0] # H
```

### Rebanado

El rebanado nos permite obtener una porción de una cadena.

```python
variable = "ABCD"
variable[1:3] # BC
```

#### Paso

Nos permite saltar al carácter siguiente.

<img src="C:\Users\vicen\AppData\Roaming\Typora\typora-user-images\image-20211017182845502.png" alt="image-20211017182845502" style="zoom: 50%;" />

### Operadores

`/` - Dividir y devuelve decimales

`//` - Divide y devuelve siempre enteros

`%` - Devolvernos el resto de la división.

`and` - Evalúa si el operando izquierdo **y** el derecho son verdadero.

`or` - Evalúa si el operando izquierdo **o** el derecho cumple algo.

`not` - Evalúa si es falso.

<img src="C:\Users\vicen\AppData\Roaming\Typora\typora-user-images\image-20211017185243700.png" alt="image-20211017185243700" style="zoom:50%;" />

`in` - Evalúa si un elemento se encuentra en la lista o en el diccionario.

```python
numeros = [1, 2, 3]
2 in numeros # True
```

## Condicionales

`if/else/elif` - Comprueba una condición.

```python
if 6 > 3: # SI 6 es mayor que 3
	print("6 es mayor a 3")
else: # SI NO lo es
	print("6 no es mayor a 3")

```