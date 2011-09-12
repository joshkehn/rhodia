(function (root) {
    var Rhodia = root.Rhodia = {},
        Log = null,
        appender = null,
        instances = [],

        levels = {
            'TRACE' : 1,
            'DEBUG' : 2,
            'INFO'  : 3,
            'WARN'  : 4,
            'ERROR' : 5,
            'ALERT' : 6,
            'FATAL' : 7,
            'WTF'   : 10
        },
        defaultLevel = 'ERROR';

    Rhodia.getLogger = function getLogger (name) {
        if (instances[name]) {
            return instances[name];
        } else {
            instances[name] = new Log(name);
            return instances[name];
        }
    };

    Rhodia.setDefault = function setDefault (newDefault) {
        var newValue = levels[newDefault];

        if (newValue) {
            defaultLevel = newDefault;
        } else {
            // Cmon, there are plenty of levels to choose from.
        }
    };

    function translit (unknown) {
        var type = typeof unknown;

        if (type === 'string' || type === 'boolean' || type === 'number') {
            // Types that can be safely outputted as-is are quickly cast to a string.
            return "" + unknown;
        } else if (type === 'object' || type === 'function') {
            // "Unsafe" types are turned into JSON objects.
            return JSON.stringify(unknown);
        } else {
            // This is either `undefined` or some wonky browser shit.
            return '![' + type + ']';
        }
    }

    function humanLevel (number) {
        return humanLevel[number];
    }

    Log = function Log (name) {
        this.prefix = name;
        this.level = levels[defaultLevel];

        return this;
    };

    Log.prototype.setLevel = function setLevel (newLevel) {
        var levelValue = levels[newLevel];

        if (levelValue) {
            this.level = levelValue;
            this.humanLevel = newLevel;
        } else {
            this.wtf('Invalid log level specified: ' + newLevel);
        }

        return this;
    };

    Log.prototype.log = function log (level, msg) {
        var levelValue = levels[level],
            time = new Date().getTime(),
            self = this;
        setTimeout(function () {
            if (levelValue >= self.level) {
                appender(time + ' ' + level + ' ' + self.prefix + ' - ' + translit(msg));
            }
        }, 0);

        return this;
    };

    for(var logLevel in levels) {
        (function (level) {
            Log.prototype[level.toLowerCase()] = function (msg) {
                return this.log(level, msg);
            };
        }(logLevel));
    }

    if (console && typeof console.log === 'function') {
        appender = console.log.bind(console);
    } else {
        appender = {
            log : function () {}
        };
    }

}(window));