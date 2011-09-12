# Rhodia

Rhodia is a logger for the browser. An exceptionally simple logger. So simple it might be *too* simple.

There is much beauty in simplicity, but if you find a feature you just *must absolutely have* and think is a good idea please open an issue and let me know.

## Usage

First add a script include.

    <script type="text/javascript" src="rhodia.js"></script>

Now we have access to a global object called `Rhodia`. We pull logger instances off of this object. Instances are cached and can be re-used. More on this in a bit.

    var log = Rhodia.getLogger('main');
    log.alert('This is an alert!');
    log.error('Error is the default log level.');
    log.trace('Trace is below error, so this will not show.');

Logging is asynchronous. This means that sometimes you will see logging events *after* other events. Take for example an thrown error.

    log.error('Error coming up!');
    throw "Error occured";

You will see `Error occured` *before* you will see `Error coming up!`. *In the cases I tried at least*.

Re-using a logger is as simple as recalling `getLogger` with the same name. Suppose you create a logger main and then change the logging level.

    var main = Rhodia.getLogger('main');    // Fetch the logger called 'main'.
    main.setLevel('FATAL');                 // Only `fatal` level and higher shown.

Assuming the page hasn't been reloaded, fetching the `'main'` again will return that same logger with the level already set.

    Rhodia.getLogger('main').error("This won't be shown because the level is below fatal.");

## Log Levels

There are nine log levels, and eight practical ones.

* **TRACE** - Used for tracing through programs.
* **DEBUG** - Often used to add debugging information.
* **INFO** - Most used level in development.
* **WARN** - Warning conditions, not necessarily errors.
* **ERROR** - An error occurred, most used for production environments
* **ALERT** - Akin to *Something bad happened*. This is a red flag.
* **FATAL** - Program cannot continue.
* **OFF** - Not a real log level. Use it to turn logging entirely off (`instance.setLevel('OFF')`). Of course you can always log at an `OFF` level by saying `instance.off('This is stupid logging.')`.

### Disclaimer

There are probably other client side loggers. Are they any good? I can't really say. I haven't tried them. This is a work-in-progress.

### About Me

Please see the dedicated [about me](http://joshuakehn.com/colophon/).

### About The Name

The name comes from the paper and notebook maker [Rhodia](http://rhodiapads.com/). Famous for using high quality paper wrapped in a very distinctive orange. They are a subsidiary of Clairefontaine, but I thought it would be easier to type Rhodia.