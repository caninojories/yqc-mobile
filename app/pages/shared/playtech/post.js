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
    var HttpPostPlaytech;
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
            HttpPostPlaytech = (function () {
                function HttpPostPlaytech(_authJwtToken) {
                    this._authJwtToken = _authJwtToken;
                }
                HttpPostPlaytech.prototype.transferBalancePT = function (amount, gameType, bankType) {
                    var header = new http_1.Headers();
                    header.append('Authorization', this._authJwtToken.getToken());
                    return new Promise(function (resolve, reject) {
                        oboe({
                            url: config_1.CONFIG.hostName + '/api_v1/user/transfer/balance/PT/' + gameType + '?amount=' + amount + '&bankType=' + bankType,
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
                HttpPostPlaytech = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [jwt_1.AuthJwtToken])
                ], HttpPostPlaytech);
                return HttpPostPlaytech;
            }());
            exports_1("HttpPostPlaytech", HttpPostPlaytech);
        }
    }
});
//# sourceMappingURL=post.js.map