import content from '../../content';
import { rotate } from '../../utils';
import { WatchClass, WatchSettings } from '../Watch';
import {
    PowerReserveClass,
    PowerReserveOptions,
    PowerReserveRange,
    ParentWatch,
} from './PowerReserve.types';

/*
 * The Power Reserve class indicates the current power level of the watch.
 * Similarly to a battery, the watch runs as long as there is power.
 * If the power reserve empties, the interval of the parent watch is cleared
 * effectively stopping the entire watch until it is 'wound' with ArrowUp.
 */
export class PowerReserve implements PowerReserveClass {
    currentRotation: number;
    element: HTMLElement | null;
    hasError: boolean;
    invert: boolean;
    onEmpty?: () => void;
    range: PowerReserveRange;
    rate: number;
    watch: WatchClass;
    watchSettings: WatchSettings;
    windingKey: string;

    constructor(options: PowerReserveOptions, watch: ParentWatch) {
        this.currentRotation = options.range.full;
        this.element = document.getElementById(options.id);
        this.onEmpty = options.onEmpty;
        this.range = options.range;
        this.rate = options.rate || 0.5;
        this.windingKey = options.windingKey || 'ArrowUp';

        this.invert = this.range.empty > this.range.full;

        this.watch = watch.parent;
        this.watchSettings = watch.settings;

        this.hasError = false;
        this.errorChecking();
    }

    /*
     * Apply an event listener to the window to allow
     * manual 'winding' of the power reserve
     */
    addKeyBindings() {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const key = e.key;
            if (key === this.windingKey) {
                this.rotate('increment');
            }
        });
    }

    /*
     * @return boolean
     * Check for any critical errors within the setup of the complication
     * and set this.hasError accordingly
     */
    errorChecking() {
        this.hasError = false;
        if (!this.element) {
            this.hasError = true;
            throw new Error(content.power_reserve.errors.element_not_found);
        }
        return this.hasError;
    }

    /*
     * @param direction: 'decrement' | 'increment'
     * @param rotation: number Used for testing purposes only
     * @return number
     * Calculate the next rotation value relative to this.rate
     * this.range and this.invert
     */
    getRotationValue(direction = 'decrement') {
        const value = this.currentRotation;
        if (direction === 'increment') {
            return this.invert ? value - this.rate : value + this.rate;
        } else {
            return this.invert ? value + this.rate : value - this.rate;
        }
    }

    /*
     * If no errors are thrown, start the complication
     */
    init() {
        if (this.hasError) return;

        this.addKeyBindings();
        rotate({ element: this.element as HTMLElement, value: this.currentRotation });
    }

    /*
     * @param direction: 'decrement' | 'increment'
     * Rotate the power reserve element by this.rate to either
     * increment or decrement its current rotation value.
     * Normally, the range.full value is greater than the empty. However, a power
     * reserve may rotate the opposite way, and the range.full value is less than
     * the range.empty value. In this case, the power reserve is 'inverted'.
     * This means that incrementing _technically_ decreases the angle toward range.full
     * while decrementing _technically_ increases the angle toward range.empty.
     */
    rotate(direction = 'decrement') {
        const currentValue = this.currentRotation;
        let value = this.getRotationValue(direction);

        if (direction === 'increment') {
            // Restart the watch if the reserve has emptied
            if (
                (!this.invert && this.currentRotation <= this.range.empty) ||
                (this.invert && this.currentRotation >= this.range.empty)
            ) {
                this.watch.startInterval();
            }

            // Only increment if the power reserve is not 'full'
            if (
                (!this.invert && currentValue + this.rate <= this.range.full) ||
                (this.invert && currentValue - this.rate >= this.range.full)
            ) {
                this.currentRotation = value;
                rotate({ element: this.element as HTMLElement, value });
            }
        } else {
            if (
                (!this.invert && currentValue - this.rate >= this.range.empty) ||
                (this.invert && currentValue + this.rate <= this.range.empty)
            ) {
                this.currentRotation = value;
                rotate({ element: this.element as HTMLElement, value });
            } else {
                // The power reserve is empty, clear the parent
                // watch interval to stop functionality
                this.onEmpty?.();
                this.watch.clearInterval();
                this.watchSettings.interval = undefined;
            }
        }
    }
}
