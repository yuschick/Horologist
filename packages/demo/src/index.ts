import { Watch } from 'ticktock-js';

const test = new Watch({
    id: 'demo-watch',
    day: { id: 'day-id' },
    month: { id: 'month-id', offsetDate: true, reverse: true },
    foudroyante: { steps: 5, id: 'foudroyante-id', reverse: true },
    year: { id: 'year-id', offsetMonths: true },
});
test.start();
