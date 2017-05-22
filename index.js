/**
 * Implements advanceTo for RxJS 5 TestScheduler
 */

const KEY = '__advanceTo-8jZ8c78vyU';

function peek(scheduler) {
	const { actions } = scheduler;
	return actions && actions.length > 0 ? actions[0] : null;
}

module.exports = function advanceTo(scheduler, delay) {
	if (!delay) {
		delay = scheduler.maxFrames;
	}

	scheduler.hotObservables.map(o => {
		if (!o[KEY]) {
			o[KEY] = true;
			o.setup();
		}
	});

	let action = null;
	let error;
	const { actions } = scheduler;

	while ((action = peek(scheduler)) && action.delay <= delay) {
		const error = action.execute(action.state, action.delay);
		actions.shift();

		if (error) {
			break;
		}
	}

	if (error) {
		while (action = actions.shift) {
			action.unsubscribe();
		}

		throw error;
	}
}
