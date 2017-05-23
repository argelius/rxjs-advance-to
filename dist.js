'use strict';

/**
 * Implements advanceTo for RxJS 5 TestScheduler
 */

var KEY = '__advanceTo-8jZ8c78vyU';

function peek(scheduler) {
	var actions = scheduler.actions;

	return actions && actions.length > 0 ? actions[0] : null;
}

module.exports = function advanceTo(scheduler, delay) {
	if (!delay) {
		delay = scheduler.maxFrames;
	}

	scheduler.hotObservables.map(function (o) {
		if (!o[KEY]) {
			o[KEY] = true;
			o.setup();
		}
	});

	var action = null;
	var error = void 0;
	var actions = scheduler.actions;


	while ((action = peek(scheduler)) && action.delay <= delay) {
		var _error = action.execute(action.state, action.delay);
		actions.shift();

		if (_error) {
			break;
		}
	}

	if (error) {
		while (action = actions.shift) {
			action.unsubscribe();
		}

		throw error;
	}
};
