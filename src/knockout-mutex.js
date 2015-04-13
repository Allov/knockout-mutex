// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

//TODO: Déplacer vers un bower component stand-alone
define(['knockout'],
    function(ko) {
        'use strict';

        function Mutex() {
            var self = this;

            self.locked = ko.observable();
        }

        Mutex.prototype.lock = function(action) {
            var self = this;

            if (self.locked()) {
                var subscription = self.locked.subscribe(function() {
                    subscription.dispose();
                    lock(self, action);
                });
            } else {
                lock(self, action);
            }
        };

        Mutex.prototype.tryLockAuto = function(previousValue, action) {
            var self = this;

            // if (self.locked()) {
            //     var subscription = self.locked.subscribe(function() {
            //         subscription.dispose();
            //         return action();
            //     });
            // } else {
            //      return action();
            // }

            if(!self.locked()){
                return action();
            }else{
                return previousValue;
            }
        };

        Mutex.prototype.unlock = function() {
            var self = this;

            self.locked(false);
        };

        function lock(self, action) {
            self.locked(true);
            action(self.unlock.bind(self));
        }

        return Mutex;
    });
