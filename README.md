# rxjs-advance-to

Implements `advanceTo` function for RxJS 5 `TestScheduler`.

The test scheduler in RxJS 5 doesn't currently provide a function that allows you to step in time so this can be used to migrate tests from RxJS 4.

## Usage

```es6
import { TestScheduler } from 'rxjs';
import advanceTo from 'rxjs-advance-to';

const scheduler = new TestScheduler(null);

const source = scheduler.createHotObservable('-ab|');

source.subscribe(
  x => console.log(x),
  err => console.log(err),
  complete => console.log('done!'),
);

advanceTo(scheduler, 10); // a
advanceTo(scheduler, 20); // b
advanceTo(scheduler, 30); // c
```
