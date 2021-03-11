interface Window {
  utils: any;
  _utils: any;
}

{
  // Functions
  function splitStrToLen(str: string, len: number): string[] {
    if (len > str.length) len = str.length;
    const regEx = new RegExp(`.{${len}}`, "gi");
    const match = str.match(regEx) || [];

    if (len * match.length < str.length)
      match.push(str.slice(len * match.length, str.length));

    return match;
  }

  function removeCookie(key: string): string {
    if (!isBrowserEnv())
      throw new EnvError(
        "This Feature is available only on browser environment"
      );
    document.cookie = `${encodeURIComponent(key)}=0; max-age=0`;
    return key;
  }

  function setCookie(
    key: string,
    value: string,
    lifespan: number | string = 999999999
  ): string {
    if (!isBrowserEnv())
      throw new EnvError(
        "This Feature is available only on browser environment"
      );
    return (document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
      value
    )}; max-age=${lifespan}`);
  }

  function isBrowserEnv(): boolean {
    return typeof window === "object" && typeof document === "object";
  }

  function isNodeEnv(): boolean {
    return typeof module === "object" && typeof module.exports === "object";
  }

  // Classes
  abstract class CustomError extends Error {
    public abstract name: string;
    constructor(message: string = "") {
      super(message);
    }
  }

  class ParseError extends CustomError {
    name = "Parse Error";
  }

  class EnvError extends CustomError {
    name = "JS Environment Error";
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

  if (isNodeEnv()) module.exports = utils;
  else if (isBrowserEnv())
    if (!window.utils) window.utils = utils;
    else window._utils = utils;
}
