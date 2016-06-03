/*******************************************************************************
 * Copyright 2016 Anteros Tecnologia
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/

 /* 
 * @version 1.0.0
 * @author  Edson Martins e Andreo Santana
 * @updated 2016-06-03
 * @link    https://github.com/anterostecnologia/anterosjs
 */
var AnterosFilterDSL = (function() {
    var Operator = {
        IS: 'IS',
        BETWEEN: 'BETWEEN',
        LIKE: 'LIKE',
        EQ: 'EQ',
        NEQ: 'NEQ',
        GEQ: 'GEQ',
        LEQ: 'LEQ',
        NOT: 'NOT',
        IN: 'IN',
        IS_NOT: 'IS_NOT',
        AND: 'AND',
        OR: 'OR'
    };

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }


    function isOperator(operator) {
        return ((operator === Operator.IS) ||
            (operator === Operator.BETWEEN) ||
            (operator === Operator.LIKE) ||
            (operator === Operator.EQ) ||
            (operator === Operator.NEQ) ||
            (operator === Operator.GEQ) ||
            (operator === Operator.LEQ) ||
            (operator === Operator.NOT) ||
            (operator === Operator.IN) ||
            (operator === Operator.IS_NOT) ||
            (operator === Operator.AND) ||
            (operator === Operator.OR));
    }

    var ExpressionType = {
        FIELD: 'FIELD',
        FILTER: 'FILTER',
        GROUP: 'GROUP',
        OPERATION: 'OPERATION',
        AND: 'AND',
        OR: 'OR',
        IN: 'IN',
        BETWEEN: 'BETWEEN'
    };


    function FilterExpression() {

    };

    function FilterException(message) {
        this.message = message;
        this.name = "FilterException";
    }

    /**
     *
     *  Field Expression
     */
    function FieldExpression(fieldName) {
        this.fieldName = fieldName;

        this.getFieldName = function() {
            return this.fieldName();
        };

        this.setFieldName = function(fieldName) {
            this.fieldName = fieldName;
        };

    };

    FieldExpression.prototype.expressionType = ExpressionType.FIELD;
    FieldExpression.prototype.toJSON = function(sb) {
        sb.appendLine('"type" : "FIELD",');
        sb.appendLine('"name" : "' + this.fieldName + '"');
    }

    /**
     *
     *  Filter Expression
     */

    FilterExpression.prototype = new FilterExpression();
    FilterExpression.prototype.constructor = FilterExpression;
    FilterExpression.prototype.expressionType = ExpressionType.FILTER;
    FilterExpression.prototype.applyOperation = function(operator, value) {
        throw new FilterException("applyOperation só pode ser usado nas classes concretas.");
    }
    FilterExpression.prototype.applyInOperation = function() {
        throw new FilterException("applyInOperation só pode ser usado nas classes concretas.");
    }
    FilterExpression.prototype.applyNotInOperation = function() {
        throw new FilterException("applyNotInOperation só pode ser usado nas classes concretas.");
    }
    FilterExpression.prototype.applyBetweenOperation = function() {
        throw new FilterException("applyBetweenOperation só pode ser usado nas classes concretas.");
    }
    FilterExpression.prototype.EQ = function(value) {
        return this.applyOperation(Operator.EQ, value);
    }

    FilterExpression.prototype.NEQ = function(value) {
        return this.applyOperation(Operator.NEQ, value);
    }

    FilterExpression.prototype.GEQ = function(value) {
        return this.applyOperation(Operator.GEQ, value);
    }

    FilterExpression.prototype.AND = function() {
        if (arguments.length === 3) {
            return new AndExpression(this, new OperationExpression(arguments[0], arguments[1], arguments[2]));
        } else if (arguments.length === 1) {
            if (typeof arguments[0] === "object") {
                if (arguments[0].expressionType === undefined) {
                    throw new FilterException("Tipo de parâmetro incorreto para uso de AND. Parâmetro " + arguments[0]);
                } else {
                    if (arguments[0].expressionType === ExpressionType.FIELD) {
                        return new AndExpression(this, new OperationExpression(arguments[0]));
                    } else {
                        return new AndExpression(this, arguments[0]);
                    }
                };
            } else {
                throw new FilterException("Parâmetro deve ser do tipo Object.");
            };
        } else {
            throw new FilterException("Número de parâmetros incorretos para a chamade de AND");
        };
    }

    FilterExpression.prototype.OR = function() {
        if (arguments.length === 4) {
            return new OrExpression(this, new OrExpression(arguments[0], arguments[1], arguments[2]));
        } else if (arguments.length === 1) {
            if (typeof arguments[0] === "object") {
                if (arguments[0].expressionType === undefined) {
                    throw new FilterException("Tipo de parâmetro incorreto para uso de OR. Parâmetro " + arguments[0]);
                } else {
                    if (arguments[0].expressionType === ExpressionType.FIELD) {
                        return new OrExpression(this, new OperationExpression(arguments[0]));
                    } else {
                        return new OrExpression(this, arguments[0]);
                    }
                };
            } else {
                throw new FilterException("Parâmetro deve ser do tipo Object.");
            };
        } else {
            throw new FilterException("Número de parâmetros incorretos para a chamade de OR");
        };
    }

    FilterExpression.prototype.LEQ = function(value) {
        return this.applyOperation(Operator.LEQ, value);
    }

    FilterExpression.prototype.LIKE = function(value) {
        return this.applyOperation(Operator.LIKE, value);
    }

    FilterExpression.prototype.BETWEEN = function(valueStart, valueEnd) {
        return this.applyBetweenOperation(valueStart, valueEnd);
    }

    FilterExpression.prototype.STARTSWITH = function(value) {
        if (AnterosStringUtils.isEmpty(value)) {
            throw new FilterException("Para usar STARTSWITH informe um valor.");
        }
        value = value.concat("%");
        return this.applyOperation(Operator.LIKE, value);
    }

    FilterExpression.prototype.CONTAINS = function(value) {
        if (AnterosStringUtils.isEmpty(value)) {
            throw new FilterException("Para usar STARTSWITH informe um valor.");
        }
        value = '%'.concat(value.concat("%"));
        return this.applyOperation(Operator.LIKE, value);
    }

    FilterExpression.prototype.IN = function() {
        return this.applyInOperation(arguments[0]);
    }

    FilterExpression.prototype.NOTIN = function() {
        return this.applyNotInOperation(arguments[0]);
    }

    FilterExpression.prototype.ISNULL = function() {
        return this.applyOperation(Operator.IS, 'NULL');
    }

    FilterExpression.prototype.ISNOTNULL = function() {
        return this.applyOperation(Operator.IS_NOT, 'NULL');
    }
    FilterExpression.prototype.toJSON = function(sb) {
        throw new FilterException("toJSON deve ser implementado nas classes concretas herdadas de FilterExpression.");
    }


    /**
     *
     *  Operation Expression
     */

    function OperationExpression(lhsValue, operator, rhsValue) {
        this.lhsValue = lhsValue;
        this.rhsValue = rhsValue;
        this.operator = operator;
    }

    OperationExpression.prototype = new FilterExpression();
    OperationExpression.prototype.constructor = OperationExpression;
    OperationExpression.prototype.expressionType = ExpressionType.OPERATION;

    OperationExpression.prototype.applyOperation = function(newOperator, newRhsValue) {
        if (!isOperator(newOperator)) {
            throw new FilterException(newOperator + " não é um operador válido.");
        }

        if (this.operator !== undefined) {
            throw new FilterException("Não é possível aplicar " + newOperator + " operation on an " + this.operator + " expression.");
        }

        return new OperationExpression(this.lhsValue, newOperator, newRhsValue);
    }

    OperationExpression.prototype.applyInOperation = function() {

        if (arguments[0].length == 0) {
            throw new FilterException("Para usar operação IN é necessário informar os valores.");
        }

        if (!(this.lhsValue instanceof FieldExpression)) {
            throw new FilterException(
                "Somente é possível aplicar a operação 'IN' em uma coluna.");
        }
        return new InExpression(this.lhsValue, false, arguments[0]);
    }

    OperationExpression.prototype.applyNotInOperation = function() {
        if (arguments[0].length == 0) {
            throw new FilterException("Para usar operação NOT IN é necessário informar os valores.");
        }

        if (!(this.lhsValue instanceof FieldExpression)) {
            throw new FilterException(
                "Somente é possível aplicar a operação 'NOT IN' em uma coluna.");
        }
        return new InExpression(this.lhsValue, true, arguments[0]);
    }

    OperationExpression.prototype.applyBetweenOperation = function(valueStart, valueEnd) {
        if (valueStart === undefined) {
            throw new FilterException("Para usar operação BETWEEN é necessário informar o valor inicial.");
        }

        if (valueEnd === undefined) {
            throw new FilterException("Para usar operação BETWEEN é necessário informar o valor final.");
        }

        if (!(this.lhsValue instanceof FieldExpression)) {
            throw new FilterException(
                "Somente é possível aplicar a operação 'BETWEEN' em uma coluna.");
        }
        return new BetweenExpression(this.lhsValue, valueStart, valueEnd);
    }
    OperationExpression.prototype.toJSON = function(sb) {
        sb.appendLine('"type" : "OP",');
        sb.appendLine('"lhsValue" : {');
        this.lhsValue.toJSON(sb);
        sb.appendLine('},');
        if (is('Number', this.rhsValue)) {
            sb.appendLine('"rhsValue" : ' + this.rhsValue + ',');
        } else {
            sb.appendLine('"rhsValue" : "' + this.rhsValue + '",');
        }

        sb.appendLine('"operator" : "' + this.operator + '"');
    }


    /**
     *
     *  Group Expression
     */

    function GroupExpression(expressions) {
        this.expressions = expressions;


        this.getExpressions = function() {
            return this.expressions;
        }
    };

    GroupExpression.prototype = new FilterExpression();
    GroupExpression.prototype.constructor = GroupExpression;
    GroupExpression.prototype.expressionType = ExpressionType.GROUP;
    GroupExpression.prototype.getOperator = function() {
        throw new FilterException("Uso incorreto do método. Este método deve ser implementado por classes concretas que herdam de GroupExpression.")
    }
    GroupExpression.prototype.applyOperation = function(operator, value) {
        var lastIndex = this.expressions.length - 1;
        var lastClause = this.expressions[lastIndex];
        this.expressions[lastIndex] = lastClause.applyOperation(operator, value);
        return this;
    }
    GroupExpression.prototype.applyInOperation = function() {
        var lastIndex = this.expressions.length - 1;
        var lastClause = this.expressions[lastIndex];
        this.expressions[lastIndex] = lastClause.applyInOperation(arguments[0]);
        return this;
    }
    GroupExpression.prototype.applyNotInOperation = function() {
        var lastIndex = this.expressions.length - 1;
        var lastClause = this.expressions[lastIndex];
        this.expressions[lastIndex] = lastClause.applyNotInOperation(arguments[0]);
        return this;
    }
    GroupExpression.prototype.applyBetweenOperation = function(valueStart, valueEnd) {
        var lastIndex = this.expressions.length - 1;
        var lastClause = this.expressions[lastIndex];
        this.expressions[lastIndex] = lastClause.applyBetweenOperation(valueStart, valueEnd);
        return this;
    }
    GroupExpression.prototype.toJSON = function(sb) {
        sb.appendLine('"type" : "' + this.getOperator() + '",');
        sb.appendLine('"expressions" : [')
        var appendDelimiter = false;
        for (var i = 0; i < this.expressions.length; i++) {
            if (appendDelimiter) {
                sb.appendLine(',');
            }
            sb.append('{');
            this.expressions[i].toJSON(sb);
            sb.append('}');


            appendDelimiter = true;
        };
        sb.appendLine(']');
    }



    /**
     *
     *  IN Expression
     */
    function InExpression() {
        if (arguments.length < 3) {
            throw new FilterException('Para usar a expressão IN informe os parâmetros corretamente.');
        }

        this.field = arguments[0];
        this.negative = arguments[1];
        this.values = arguments[2];

        this.isNegative = function() {
            return this.negative;
        }
    }

    InExpression.prototype = new FilterExpression();
    InExpression.prototype.constructor = InExpression;
    InExpression.prototype.expressionType = ExpressionType.IN;
    InExpression.prototype.applyOperation = function(operator, value) {
        throw new FilterException("Não é possível aplicar a operação " + operator + " na expressão IN.");
    }
    InExpression.prototype.applyInOperation = function() {
        throw new FilterException(
            "Não é possível aplicar a operação IN na expressão IN.");
    }
    InExpression.prototype.applyNotInOperation = function() {
        throw new FilterException(
            "Não é possível aplicar a operação NOT IN na expressão IN.");
    }
    InExpression.prototype.applyBetweenOperation = function(valueStart, valueEnd) {
        throw new FilterException(
            "Não é possível aplicar a operação BETWEEEN na expressão IN.");
    }
    InExpression.prototype.toJSON = function(sb) {
        sb.appendLine('"type" : "IN",');
        sb.appendLine('"field" : {');
        this.field.toJSON(sb);
        sb.appendLine('},');
        sb.appendLine('"values" : [');
        var appendDelimiter = false;

        for (var i = 0; i < this.values.length; i++) {
            if (appendDelimiter)
                sb.append(',');

            if (is('Number', this.values[i])) {
                sb.append(this.values[i]);
            } else {
                sb.append('"' + this.values[i] + '"');
            }
            appendDelimiter = true;
        };
        sb.appendLine('],');
        sb.appendLine('"negative" : ' + this.negative);
    }

    /**
     *
     *  BETWEEN Expression
     */
    function BetweenExpression(field, valueStart, valueEnd) {
        if (field === undefined) {
            throw new FilterException('Informe o valor do field para usar BETWEEN.');
        }
        if (valueStart === undefined) {
            throw new FilterException('Informe o valor inicial para usar BETWEEN.');
        }
        if (valueEnd === undefined) {
            throw new FilterException('Informe o valor final para usar BETWEEN.');
        }

        this.field = field;
        this.valueStart = valueStart;
        this.valueEnd = valueEnd;
    }

    BetweenExpression.prototype = new FilterExpression();
    BetweenExpression.prototype.constructor = BetweenExpression;
    BetweenExpression.prototype.expressionType = ExpressionType.BETWEEN;
    BetweenExpression.prototype.applyOperation = function(operator, value) {
        throw new FilterException("Não é possível aplicar a operação " + operator + " na expressão BETWEEN.");
    }
    BetweenExpression.prototype.applyInOperation = function() {
        throw new FilterException(
            "Não é possível aplicar a operação IN na expressão BETWEEN.");
    }
    BetweenExpression.prototype.applyNotInOperation = function() {
        throw new FilterException(
            "Não é possível aplicar a operação NOT IN na expressão BETWEEN.");
    }
    BetweenExpression.prototype.applyBetweenOperation = function(valueStart, valueEnd) {
        throw new FilterException(
            "Não é possível aplicar a operação BETWEEEN na expressão BETWEEN.");
    }
    BetweenExpression.prototype.toJSON = function(sb) {
        sb.appendLine('"type" : "BETWEEN",');
        sb.appendLine('"field" : {');
        this.field.toJSON(sb);
        sb.appendLine('},');
        if (is('Number', this.valueStart)) {
            sb.appendLine('"valueStart" : ' + this.valueStart + ',');
        } else {
            sb.appendLine('"valueStart" : "' + this.valueStart + '",');
        }
        if (is('Number', this.valueEnd)) {
            sb.appendLine('"valueEnd" : ' + this.valueEnd);
        } else {
            sb.appendLine('"valueEnd" : "' + this.valueEnd);
        }
    }

    /**
     *
     *  AND Expression
     */
    function AndExpression() {
        var expressions = [];
        for (var i = 0; i < arguments.length; i++) {
            expressions.push(arguments[i]);
        };

        GroupExpression.call(this, expressions);
    };


    AndExpression.prototype = new GroupExpression();
    AndExpression.prototype.constructor = AndExpression;
    AndExpression.prototype.expressionType = ExpressionType.AND;
    AndExpression.prototype.getOperator = function() {
        return Operator.AND;
    }



    /**
     *
     *  OR Expression
     */
    function OrExpression() {
        var expressions = [];
        for (var i = 0; i < arguments.length; i++) {
            expressions.push(arguments[i]);
        };

        GroupExpression.call(this, expressions);
    };


    OrExpression.prototype = new GroupExpression();
    OrExpression.prototype.constructor = OrExpression;
    OrExpression.prototype.expressionType = ExpressionType.OR;
    OrExpression.prototype.getOperator = function() {
        return Operator.OR;
    }


    /**
     *
     * Filter
     */
    function Filter() {
        this.filterExpression = null;

        this.assertWhereClauseIsInitialized = function(operation) {
            if (this.filterExpression == null || this.filterExpression === undefined)
                throw new FilterException("Não é possível aplicar '" + operation + "' operador se o cláusula WHERE não existir.");
        }

    }


    Filter.prototype = new Filter();
    Filter.prototype.constructor = Filter;
    Filter.prototype.FIELD = function(name) {
        return new FieldExpression(name);
    }
    Filter.prototype.EXP = function(field) {
        return new OperationExpression(field);
    }
    Filter.prototype.WHERE = function() {
        if (arguments.length < 1) {
            throw new FilterException("Para criar uma condição WHERE informe ao menos um parâmetro.");
        }
        if (arguments.length === 3) {
            if (arguments[2] !== undefined) {
                this.filterExpression = new OperationExpression(arguments[0], arguments[1], arguments[2]);
            }
        } else {
            this.filterExpression = arguments[0];
            if ((arguments[0].expressionType !== undefined) && (arguments[0].expressionType === ExpressionType.FIELD)) {
                this.filterExpression = new OperationExpression(arguments[0]);
            }
        }
        return this;
    }
    Filter.prototype.EQ = function(value) {
        this.assertWhereClauseIsInitialized("eq");
        this.filterExpression = this.filterExpression.EQ(value);
        return this;

    }
    Filter.prototype.NEQ = function(value) {
        this.assertWhereClauseIsInitialized("neq");
        this.filterExpression = this.filterExpression.NEQ(value);
        return this;

    }
    Filter.prototype.GEQ = function(value) {
        this.assertWhereClauseIsInitialized("geq");
        this.filterExpression = this.filterExpression.GEQ(value);
        return this;
    }
    Filter.prototype.LEQ = function(value) {
        this.assertWhereClauseIsInitialized("leq");
        this.filterExpression = this.filterExpression.LEQ(value);
        return this;
    }
    Filter.prototype.LIKE = function(value) {
        this.assertWhereClauseIsInitialized("like");
        this.filterExpression = this.filterExpression.LIKE(value);
        return this;
    }
    Filter.prototype.IN = function() {
        var values = [];
        for (var i = 0; i < arguments.length; i++) {
            values.push(arguments[i]);
        };
        this.assertWhereClauseIsInitialized("in");
        this.filterExpression = this.filterExpression.IN(values);
        return this;
    }
    Filter.prototype.NOTIN = function() {
        var values = [];
        for (var i = 0; i < arguments.length; i++) {
            values.push(arguments[i]);
        };
        this.assertWhereClauseIsInitialized("not in");
        this.filterExpression = this.filterExpression.NOTIN(values);
        return this;
    }
    Filter.prototype.AND = function(columnOrExpression) {
        this.assertWhereClauseIsInitialized("and");
        this.filterExpression = this.filterExpression.AND(columnOrExpression);
        return this;
    }
    Filter.prototype.OR = function(columnOrExpression) {
        this.assertWhereClauseIsInitialized("or");
        this.filterExpression = this.filterExpression.OR(columnOrExpression);
        return this;
    }
    Filter.prototype.ISNULL = function() {
        this.assertWhereClauseIsInitialized("isNull");
        this.filterExpression = this.filterExpression.ISNULL();
        return this;
    }
    Filter.prototype.ISNOTNULL = function() {
        this.assertWhereClauseIsInitialized("isNotNull");
        this.filterExpression = this.filterExpression.ISNOTNULL();
        return this;
    }
    Filter.prototype.betweenOrOp = function(operator, valueStart, valueEnd) {
        this.assertWhereClauseIsInitialized(operator);
        this.filterExpression = this.filterExpression.betweenOrOp(operator, valueStart, valueEnd);
        return this;
    }
    Filter.prototype.BETWEEN = function(valueStart, valueEnd) {
        this.assertWhereClauseIsInitialized("between");
        this.filterExpression = this.filterExpression.BETWEEN(valueStart, valueEnd);
        return this;
    }
    Filter.prototype.OP = function(operator, value) {
        this.assertWhereClauseIsInitialized(operator);
        this.filterExpression = this.filterExpression.applyOperation(op, value);
        return this;
    }
    Filter.prototype.STARTSWITH = function(value) {
        this.assertWhereClauseIsInitialized("startsWith");
        this.filterExpression = this.filterExpression.STARTSWITH(value);
        return this;
    }
    Filter.prototype.CONTAINS = function(value) {
        this.assertWhereClauseIsInitialized("contains");
        this.filterExpression = this.filterExpression.CONTAINS(value);
        return this;
    }
    Filter.prototype.toJSON = function() {
        if (this.filterExpression !== undefined) {
            var sb = AnterosStringUtils.createStringBuilder();
            sb.appendLine('{');
            sb.appendLine('   "filterExpression" : {');
            this.filterExpression.toJSON(sb);
            sb.appendLine('}');
            sb.appendLine('}');
            return sb.toString();
        }
        return '';
    }


    var result = {
        createFilter: function(){
            return new Filter();
        }
    };

    return result;
}());