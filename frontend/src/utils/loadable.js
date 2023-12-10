export class Loadable {

    /**
     * The value this class wraps
     */
    _value;

    /**
     * Whether the value this class wraps is currently loading
     */
    isLoading = false;

    /**
     * Whether this Loadable has a value
     */
    hasValue = false;

    /**
     * String error message or null
     */
    error = null

    /**
     * Gets the value this loadable has
     */
    get value() {
        if (this.isLoading) throw new Error('New Loadable value is loading');
        if (this.error !== null) throw new Error(`Value is in error state: ${this.error}`)
        if (!this.hasValue) throw new Error('Loadable does not have a value');
        return this._value;
    }

    /**
     * 
     * @param value the value to assign 
     * @returns a new loadable with the specified value
     */
    withValue(value) {
        const output = new Loadable();
        output.hasValue = true;
        output._value = value;
        return output;
    }

    /**
     * 
     * @param error the error to assign 
     * @returns a new loadable with the specified error
     */
    withError(error) {
        const output = new Loadable();
        output.error = error;
        return output;
    }

    /**
     * 
     * @returns a new loading Loadable
     */
    withLoading() {
        const output = new Loadable();
        output.isLoading = true;
        return output;
    }
}
