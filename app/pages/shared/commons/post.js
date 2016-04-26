System.register(['angular2/core', 'angular2/http', './../jwt', './../../shared/config'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, jwt_1, config_1;
    var HttpPostCommons;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (jwt_1_1) {
                jwt_1 = jwt_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            HttpPostCommons = (function () {
                function HttpPostCommons(_authJwtToken) {
                    this._authJwtToken = _authJwtToken;
                }
                HttpPostCommons.prototype.transferBalance = function (amount, provider, type) {
                    var _this = this;
                    var header = new http_1.Headers();
                    return new Promise(function (resolve, reject) {
                        header.append('Authorization', _this._authJwtToken.getToken());
                        oboe({
                            url: config_1.CONFIG.hostName + '/api_v1/user/transfer/balance/' + provider + '?amount=' + amount + '&type=' + type,
                            method: 'POST',
                            headers: header
                        })
                            .done(function (user) {
                            if (user.data) {
                                resolve(user);
                            }
                        })
                            .fail(function (error) {
                            reject(error);
                        });
                    });
                };
                HttpPostCommons = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [jwt_1.AuthJwtToken])
                ], HttpPostCommons);
                return HttpPostCommons;
            }());
            exports_1("HttpPostCommons", HttpPostCommons);
        }
    }
});
//# sourceMappingURL=post.js.map