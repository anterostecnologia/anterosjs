var AnterosFilterDSL=function(){"use strict";function t(t,e){var n=Object.prototype.toString.call(e).slice(8,-1);return void 0!==e&&null!==e&&n===t}function e(t){return t===f.IS||t===f.BETWEEN||t===f.LIKE||t===f.EQ||t===f.NEQ||t===f.GEQ||t===f.LEQ||t===f.NOT||t===f.IN||t===f.IS_NOT||t===f.AND||t===f.OR}function n(){}function r(t){this.message=t,this.name="FilterException"}function i(t){this.fieldName=t,this.getFieldName=function(){return this.fieldName()},this.setFieldName=function(t){this.fieldName=t}}function o(t,e,n){this.lhsValue=t,this.rhsValue=n,this.operator=e}function s(t){this.expressions=t,this.getExpressions=function(){return this.expressions}}function p(){if(arguments.length<3)throw new r("Para usar a expressão IN informe os parâmetros corretamente.");this.field=arguments[0],this.negative=arguments[1],this.values=arguments[2],this.isNegative=function(){return this.negative}}function a(t,e,n){if(void 0===t)throw new r("Informe o valor do field para usar BETWEEN.");if(void 0===e)throw new r("Informe o valor inicial para usar BETWEEN.");if(void 0===n)throw new r("Informe o valor final para usar BETWEEN.");this.field=t,this.valueStart=e,this.valueEnd=n}function u(){for(var t=[],e=0;e<arguments.length;e++)t.push(arguments[e]);s.call(this,t)}function l(){for(var t=[],e=0;e<arguments.length;e++)t.push(arguments[e]);s.call(this,t)}function h(){this.filterExpression=null,this.assertWhereClauseIsInitialized=function(t){if(null==this.filterExpression||void 0===this.filterExpression)throw new r("Não é possível aplicar '"+t+"' operador se o cláusula WHERE não existir.")}}var f={IS:"IS",BETWEEN:"BETWEEN",LIKE:"LIKE",EQ:"EQ",NEQ:"NEQ",GEQ:"GEQ",LEQ:"LEQ",NOT:"NOT",IN:"IN",IS_NOT:"IS_NOT",AND:"AND",OR:"OR"},c={FIELD:"FIELD",FILTER:"FILTER",GROUP:"GROUP",OPERATION:"OPERATION",AND:"AND",OR:"OR",IN:"IN",BETWEEN:"BETWEEN"};i.prototype.expressionType=c.FIELD,i.prototype.toJSON=function(t){t.appendLine('"type" : "FIELD",'),t.appendLine('"name" : "'+this.fieldName+'"')},n.prototype=new n,n.prototype.constructor=n,n.prototype.expressionType=c.FILTER,n.prototype.applyOperation=function(t,e){throw new r("applyOperation só pode ser usado nas classes concretas.")},n.prototype.applyInOperation=function(){throw new r("applyInOperation só pode ser usado nas classes concretas.")},n.prototype.applyNotInOperation=function(){throw new r("applyNotInOperation só pode ser usado nas classes concretas.")},n.prototype.applyBetweenOperation=function(){throw new r("applyBetweenOperation só pode ser usado nas classes concretas.")},n.prototype.EQ=function(t){return this.applyOperation(f.EQ,t)},n.prototype.NEQ=function(t){return this.applyOperation(f.NEQ,t)},n.prototype.GEQ=function(t){return this.applyOperation(f.GEQ,t)},n.prototype.AND=function(){if(3===arguments.length)return new u(this,new o(arguments[0],arguments[1],arguments[2]));if(1===arguments.length){if("object"==typeof arguments[0]){if(void 0===arguments[0].expressionType)throw new r("Tipo de parâmetro incorreto para uso de AND. Parâmetro "+arguments[0]);return arguments[0].expressionType===c.FIELD?new u(this,new o(arguments[0])):new u(this,arguments[0])}throw new r("Parâmetro deve ser do tipo Object.")}throw new r("Número de parâmetros incorretos para a chamade de AND")},n.prototype.OR=function(){if(4===arguments.length)return new l(this,new l(arguments[0],arguments[1],arguments[2]));if(1===arguments.length){if("object"==typeof arguments[0]){if(void 0===arguments[0].expressionType)throw new r("Tipo de parâmetro incorreto para uso de OR. Parâmetro "+arguments[0]);return arguments[0].expressionType===c.FIELD?new l(this,new o(arguments[0])):new l(this,arguments[0])}throw new r("Parâmetro deve ser do tipo Object.")}throw new r("Número de parâmetros incorretos para a chamade de OR")},n.prototype.LEQ=function(t){return this.applyOperation(f.LEQ,t)},n.prototype.LIKE=function(t){return this.applyOperation(f.LIKE,t)},n.prototype.BETWEEN=function(t,e){return this.applyBetweenOperation(t,e)},n.prototype.STARTSWITH=function(t){if(AnterosStringUtils.isEmpty(t))throw new r("Para usar STARTSWITH informe um valor.");return t=t.concat("%"),this.applyOperation(f.LIKE,t)},n.prototype.CONTAINS=function(t){if(AnterosStringUtils.isEmpty(t))throw new r("Para usar STARTSWITH informe um valor.");return t="%".concat(t.concat("%")),this.applyOperation(f.LIKE,t)},n.prototype.IN=function(){return this.applyInOperation(arguments[0])},n.prototype.NOTIN=function(){return this.applyNotInOperation(arguments[0])},n.prototype.ISNULL=function(){return this.applyOperation(f.IS,"NULL")},n.prototype.ISNOTNULL=function(){return this.applyOperation(f.IS_NOT,"NULL")},n.prototype.toJSON=function(t){throw new r("toJSON deve ser implementado nas classes concretas herdadas de FilterExpression.")},o.prototype=new n,o.prototype.constructor=o,o.prototype.expressionType=c.OPERATION,o.prototype.applyOperation=function(t,n){if(!e(t))throw new r(t+" não é um operador válido.");if(void 0!==this.operator)throw new r("Não é possível aplicar "+t+" operation on an "+this.operator+" expression.");return new o(this.lhsValue,t,n)},o.prototype.applyInOperation=function(){if(0==arguments[0].length)throw new r("Para usar operação IN é necessário informar os valores.");if(!(this.lhsValue instanceof i))throw new r("Somente é possível aplicar a operação 'IN' em uma coluna.");return new p(this.lhsValue,!1,arguments[0])},o.prototype.applyNotInOperation=function(){if(0==arguments[0].length)throw new r("Para usar operação NOT IN é necessário informar os valores.");if(!(this.lhsValue instanceof i))throw new r("Somente é possível aplicar a operação 'NOT IN' em uma coluna.");return new p(this.lhsValue,!0,arguments[0])},o.prototype.applyBetweenOperation=function(t,e){if(void 0===t)throw new r("Para usar operação BETWEEN é necessário informar o valor inicial.");if(void 0===e)throw new r("Para usar operação BETWEEN é necessário informar o valor final.");if(!(this.lhsValue instanceof i))throw new r("Somente é possível aplicar a operação 'BETWEEN' em uma coluna.");return new a(this.lhsValue,t,e)},o.prototype.toJSON=function(e){e.appendLine('"type" : "OP",'),e.appendLine('"lhsValue" : {'),this.lhsValue.toJSON(e),e.appendLine("},"),t("Number",this.rhsValue)?e.appendLine('"rhsValue" : '+this.rhsValue+","):e.appendLine('"rhsValue" : "'+this.rhsValue+'",'),e.appendLine('"operator" : "'+this.operator+'"')},s.prototype=new n,s.prototype.constructor=s,s.prototype.expressionType=c.GROUP,s.prototype.getOperator=function(){throw new r("Uso incorreto do método. Este método deve ser implementado por classes concretas que herdam de GroupExpression.")},s.prototype.applyOperation=function(t,e){var n=this.expressions.length-1,r=this.expressions[n];return this.expressions[n]=r.applyOperation(t,e),this},s.prototype.applyInOperation=function(){var t=this.expressions.length-1,e=this.expressions[t];return this.expressions[t]=e.applyInOperation(arguments[0]),this},s.prototype.applyNotInOperation=function(){var t=this.expressions.length-1,e=this.expressions[t];return this.expressions[t]=e.applyNotInOperation(arguments[0]),this},s.prototype.applyBetweenOperation=function(t,e){var n=this.expressions.length-1,r=this.expressions[n];return this.expressions[n]=r.applyBetweenOperation(t,e),this},s.prototype.toJSON=function(t){t.appendLine('"type" : "'+this.getOperator()+'",'),t.appendLine('"expressions" : [');for(var e=!1,n=0;n<this.expressions.length;n++)e&&t.appendLine(","),t.append("{"),this.expressions[n].toJSON(t),t.append("}"),e=!0;t.appendLine("]")},p.prototype=new n,p.prototype.constructor=p,p.prototype.expressionType=c.IN,p.prototype.applyOperation=function(t,e){throw new r("Não é possível aplicar a operação "+t+" na expressão IN.")},p.prototype.applyInOperation=function(){throw new r("Não é possível aplicar a operação IN na expressão IN.")},p.prototype.applyNotInOperation=function(){throw new r("Não é possível aplicar a operação NOT IN na expressão IN.")},p.prototype.applyBetweenOperation=function(t,e){throw new r("Não é possível aplicar a operação BETWEEEN na expressão IN.")},p.prototype.toJSON=function(e){e.appendLine('"type" : "IN",'),e.appendLine('"field" : {'),this.field.toJSON(e),e.appendLine("},"),e.appendLine('"values" : [');for(var n=!1,r=0;r<this.values.length;r++)n&&e.append(","),t("Number",this.values[r])?e.append(this.values[r]):e.append('"'+this.values[r]+'"'),n=!0;e.appendLine("],"),e.appendLine('"negative" : '+this.negative)},a.prototype=new n,a.prototype.constructor=a,a.prototype.expressionType=c.BETWEEN,a.prototype.applyOperation=function(t,e){throw new r("Não é possível aplicar a operação "+t+" na expressão BETWEEN.")},a.prototype.applyInOperation=function(){throw new r("Não é possível aplicar a operação IN na expressão BETWEEN.")},a.prototype.applyNotInOperation=function(){throw new r("Não é possível aplicar a operação NOT IN na expressão BETWEEN.")},a.prototype.applyBetweenOperation=function(t,e){throw new r("Não é possível aplicar a operação BETWEEEN na expressão BETWEEN.")},a.prototype.toJSON=function(e){e.appendLine('"type" : "BETWEEN",'),e.appendLine('"field" : {'),this.field.toJSON(e),e.appendLine("},"),t("Number",this.valueStart)?e.appendLine('"valueStart" : '+this.valueStart+","):e.appendLine('"valueStart" : "'+this.valueStart+'",'),t("Number",this.valueEnd)?e.appendLine('"valueEnd" : '+this.valueEnd):e.appendLine('"valueEnd" : "'+this.valueEnd)},u.prototype=new s,u.prototype.constructor=u,u.prototype.expressionType=c.AND,u.prototype.getOperator=function(){return f.AND},l.prototype=new s,l.prototype.constructor=l,l.prototype.expressionType=c.OR,l.prototype.getOperator=function(){return f.OR},h.prototype=new h,h.prototype.constructor=h,h.prototype.FIELD=function(t){return new i(t)},h.prototype.EXP=function(t){return new o(t)},h.prototype.WHERE=function(){if(arguments.length<1)throw new r("Para criar uma condição WHERE informe ao menos um parâmetro.");return 3===arguments.length?void 0!==arguments[2]&&(this.filterExpression=new o(arguments[0],arguments[1],arguments[2])):(this.filterExpression=arguments[0],void 0!==arguments[0].expressionType&&arguments[0].expressionType===c.FIELD&&(this.filterExpression=new o(arguments[0]))),this},h.prototype.EQ=function(t){return this.assertWhereClauseIsInitialized("eq"),this.filterExpression=this.filterExpression.EQ(t),this},h.prototype.NEQ=function(t){return this.assertWhereClauseIsInitialized("neq"),this.filterExpression=this.filterExpression.NEQ(t),this},h.prototype.GEQ=function(t){return this.assertWhereClauseIsInitialized("geq"),this.filterExpression=this.filterExpression.GEQ(t),this},h.prototype.LEQ=function(t){return this.assertWhereClauseIsInitialized("leq"),this.filterExpression=this.filterExpression.LEQ(t),this},h.prototype.LIKE=function(t){return this.assertWhereClauseIsInitialized("like"),this.filterExpression=this.filterExpression.LIKE(t),this},h.prototype.IN=function(){for(var t=[],e=0;e<arguments.length;e++)t.push(arguments[e]);return this.assertWhereClauseIsInitialized("in"),this.filterExpression=this.filterExpression.IN(t),this},h.prototype.NOTIN=function(){for(var t=[],e=0;e<arguments.length;e++)t.push(arguments[e]);return this.assertWhereClauseIsInitialized("not in"),this.filterExpression=this.filterExpression.NOTIN(t),this},h.prototype.AND=function(t){return this.assertWhereClauseIsInitialized("and"),this.filterExpression=this.filterExpression.AND(t),this},h.prototype.OR=function(t){return this.assertWhereClauseIsInitialized("or"),this.filterExpression=this.filterExpression.OR(t),this},h.prototype.ISNULL=function(){return this.assertWhereClauseIsInitialized("isNull"),this.filterExpression=this.filterExpression.ISNULL(),this},h.prototype.ISNOTNULL=function(){return this.assertWhereClauseIsInitialized("isNotNull"),this.filterExpression=this.filterExpression.ISNOTNULL(),this},h.prototype.betweenOrOp=function(t,e,n){return this.assertWhereClauseIsInitialized(t),this.filterExpression=this.filterExpression.betweenOrOp(t,e,n),this},h.prototype.BETWEEN=function(t,e){return this.assertWhereClauseIsInitialized("between"),this.filterExpression=this.filterExpression.BETWEEN(t,e),this},h.prototype.OP=function(t,e){return this.assertWhereClauseIsInitialized(t),this.filterExpression=this.filterExpression.applyOperation(op,e),this},h.prototype.STARTSWITH=function(t){return this.assertWhereClauseIsInitialized("startsWith"),this.filterExpression=this.filterExpression.STARTSWITH(t),this},h.prototype.CONTAINS=function(t){return this.assertWhereClauseIsInitialized("contains"),this.filterExpression=this.filterExpression.CONTAINS(t),this},h.prototype.toJSON=function(){if(void 0!==this.filterExpression){var t=AnterosStringUtils.createStringBuilder();return t.appendLine("{"),t.appendLine('   "filterExpression" : {'),this.filterExpression.toJSON(t),t.appendLine("}"),t.appendLine("}"),t.toString()}return""};var E={createFilter:function(){return new h}};return E}(),AnterosStringUtils=function(){"use strict";function t(t,e,n){return E(t)?null:n>=4?"..."+String(t).substring(n,e)+"...":String(t).substring(0,e)+"..."}function e(t,e,n){return E(t)?null:(t=String(t),n>0&&n<t.length?t.substring(0,n)+e+t.substring(n):t)}function n(t,e,n){var r=!1;return E(t)?t:(t=String(t),e=String(e),r=void 0!==n&&n.length>0?n.every(function(e){return this.endsWith(t,String(e))}.bind(this)):this.endsWith(t,e),r?t:t+=e)}function r(t){return E(t)?null:(t=String(t),t.substring(0,1).toUpperCase()+t.substring(1))}function i(t){var e=/[\n\r]{1}$/;return E(t)?null:t.replace(e,"")}function o(t){return E(t)?null:t.indexOf("\r\n")===t.length-2?t.substring(0,t.length-2):t.substring(0,t.length-1)}function s(t,e){if(E(t)||E(e))return null;var n=0,r=String(t).split(""),i=String(e).split("");return r.forEach(function(t,e){t===i[e]&&(n=e+1)}),i.join("").substring(n)}function p(t,e){return t=String(t),e=String(e),t.indexOf(e)===t.length-e.length}function a(t,e){return this.endsWith(String(t).toLowerCase(),String(e).toLowerCase())}function u(t,e){return e.some(function(e){return this.endsWith(t,e)}.bind(this))}function l(t,e){return String(t)===String(e)?-1:String(e).indexOf(this.difference(t,e))}function h(t){return E(t)?!1:/^[a-z]*$/.test(t)}function f(t){return E(t)?!1:/^[A-Z]*$/.test(t)}function c(){var t=Array.prototype.slice.call(arguments);return t.some(function(t){return E(t)})}function E(t){return null==t||0==t.length}function y(){var t=Array.prototype.slice.call(arguments);return t.every(function(t){return d(String(t))})}function d(t){return null!==t&&t.length>0}function N(t,e,n){var r="";n=void 0!==n?String(n):"";for(var i=0;e>i;i++)r+=n.length>0?String(n):" ";return r+String(t)}function g(t){return String(t).replace(/\s\s+/g," ").trim()}function I(t,e,n){var r=!1;return E(t)?t:(t=String(t),e=String(e),r=void 0!==n&&n.length>0?n.every(function(e){return r(t,String(e))}.bind(this)):this.startsWith(t,e),r?t:e+t)}function w(t,e){var n;return E(t)?null:(t=String(t),e=String(e),n=t.indexOf(e),n===t.length-e.length?t.substring(0,n):t)}function O(t,e){var n,r;return E(t)?null:(t=String(t),r=t,e=String(e).toLowerCase(),t=t.toLowerCase(),n=t.indexOf(e),n===t.length-e.length?r.substring(0,n):r)}function v(t,e){return E(t)?null:(t=String(t),e=String(e),0===t.indexOf(e)?t.substring(e.length):t)}function S(t,e){var n;return E(t)?null:(t=String(t),n=t,e=String(e).toLowerCase(),t=t.toLowerCase(),0===t.indexOf(e)?n.substring(e.length):n)}function x(t,e,n){var r="";if(null===t||void 0===t)return null;if(void 0!==n){for(var i=0;e-1>i;i++)r+=String(t)+n;r+=String(t)}else for(var i=0;e>i;i++)r+=String(t);return r}function L(t,e,n){var r="";n=void 0!==n?String(n):"";for(var i=0;e>i;i++)r+=n.length>0?String(n):" ";return String(t)+r}function m(t,e){return 0===String(t).indexOf(String(e))}function T(t,e){return this.startsWith(String(t).toLowerCase(),String(e).toLowerCase())}function W(t,e){return e.some(function(e){return this.startsWith(t,e)}.bind(this))}function C(t){var e="";return E(t)?null:(t.split("").forEach(function(t){e+=t===t.toUpperCase()?t.toLowerCase():t.toUpperCase()}),e)}function b(t){return E(t)?null:(t=String(t),t.substring(0,1).toLowerCase()+t.substring(1))}function A(t,e){return String(e)+String(t)+String(e)}function B(){var t=[];this.append=function(n){return n=e(n),n.length>0&&(t[t.length]=n),this},this.appendLine=function(n){if(n=e(n),this.isEmpty()){if(!(n.length>0))return this;t[t.length]=n}else t[t.length]=n.length>0?"\r\n"+n:"\r\n";return this},this.clear=function(){return t=[],this},this.isEmpty=function(){return 0==t.length},this.toString=function(){return t.join("")};var e=function(t){return n(t)?r(t)!=r(new String)?String(t):t:""},n=function(t){return null!=t&&"undefined"!=typeof t},r=function(t){if(!n(t.constructor))throw Error("Unexpected object type");var e=String(t.constructor).match(/function\s+(\w+)/);return n(e)?e[1]:"undefined"}}function R(){return new B}var Q={abbreviate:t,abbreviateMiddle:e,appendIfMissing:n,capitalize:r,chomp:i,chop:o,createStringBuilder:R,difference:s,endsWith:p,endsWithIgnoreCase:a,endsWithAny:u,indexOfDifference:l,isAllLowercase:h,isAllUppercase:f,isAnyEmpty:c,isEmpty:E,isNoneEmpty:y,isNotEmpty:d,leftPad:N,normalizeSpace:g,prependIfMissing:I,removeEnd:w,removeEndIgnoreCase:O,removeStart:v,removeStartIgnoreCase:S,repeat:x,rightPad:L,startsWith:m,startsWithIgnoreCase:T,startsWithAny:W,swapCase:C,uncapitalize:b,wrap:A};return Q}();