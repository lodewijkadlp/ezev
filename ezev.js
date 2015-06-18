/*
	ezev ([ezef] or [ee-zee-ee-vee]) provides a simple custom events mechanism
	simply use:
		after('eventname', function(args...){});
	or
		trigger('eventname', args...);

	optionally 
		after('eventname', 'responsename', function(){})
	and after('eventname', 'responsename', false) to disable the specific response

	protip: the responsenames also help with debugging
*/


var evs = {};

exports.trigger = function got(eventname){
	console.log('ezev', arguments)

	if(document.readyState == "loading"){
		var a = arguments;
		window.addEventListener("DOMContentLoaded", function(){
			got.apply(this, a)});
		return;
	}

	var e = evs[eventname];
	var outerarguments = arguments;

	_.each(_.values(e), function(cbs){
		if(typeof(cbs) == 'function'){
			cbs.apply(this, [].splice.call(outerarguments, 1));
		}
	});
};

exports.set = function(eventname, responsename, callback){
	if(typeof(responsename) == 'function'){
		callback = responsename;
		responsename = Math.ceil(Math.random()*1e12); //12 should be high enough
	}

	evs[eventname] = evs[eventname] || {isEvent:true};

	evs[eventname][responsename] = callback;
};