const Watch = require('./../index');

(function() {
    let settings = {};
    let demo = null;

    /*
     * Dual Time Demo
     */
    settings = {
        dials: [{
            name: 'primary',
            hands: {
                hour: 'dial-primary-hour-hand',
                minute: 'dial-primary-minute-hand',
                second: 'dial-primary-second-hand',
            },
        }, {
            name: 'secondary',
            hands: {
                hour: 'dial-secondary-hour-hand',
                minute: 'dial-secondary-minute-hand',
                second: 'dial-secondary-second-hand',
            },
            sweep: true,
            timezone: 'America/New_York'
        }]
    };

    demo = new Watch(settings);

    /*
     * Minute Repeater Demo
     */
    settings = {
        dials: [{
            name: 'primary',
            hands: {
                hour: 'repeater-hour-hand',
                minute: 'repeater-minute-hand',
                second: 'repeater-second-hand',
            },
            sweep: true
        }],
        repeater: {
            id: 'repeater-btn',
            chimes: {
                hour: './dist/sounds/chime-01.mp4',
                minute: './dist/sounds/chime-02.mp4'
            }
        }
    };

    demo = new Watch(settings);

    // settings = {
    //     dials: [{
    //         hands: {
    //             hour: 'retrograde-sec-hour-hand',
    //             minute: 'retrograde-sec-minute-hand',
    //         },
    //         retrograde: {
    //             second: {
    //                 id: 'retrograde-second-hand-one',
    //                 max: 180,
    //                 duration: 10
    //             }
    //         },
    //         sweep: true
    //     }, ]
    // };
    // demo = new Watch(settings);

    // settings = {
    //     dials: [{
    //         name: 'primary',
    //         hands: {
    //             hour: 'split-hour-hand',
    //             minute: 'split-minute-hand',
    //             second: 'running-second-hand',
    //         },
    //         sweep: true
    //     }, ],
    //     chronograph: {
    //         buttons: {
    //             start: 'split-start-stop-btn',
    //             reset: 'split-reset-btn'
    //         },
    //         hands: {
    //             second: 'split-chrono-second-hand',
    //             step: 'split-stop-second-hand',
    //             minute: 'split-chrono-minute-hand',
    //         },
    //         rattrapante: true
    //     },
    // };
    // demo = new Watch(settings);

    // settings = {
    //     dials: [{
    //         name: 'primary',
    //         hands: {
    //             hour: 'chrono-hour-hand',
    //             minute: 'chrono-primary-minute-hand',
    //             second: 'second-hand',
    //         },
    //         sweep: true,
    //     }, ],
    //     chronograph: {
    //         buttons: {
    //             start: 'start-pause-btn',
    //             reset: 'reset-btn',
    //         },
    //         hands: {
    //             tenth: 'chrono-tenth-second-hand',
    //             second: 'chrono-second-hand',
    //             minute: 'chrono-minute-hand',
    //             hour: 'chrono-hour-sub-hand',
    //         }
    //     },
    // };
    // demo = new Watch(settings);

    // settings = {
    //     dials: [{
    //         hands: {
    //             hour: 'perpetual-hour-hand',
    //             minute: 'perpetual-minute-hand',
    //             second: 'perpetual-second-hand',
    //         },
    //     }],
    //     day: {
    //         id: 'day-indicator-disc',
    //     },
    //     date: {
    //         id: 'date-disc',
    //     },
    //     month: {
    //         id: 'month-disc',
    //     },
    //     year: {
    //         id: 'year-hand',
    //     },
    // };
    // demo = new Watch(settings);

    // settings = {
    //     dials: [{
    //         hands: {
    //             hour: 'moonphase-hour-hand',
    //             minute: 'moonphase-minute-hand',
    //             second: 'moonphase-second-hand',
    //         },
    //     }],
    //     moonphase: {
    //         id: 'moonphase-dial',
    //         invert: true
    //     },
    // };
    // demo = new Watch(settings);

    // settings = {
    //     dials: [{
    //         hands: {
    //             hour: 'date-hour-hand',
    //             minute: 'date-minute-hand',
    //             second: 'date-second-hand',
    //         },
    //     }],
    //     month: {
    //         id: 'date-arrow',
    //         retrograde: {
    //             max: 205
    //         }
    //     },
    // };
    // demo = new Watch(settings);
})();