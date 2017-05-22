const test = require('ava');
const sinon = require('sinon');
const rxjs = require('rxjs');
const advanceTo = require('./index.js');

const { TestScheduler } = rxjs;

test('advanceTo', (t) => {
	const scheduler = new TestScheduler(null);
	const next = sinon.spy();
	const error = sinon.spy();
	const complete = sinon.spy();
	const source = scheduler.createHotObservable('--ab|');

	source.subscribe(next, error, complete);

	advanceTo(scheduler, 10);
	t.false(next.called);

	advanceTo(scheduler, 20);
	t.true(next.calledOnce);
	t.is(next.args[0][0], 'a');

	advanceTo(scheduler, 30);
	t.true(next.calledTwice);
	t.is(next.args[1][0], 'b');

	t.false(complete.called);

	advanceTo(scheduler, 40);
	t.true(complete.calledOnce);
});
