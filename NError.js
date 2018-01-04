'use strict';

const level = {
        fatal: 'fatal',
        error: 'error',
        warning: 'warning',
    },
    levelKeys = Object.keys(level);

class NError extends Error {

    constructor({prefix, name, message, level, code, extra, error}) {
        const isError = error && error instanceof Error;
        if (isError) message = error.message;
        if (message) message = (prefix) ? `${prefix}: ${message}` : message;
        super(message);
        if (levelKeys.indexOf(level) === -1) throw new Error(`invalid level "${level}"`);
        this.level = level;
        if (code == null) throw new Error('code is required');
        this.code = code;
        if (extra && typeof extra != 'object')
            throw new Error('extra must be "Object"');
        this.extra = extra;
        this.name = name;
        if (isError) this.stack = error.stack;
    }

    static get level() {
        return level;
    }

}

/* eslint-disable no-console */
/* istanbul ignore next */
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});
/* eslint-enable no-console */

module.exports = NError;
