# js-logger
A simple JS Logger.

## Installation

```sh
npm i -S @akshat1/js-logger
```

## Usage

This package utilizes the concept of _named_ loggers. And by forcing you to name your loggers, it becomes possible to filter or search through your log messages by the filter name.

A very verbose example might be

```js
import { getLogger } from "@dhoomraketu/js-logger";

const rootLogger = getLogger("My-Module");

rootLogger.debug("I was loaded");  // [timestamp My-Module] I was loaded

export const doSomething = () => {
  const logger = getLogger("doSomething", rootLogger);
  logger.debug("I was called.", "The answer is", 42);    // [timestamp My-Module > doSomething] I was called. The answer is 42.
};
```

- This module works on both the server side and the browser side
    - and it loads the server code asynchronously when it realizes there's no window.
