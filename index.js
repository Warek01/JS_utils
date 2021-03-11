"use strict";
{
    // Functions
    function splitStrToLen(str, len) {
        if (len > str.length)
            len = str.length;
        const regEx = new RegExp(`.{${len}}`, "gi");
        const match = str.match(regEx) || [];
        if (len * match.length < str.length)
            match.push(str.slice(len * match.length, str.length));
        return match;
    }
    function removeCookie(key) {
        if (!isBrowserEnv())
            throw new EnvError("This Feature is available only on browser environment");
        document.cookie = `${encodeURIComponent(key)}=0; max-age=0`;
        return key;
    }
    function setCookie(key, value, lifespan = 999999999) {
        if (!isBrowserEnv())
            throw new EnvError("This Feature is available only on browser environment");
        return (document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; max-age=${lifespan}`);
    }
    function isBrowserEnv() {
        return typeof window === "object" && typeof document === "object";
    }
    function isNodeEnv() {
        return typeof module === "object" && typeof module.exports === "object";
    }
    // Classes
    class CustomError extends Error {
        constructor(message = "") {
            super(message);
        }
    }
    class ParseError extends CustomError {
        constructor() {
            super(...arguments);
            this.name = "Parse Error";
        }
    }
    class EnvError extends CustomError {
        constructor() {
            super(...arguments);
            this.name = "JS Environment Error";
        }
    }
    const utils = {
        splitStrToLen,
        removeCookie,
        setCookie,
        isBrowserEnv,
        isNodeEnv,
        ParseError,
        EnvError,
    };
    if (isNodeEnv())
        module.exports = utils;
    else if (isBrowserEnv())
        if (!window.utils)
            window.utils = utils;
        else
            window._utils = utils;
}
