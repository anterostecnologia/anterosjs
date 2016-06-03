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
