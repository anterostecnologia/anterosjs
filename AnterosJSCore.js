
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
var AnterosSandbox = function(){
	var argumentsArray = Array.prototype.slice.call(arguments);
	var callback = argumentsArray.pop();
	var orderedModules = argumentsArray.pop();

	if(this instanceof AnterosSandbox){
		new AnterosSandbox(orderedModules, callback);
	}

	var modules = [];
	for(index in orderedModules){
		modules.push(AnterosSandbox.modules[orderedModules[index]]);
	}

	callback.apply(undefined, modules);

}
