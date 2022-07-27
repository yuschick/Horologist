import { Watch } from 'ticktock-js';

const test = new Watch({
    dials: [
        {
            hands: {
                hours: {
                    id: 'hour-hand',
                },
                minutes: {
                    id: 'minute-hand',
                },
            },
        },
    ],
    date: {
        split: {
            ones: 'date-ones-disc',
            tenths: 'date-tenth-disc',
        },
    },
    day: {
        id: 'day-hand',
    },
    month: {
        id: 'month-hand',
    },
    leapYear: {
        id: 'year-disc',
    },
    moonphase: {
        id: 'moonphase-disc',
    },
    dayNight: {
        id: 'day-night-indicator-disc',
    },
    chronograph: {
        dialDurations: {
            hours: 30,
        },
        flyback: true,
        pushers: {
            mono: 'chrono-primary',
            dual: 'chrono-secondary',
        },
        hands: {
            seconds: 'chrono-second-hand',
            minutes: 'chrono-minute-hand',
            hours: 'chrono-hours-hand',
        },
    },
    reserve: {
        id: 'power-reserve-disc',
        range: {
            full: 34,
            empty: -50,
        },
    },
});

test.start();
