## Changelog

Todos los cambios importantes son escritos aquí. El Formato esta basado en [Keep a Changelog](http://keepachangelog.com/es-ES/1.0.0/)

### [Unreleased]

### [1.0.6] - 2018-01-09
#### changed
- Si ```process.env.NODE_ENV``` es distinto de production, se deja de escuchar el evento "unhandledRejection"

### [1.0.5] - 2018-01-04
#### Fixed
- Nombre clase principal NError => ZIError

### [1.0.4] - 2018-01-04
#### Changed
- Se actualizan palabras clave en package.json

### [1.0.3] - 2018-01-04
#### Added
- Se agregan pruebas funcionales con el objetivo de tener probado todo el código, usando [istanbul js][istanbul] para saber cuanto

### [1.0.2] - 2018-01-04
#### Changed
- Se actualizan enlaces en package.json

### [1.0.1] - 2018-01-04
#### Changed
- Se actualizan enlaces en package.json

### [1.0.0] - 2018-01-04
#### Added
- Se despliega información cuando ocurre un error **unhandledRejection**
- README.md instalación, pruebas, uso y porque extender de la clase ZIError
- Clase **NuncheeErrror** que extiende de la clase nativa **Error** de javascript, la cual permita personalizar el uso de los errores nativos (siendo requerido un nivel de error y un código)
- Se definen los primeros 3 niveles de error **fatal**, **error**, **warning**

[istanbul]: https://istanbul.js.org/