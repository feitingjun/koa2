webpackJsonp([15],{1434:function(e,t,r){"use strict";function a(e){return Object(O.a)("/api/hydrology/task-list?".concat(A.a.stringify(e)))}function n(e){return Object(O.a)("/api/hydrology/task-detail/".concat(e.id))}function o(e){return Object(O.a)("/api/hydrology/map-code?code=solution_type")}function c(e){return Object(O.a)("/api/hydrology/map-code?code=error_type")}function s(e){return Object(O.a)("/api/hydrology/map-code?code=handle_result")}function i(e){return Object(O.a)("/api/hydrology/map-code?code=task_result")}function l(e){return Object(O.a)("/api/hydrology/task-deal/".concat(e.id),{method:"post",body:j()(e)})}function u(e){return Object(O.a)("/api/hydrology/warning-task-department-users-list")}function p(e){return Object(O.a)("/api/hydrology/task-dispatch/".concat(e.id,"/").concat(e.userID),{method:"post"})}function d(e){return Object(O.a)("/api/hydrology/districts/".concat(e.id,"/children"))}Object.defineProperty(t,"__esModule",{value:!0});var f=r(1705),y=r.n(f),v=r(183),b=r.n(v),g=(r(184),r(185)),h=r.n(g),m=r(70),x=r.n(m),k=r(344),j=r.n(k),O=r(335),w=r(1521),A=r.n(w),R=r(1460),S=(r(125),r(178));t.default={namespace:"task",state:{data:[],total:null,page:null,detail:null,solutionType:[],errorType:[],handleResult:[],taskResult:[],userData:[],area:[]},reducers:{save:function(e,t){var r=t.payload,a=r.data,n=r.total,o=r.page;return x()({},e,{data:a,total:n,page:o})},detailSave:function(e,t){var r=t.payload.detail;return x()({},e,{detail:r})},solutionTypeSave:function(e,t){var r=t.payload.solutionType;return x()({},e,{solutionType:r})},errorTypeSave:function(e,t){var r=t.payload.errorType;return x()({},e,{errorType:r})},handleResultSave:function(e,t){var r=t.payload.handleResult;return x()({},e,{handleResult:r})},taskResultSave:function(e,t){var r=t.payload.taskResult;return x()({},e,{taskResult:r})},userSave:function(e,t){var r=t.payload.userData;return x()({},e,{userData:r})},saveArea:function(e,t){var r=t.payload.area;return x()({},e,{area:r})}},effects:{query:b.a.mark(function e(t,r){var n,o,c,s,i,l,u,p,d,f,y,v,g,m,x;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.payload,o=n.page,c=void 0===o?"1":o,s=n.adCode,i=void 0===s?"":s,l=n.stationName,u=void 0===l?"":l,p=n.status,d=void 0===p?"-1":p,f=n.pageSize,y=void 0===f?R.a:f,v=r.call,g=r.put,Object(S.d)(),e.next=5,v(a,{page:c,adCode:i,stationName:u,status:d,pageSize:y});case 5:if(m=e.sent,x=m.data,Object(S.c)(),!x||200!=x.code){e.next=13;break}return e.next=11,g({type:"save",payload:{data:x.data.content,total:parseInt(x.data.totalElements,10),page:parseInt(x.data.number+1,10)}});case 11:e.next=14;break;case 13:x?h.a.error(x.message):h.a.error("\u670d\u52a1\u5668\u9519\u8bef");case 14:case"end":return e.stop()}},e,this)}),getDetail:b.a.mark(function e(t,r){var a,o,c,s,i,l;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.payload.id,o=void 0===a?"":a,c=r.call,s=r.put,e.next=4,c(n,{id:o});case 4:if(i=e.sent,l=i.data,Object(S.c)(),!l||200!=l.code){e.next=12;break}return e.next=10,s({type:"detailSave",payload:{detail:l.data}});case 10:e.next=13;break;case 12:l?h.a.error(l.message):h.a.error("\u670d\u52a1\u5668\u9519\u8bef");case 13:case"end":return e.stop()}},e,this)}),getSolutionType:b.a.mark(function e(t,r){var a,n,c,s;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return y()(t.payload),a=r.call,n=r.put,e.next=4,a(o,{});case 4:if(c=e.sent,!(s=c.data)||200!=s.code){e.next=11;break}return e.next=9,n({type:"solutionTypeSave",payload:{solutionType:s.data}});case 9:e.next=12;break;case 11:s?h.a.error(s.message):h.a.error("\u670d\u52a1\u5668\u9519\u8bef");case 12:case"end":return e.stop()}},e,this)}),getErrorType:b.a.mark(function e(t,r){var a,n,o,s;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return y()(t.payload),a=r.call,n=r.put,e.next=4,a(c,{});case 4:if(o=e.sent,!(s=o.data)||200!=s.code){e.next=11;break}return e.next=9,n({type:"errorTypeSave",payload:{errorType:s.data}});case 9:e.next=12;break;case 11:s?h.a.error(s.message):h.a.error("\u670d\u52a1\u5668\u9519\u8bef");case 12:case"end":return e.stop()}},e,this)}),handle:b.a.mark(function e(t,r){var a,n,o,c,s,i,u,p;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.payload,n=a.values,o=a.search,c=a.resetRow,s=r.call,i=r.put,e.next=4,s(l,n);case 4:if(u=e.sent,p=u.data,Object(S.c)(),!p){e.next=17;break}if(200!=p.code){e.next=14;break}return h.a.success(p.message),e.next=12,i({type:"query",payload:x()({},o,{resetRow:c,id:n.id})});case 12:e.next=15;break;case 14:h.a.error(p.message);case 15:e.next=18;break;case 17:h.a.error("\u670d\u52a1\u5668\u9519\u8bef");case 18:case"end":return e.stop()}},e,this)}),getHandleResult:b.a.mark(function e(t,r){var a,n,o,c;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return y()(t.payload),a=r.call,n=r.put,e.next=4,a(s,{});case 4:if(o=e.sent,!(c=o.data)||200!=c.code){e.next=11;break}return e.next=9,n({type:"handleResultSave",payload:{handleResult:c.data}});case 9:e.next=12;break;case 11:c?h.a.error(c.message):h.a.error("\u670d\u52a1\u5668\u9519\u8bef");case 12:case"end":return e.stop()}},e,this)}),getTaskResult:b.a.mark(function e(t,r){var a,n,o,c;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return y()(t.payload),a=r.call,n=r.put,e.next=4,a(i,{});case 4:if(o=e.sent,!(c=o.data)||200!=c.code){e.next=11;break}return e.next=9,n({type:"taskResultSave",payload:{taskResult:c.data}});case 9:e.next=12;break;case 11:c?h.a.error(c.message):h.a.error("\u670d\u52a1\u5668\u9519\u8bef");case 12:case"end":return e.stop()}},e,this)}),getUser:b.a.mark(function e(t,r){var a,n,o,c;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return y()(t.payload),a=r.call,n=r.put,e.next=4,a(u,{});case 4:if(o=e.sent,!(c=o.data)||200!=c.code){e.next=11;break}return e.next=9,n({type:"userSave",payload:{userData:c.data}});case 9:e.next=12;break;case 11:c?h.a.error(c.message):h.a.error("\u670d\u52a1\u5668\u9519\u8bef");case 12:case"end":return e.stop()}},e,this)}),putAssign:b.a.mark(function e(t,r){var a,n,o,c,s,i,l,u,d;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.payload,n=a.id,o=a.userID,c=a.search,s=a.resetRow,i=r.call,l=r.put,e.next=4,i(p,{id:n,userID:o});case 4:if(u=e.sent,d=u.data,Object(S.c)(),!d){e.next=17;break}if(200!=d.code){e.next=14;break}return h.a.success(d.message),e.next=12,l({type:"query",payload:x()({},c,{resetRow:s})});case 12:e.next=15;break;case 14:h.a.error(d.message);case 15:e.next=18;break;case 17:h.a.error("\u670d\u52a1\u5668\u9519\u8bef");case 18:case"end":return e.stop()}},e,this)}),getArea:b.a.mark(function e(t,r){var a,n,o,c,s,i;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.payload.id,n=void 0===a?"540000":a,o=r.call,c=r.put,e.next=4,o(d,{id:n});case 4:if(s=e.sent,!(i=s.data)){e.next=15;break}if(200!=i.code){e.next=12;break}return e.next=10,c({type:"saveArea",payload:{area:i.data}});case 10:e.next=13;break;case 12:h.a.error(i.message);case 13:e.next=16;break;case 15:h.a.error("\u670d\u52a1\u5668\u9519\u8bef");case 16:case"end":return e.stop()}},e,this)})},subscriptions:{setup:function(e){var t=e.dispatch;return e.history.listen(function(e){var r=e.pathname;e.query,"/container/Task"===r&&(t({type:"query",payload:{}}),t({type:"getSolutionType",payload:{}}),t({type:"getErrorType",payload:{}}),t({type:"getHandleResult",payload:{}}),t({type:"getTaskResult",payload:{}}),t({type:"getUser",payload:{}}),t({type:"getArea",payload:{}}))})}}}},1460:function(e,t,r){"use strict";r.d(t,"a",function(){return a});var a=10},1476:function(e,t,r){"use strict";var a=Object.prototype.hasOwnProperty,n=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),o=function(e){for(var t;e.length;){var r=e.pop();if(t=r.obj[r.prop],Array.isArray(t)){for(var a=[],n=0;n<t.length;++n)void 0!==t[n]&&a.push(t[n]);r.obj[r.prop]=a}}return t},c=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},a=0;a<e.length;++a)void 0!==e[a]&&(r[a]=e[a]);return r},s=function e(t,r,n){if(!r)return t;if("object"!=typeof r){if(Array.isArray(t))t.push(r);else{if("object"!=typeof t)return[t,r];(n.plainObjects||n.allowPrototypes||!a.call(Object.prototype,r))&&(t[r]=!0)}return t}if("object"!=typeof t)return[t].concat(r);var o=t;return Array.isArray(t)&&!Array.isArray(r)&&(o=c(t,n)),Array.isArray(t)&&Array.isArray(r)?(r.forEach(function(r,o){a.call(t,o)?t[o]&&"object"==typeof t[o]?t[o]=e(t[o],r,n):t.push(r):t[o]=r}),t):Object.keys(r).reduce(function(t,o){var c=r[o];return a.call(t,o)?t[o]=e(t[o],c,n):t[o]=c,t},o)},i=function(e,t){return Object.keys(t).reduce(function(e,r){return e[r]=t[r],e},e)},l=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},u=function(e){if(0===e.length)return e;for(var t="string"==typeof e?e:String(e),r="",a=0;a<t.length;++a){var o=t.charCodeAt(a);45===o||46===o||95===o||126===o||o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122?r+=t.charAt(a):o<128?r+=n[o]:o<2048?r+=n[192|o>>6]+n[128|63&o]:o<55296||o>=57344?r+=n[224|o>>12]+n[128|o>>6&63]+n[128|63&o]:(a+=1,o=65536+((1023&o)<<10|1023&t.charCodeAt(a)),r+=n[240|o>>18]+n[128|o>>12&63]+n[128|o>>6&63]+n[128|63&o])}return r},p=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],a=0;a<t.length;++a)for(var n=t[a],c=n.obj[n.prop],s=Object.keys(c),i=0;i<s.length;++i){var l=s[i],u=c[l];"object"==typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:c,prop:l}),r.push(u))}return o(t)},d=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},f=function(e){return null!==e&&void 0!==e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))};e.exports={arrayToObject:c,assign:i,compact:p,decode:l,encode:u,isBuffer:f,isRegExp:d,merge:s}},1477:function(e,t,r){"use strict";var a=String.prototype.replace,n=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return a.call(e,n,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},1521:function(e,t,r){"use strict";var a=r(1522),n=r(1523),o=r(1477);e.exports={formats:o,parse:n,stringify:a}},1522:function(e,t,r){"use strict";var a=r(1476),n=r(1477),o={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},c=Date.prototype.toISOString,s={delimiter:"&",encode:!0,encoder:a.encode,encodeValuesOnly:!1,serializeDate:function(e){return c.call(e)},skipNulls:!1,strictNullHandling:!1},i=function e(t,r,n,o,c,i,l,u,p,d,f,y){var v=t;if("function"==typeof l)v=l(r,v);else if(v instanceof Date)v=d(v);else if(null===v){if(o)return i&&!y?i(r,s.encoder):r;v=""}if("string"==typeof v||"number"==typeof v||"boolean"==typeof v||a.isBuffer(v)){if(i){return[f(y?r:i(r,s.encoder))+"="+f(i(v,s.encoder))]}return[f(r)+"="+f(String(v))]}var b=[];if(void 0===v)return b;var g;if(Array.isArray(l))g=l;else{var h=Object.keys(v);g=u?h.sort(u):h}for(var m=0;m<g.length;++m){var x=g[m];c&&null===v[x]||(b=Array.isArray(v)?b.concat(e(v[x],n(r,x),n,o,c,i,l,u,p,d,f,y)):b.concat(e(v[x],r+(p?"."+x:"["+x+"]"),n,o,c,i,l,u,p,d,f,y)))}return b};e.exports=function(e,t){var r=e,c=t?a.assign({},t):{};if(null!==c.encoder&&void 0!==c.encoder&&"function"!=typeof c.encoder)throw new TypeError("Encoder has to be a function.");var l=void 0===c.delimiter?s.delimiter:c.delimiter,u="boolean"==typeof c.strictNullHandling?c.strictNullHandling:s.strictNullHandling,p="boolean"==typeof c.skipNulls?c.skipNulls:s.skipNulls,d="boolean"==typeof c.encode?c.encode:s.encode,f="function"==typeof c.encoder?c.encoder:s.encoder,y="function"==typeof c.sort?c.sort:null,v=void 0!==c.allowDots&&c.allowDots,b="function"==typeof c.serializeDate?c.serializeDate:s.serializeDate,g="boolean"==typeof c.encodeValuesOnly?c.encodeValuesOnly:s.encodeValuesOnly;if(void 0===c.format)c.format=n.default;else if(!Object.prototype.hasOwnProperty.call(n.formatters,c.format))throw new TypeError("Unknown format option provided.");var h,m,x=n.formatters[c.format];"function"==typeof c.filter?(m=c.filter,r=m("",r)):Array.isArray(c.filter)&&(m=c.filter,h=m);var k=[];if("object"!=typeof r||null===r)return"";var j;j=c.arrayFormat in o?c.arrayFormat:"indices"in c?c.indices?"indices":"repeat":"indices";var O=o[j];h||(h=Object.keys(r)),y&&h.sort(y);for(var w=0;w<h.length;++w){var A=h[w];p&&null===r[A]||(k=k.concat(i(r[A],A,O,u,p,d?f:null,m,y,v,b,x,g)))}var R=k.join(l),S=!0===c.addQueryPrefix?"?":"";return R.length>0?S+R:""}},1523:function(e,t,r){"use strict";var a=r(1476),n=Object.prototype.hasOwnProperty,o={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:a.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},c=function(e,t){for(var r={},a=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,c=t.parameterLimit===1/0?void 0:t.parameterLimit,s=a.split(t.delimiter,c),i=0;i<s.length;++i){var l,u,p=s[i],d=p.indexOf("]="),f=-1===d?p.indexOf("="):d+1;-1===f?(l=t.decoder(p,o.decoder),u=t.strictNullHandling?null:""):(l=t.decoder(p.slice(0,f),o.decoder),u=t.decoder(p.slice(f+1),o.decoder)),n.call(r,l)?r[l]=[].concat(r[l]).concat(u):r[l]=u}return r},s=function(e,t,r){for(var a=t,n=e.length-1;n>=0;--n){var o,c=e[n];if("[]"===c)o=[],o=o.concat(a);else{o=r.plainObjects?Object.create(null):{};var s="["===c.charAt(0)&&"]"===c.charAt(c.length-1)?c.slice(1,-1):c,i=parseInt(s,10);!isNaN(i)&&c!==s&&String(i)===s&&i>=0&&r.parseArrays&&i<=r.arrayLimit?(o=[],o[i]=a):o[s]=a}a=o}return a},i=function(e,t,r){if(e){var a=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,o=/(\[[^[\]]*])/,c=/(\[[^[\]]*])/g,i=o.exec(a),l=i?a.slice(0,i.index):a,u=[];if(l){if(!r.plainObjects&&n.call(Object.prototype,l)&&!r.allowPrototypes)return;u.push(l)}for(var p=0;null!==(i=c.exec(a))&&p<r.depth;){if(p+=1,!r.plainObjects&&n.call(Object.prototype,i[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(i[1])}return i&&u.push("["+a.slice(i.index)+"]"),s(u,t,r)}};e.exports=function(e,t){var r=t?a.assign({},t):{};if(null!==r.decoder&&void 0!==r.decoder&&"function"!=typeof r.decoder)throw new TypeError("Decoder has to be a function.");if(r.ignoreQueryPrefix=!0===r.ignoreQueryPrefix,r.delimiter="string"==typeof r.delimiter||a.isRegExp(r.delimiter)?r.delimiter:o.delimiter,r.depth="number"==typeof r.depth?r.depth:o.depth,r.arrayLimit="number"==typeof r.arrayLimit?r.arrayLimit:o.arrayLimit,r.parseArrays=!1!==r.parseArrays,r.decoder="function"==typeof r.decoder?r.decoder:o.decoder,r.allowDots="boolean"==typeof r.allowDots?r.allowDots:o.allowDots,r.plainObjects="boolean"==typeof r.plainObjects?r.plainObjects:o.plainObjects,r.allowPrototypes="boolean"==typeof r.allowPrototypes?r.allowPrototypes:o.allowPrototypes,r.parameterLimit="number"==typeof r.parameterLimit?r.parameterLimit:o.parameterLimit,r.strictNullHandling="boolean"==typeof r.strictNullHandling?r.strictNullHandling:o.strictNullHandling,""===e||null===e||void 0===e)return r.plainObjects?Object.create(null):{};for(var n="string"==typeof e?c(e,r):e,s=r.plainObjects?Object.create(null):{},l=Object.keys(n),u=0;u<l.length;++u){var p=l[u],d=i(p,n[p],r);s=a.merge(s,d,r)}return a.compact(s)}},1705:function(e,t){function r(e){if(null==e)throw new TypeError("Cannot destructure undefined")}e.exports=r}});