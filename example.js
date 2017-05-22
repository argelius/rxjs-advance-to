const rxjs = require('rxjs');
const advanceTo = require('./index.js');

const { TestScheduler } = rxjs;

const scheduler = new TestScheduler(null);
const source = scheduler.createHotObservable('-a-b-|');

source.subscribe(
	x => console.log(x),
	err => console.error('error', err),
	complete => console.log('complete')
);

for (let delay = 10; delay <= 50; delay += 10) {
	console.log(`advanceTo ${delay}`);
	advanceTo(scheduler, delay);
}
