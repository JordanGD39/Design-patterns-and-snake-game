parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"slJc":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function n(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}Object.defineProperty(exports,"__esModule",{value:!0});var i=function(){function e(n,i){t(this,e),this.x=0,this.y=0,this.x=n,this.y=i}return n(e,[{key:"add",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t;this.x+=t,this.y+=e}},{key:"multiply",value:function(t){this.x*=t,this.y*=t}},{key:"distance",value:function(t){return new e(this.x-t.x,this.y-t.y).magnitude}},{key:"magnitude",get:function(){return Math.sqrt(this.x*this.x+this.y*this.y)}}]),e}();exports.Vector2=i;
},{}],"DXf5":[function(require,module,exports) {
"use strict";function o(o,e){if(!(o instanceof e))throw new TypeError("Cannot call a class as a function")}function e(o,e){for(var n=0;n<e.length;n++){var l=e[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(o,l.key,l)}}function n(o,n,l){return n&&e(o.prototype,n),l&&e(o,l),o}Object.defineProperty(exports,"__esModule",{value:!0});var l,i=!1,s=function(){function e(){o(this,e),this.engine=!1,this.wheels=0,this.doors=0,this.automatic=!1,this.color="black",console.log("Car has been made!")}return n(e,[{key:"buildEngine",value:function(){console.log("Building engine..."),console.log("Engine built!"),this.engine=!0}},{key:"drive",value:function(){console.log("car is driving!")}},{key:"buildWheels",value:function(o){console.log("Building wheel(s)..."),this.wheels=o,console.log("Wheel(s) built!")}},{key:"buildDoors",value:function(o){console.log("Building door(s)..."),this.doors=o,console.log("Door(s) built!")}},{key:"changeColor",value:function(o){console.log("Changing car color..."),this.color=o,console.log("Color changed to: "+o)}},{key:"changeAutomatic",value:function(o){console.log("Changing car type...");var e=o?"automatic":"manual";this.automatic=o,console.log("Car type changed to "+e)}},{key:"finishCar",value:function(){console.log("Your car: "),console.log("Has an engine: "+this.engine),console.log("Has "+this.wheels+" wheels"),console.log("Has "+this.doors+" doors"),console.log("Color: "+this.color),console.log("Automatic: "+this.automatic),i=!0}}]),e}();function a(){l=new s,t()}exports.Car=s;var r="Build engine";function t(){if(!i){var o=prompt("You can choose to: Build engine, Build wheels, Build doors, Change color, Change car type and Finish car. Type your choice here:",r);if(o){switch(r=o.toLowerCase(),console.log("Input: "+r),r){case"build engine":l.buildEngine();break;case"build wheels":if(!(o=prompt("How many?","1")))return void console.log("Answer is null!");l.buildWheels(parseInt(o));break;case"build doors":if(!(o=prompt("How many?","1")))return void console.log("Answer is null!");l.buildDoors(parseInt(o));break;case"change color":if(!(o=prompt("Color?","red")))return void console.log("Answer is null!");l.changeColor(o);break;case"change car type":if(!(o=prompt("Automatic?","yes")))return void console.log("Answer is null!");"yes"==o?l.changeAutomatic(!0):"no"==o?l.changeAutomatic(!1):console.log("Not valid answer!");break;case"finish car":l.finishCar();break;default:console.log("Not valid answer!")}t()}else console.log("Answer is null!")}}
},{}],"VYFe":[function(require,module,exports) {
"use strict";function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function t(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}Object.defineProperty(exports,"__esModule",{value:!0});var i,o=require("~Vector2"),a=require("./Builder"),r=function(){function n(){e(this,n)}return t(n,[{key:"buildCar",value:function(){var e=new a.Car;return e.drive(),e}},{key:"buildBoat",value:function(){var e=new u;return e.sail(),e}}]),n}(),u=function(){function n(){e(this,n),this.destination=new o.Vector2(0,0),console.log("Boat has been made!")}return t(n,[{key:"sail",value:function(){console.log("Boat is sailing")}},{key:"changeDestination",value:function(e){this.destination=e,console.log("Boat destination is: x: "+this.destination.x+" y: "+this.destination.y)}}]),n}();function l(){var e=(i=new r).buildCar(),n=i.buildBoat();e.changeColor("blue"),n.changeDestination(new o.Vector2(100,100))}
},{"~Vector2":"slJc","./Builder":"DXf5"}]},{},["VYFe"], null)