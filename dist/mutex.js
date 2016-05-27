(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'knockout'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('knockout'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.knockout);
        global.mutex = mod.exports;
    }
})(this, function (exports, _knockout) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _knockout2 = _interopRequireDefault(_knockout);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function Mutex() {
        var self = this;

        self.locked = _knockout2.default.observable();
    } // Copyright (c) CBC/Radio-Canada. All rights reserved.
    // Licensed under the MIT license. See LICENSE file in the project root for full license information.

    //TODO: Déplacer vers un bower component stand-alone


    Mutex.prototype.lock = function (action) {
        var self = this;

        if (self.locked()) {
            var subscription = self.locked.subscribe(function () {
                subscription.dispose();
                lock(self, action);
            });
        } else {
            lock(self, action);
        }
    };

    Mutex.prototype.tryLockAuto = function (previousValue, action) {
        var self = this;

        // if (self.locked()) {
        //     var subscription = self.locked.subscribe(function() {
        //         subscription.dispose();
        //         return action();
        //     });
        // } else {
        //      return action();
        // }

        if (!self.locked()) {
            return action();
        } else {
            return previousValue;
        }
    };

    Mutex.prototype.unlock = function () {
        var self = this;

        self.locked(false);
    };

    function lock(self, action) {
        self.locked(true);
        action(self.unlock.bind(self));
    }

    exports.default = Mutex;
});