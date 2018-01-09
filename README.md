# Bienvenido

Base para el manejo de errores para cualquier proyecto.

## Instalación

```bash
yarn add @zerointermittency/error
# npm i --save @zerointermittency/error
```

## Api

El modulo consta de una sola clase llamada **ZIError**.

#### ZIError

##### constructor

Este método es el que se llama cuando se realiza el siguiente código:

```javascript
const ZIError = require('@zerointermittency/error');
let error = new ZIError(params);
```

**Argumentos**:

- params (Object):
    - level \(*String*\) **required**: identifica el nivel al que pertenece el error, estos están definidos en el atributo estático **level** de la clase
    - code \(*Number*\) **required**: numero que identifique su error
    - name \(*String*\): nombre que identifica el error
    - message \(*String*\): mensaje con mayor detalle respecto al error o informativo
    - extra \(*Object*\): objeto para poder tener referencia a variables o objetos cuyos valores son necesarios para un correcto funcionamiento y ayudar a identificar de mejor manera porque se produjo el error
    - error \(*Error*\): es una instancia de Error nativo de javascript, para poder sobrescribir el stack, mensaje y nombre que identifique el error en caso que necesitemos validarlo.
    - prefix \(*String*\): para identificar donde se esta produciendo el error.

**Retorna**:

\(*ZIError*\): Retorna la instancia de la clase **ZIError**.

##### level

Están definidos actualmente solo 3 niveles de error **fatal**, **error** y **warning**.

```javascript
const ZIError = require('@zerointermittency/error');

let levelError = ZIError.level.error,
    levelFatal = ZIError.level.fatal,
    levelWarning = ZIError.level.warning;
```

#### Recomendación

Para su uso es importante destacar que se puede extender de esta clase ZIError, por ejemplo:

```javascript
'use strict';

const ZIError = require('@zerointermittency/error');

class AuthError extends ZIError {

    constructor(opts) {
        opts.prefix = 'auth';
        super(opts);
    }

}

module.exports = {
    internalError: new AuthError({
        code: 0,
        name: 'internalError',
        message: 'internalError',
        level: ZIError.level.fatal,
    }),
    secretRequired: new AuthError({
        code: 1,
        name: 'secretRequired',
        message: 'secret required',
        level: ZIError.level.error,
    }),
    appRequired: (extra) => new AuthError({
        code: 2,
        name: 'appRequired',
        message: 'app required to create payload',
        level: ZIError.level.error,
        extra: extra,
    }),
};
```

En este caso obtenemos una clase de error llamada AuthError, definiendo específicamente el prefijo ('auth') en el constructor, lo cual nos permitiría saber que los errores pertenecen a dicha clase.

## Pruebas funcionales (Unit Testing)

Se llevaron a cabo 2 pruebas funcionales las cuales evalúan todos los casos de éxito al momento de crear la instancia de **ZIError** y los casos en que va a dar error si los parámetros especificados no tienen los elementos requeridos. Para ejecutar las pruebas:

```bash
yarn test
```

## Pruebas de rendimiento (benchmark)

Con el objetivo de que sea optimo el código se realizaron 2 pruebas de rendimiento, de las cuales se determino que:

- Utilizar [template literal][template-literal] es igual de eficiente que [operador de asignación de suma en string][string-operator] y es muchísimo mas eficiente que la función [concat del prototype de string][string-concat]. Para correr la prueba:

```bash
yarn benchmark benchmark/StringConcatenate.js

Template Literal x 562,432,004 ops/sec ±0.85% (85 runs sampled)
operate String x 561,491,894 ops/sec ±0.77% (85 runs sampled)
Concatenate String x 48,848,307 ops/sec ±4.89% (82 runs sampled)
add String x 556,429,141 ops/sec ±1.05% (87 runs sampled)
Fastest is Template Literal,operate String,add String
```

- Utilizar de manera global el atributo estático de niveles para la clase **ZIError**, es mucho mejor en rendimiento que utilizar de manera local el objeto. Para correr la prueba:

```bash
yarn benchmark benchmark/LocalvsGlobalStaticAttrClass.js

local static attrs x 63,716,107 ops/sec ±5.69% (81 runs sampled)
global static attrs x 557,872,339 ops/sec ±0.85% (84 runs sampled)
Fastest is global static attrs
```

## Changelog

Todos los cambios importantes son escritos [aquí](CHANGELOG.md)

[template-literal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[string-operator]: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Assignment_Operators
[string-concat]: https://www.w3schools.com/jsref/jsref_concat_string.asp