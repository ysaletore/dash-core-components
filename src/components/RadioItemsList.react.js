import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {keys, contains} from 'ramda';
import update from 'immutability-helper';


/**
 * RadioItemsList is a component that encapsulates several radio item inputs.
 * The values and labels of the RadioItemsList is specified in the `options`
 * property and the seleced item is specified with the `value` property.
 * Each radio item is rendered as an input with a surrounding label.
 */

export default class RadioItemsList extends Component {
    constructor(props) {
        super(props);
        this.state = {values: props.values};
    }

    componentWillReceiveProps(newProps) {
        this.setState({values: newProps.values});
    }

    render() {
        const {
            fireEvent,
            id,
            className,
            style,
            inputClassName,
            inputStyle,
            labelClassName,
            labelStyle,
            options,
            setProps
        } = this.props;
        const {values} = this.state;

        let ids = {};
        if (id) {
            ids = {id, key: id};
        }
        return Object.entries(options).map( ([key, option]) =>
			(
                <div {...ids} className={className} style={style}>
                    {option.options.map(sub_option => (
                        <label style={labelStyle} className={labelClassName} key={key + '_' + sub_option.value}>
                            <input
                                checked={contains(key, keys(values)) && values[key] === sub_option.value}
                                className={inputClassName}
                                disabled={Boolean(sub_option.disabled)}
                                style={inputStyle}
                                type="radio"
                                onChange={() => {
									let newValues = update(values, {[key]: {$set: sub_option.value}})
                                    this.setState({values: newValues});
                                    if (setProps) setProps({value: newValues});
                                    if (fireEvent) fireEvent({event: 'change'});
                                }}
                            />
                            {sub_option.label}
                        </label>
                    ))}
                </div>
            )
        );
    }
}

RadioItemsList.propTypes = {
    id: PropTypes.string,

    /**
     * An array of options
     */
    options: PropTypes.any,

    /**
     * The currently selected value
     */
    values: PropTypes.any,

    /**
     * The style of the container (div)
     */
    style: PropTypes.object,

    /**
     * The class of the container (div)
     */
    className: PropTypes.string,

    /**
     * The style of the <input> radio element
     */
    inputStyle: PropTypes.object,

    /**
     * The class of the <input> radio element
     */
    inputClassName: PropTypes.string,

    /**
     * The style of the <label> that wraps the radio input
     *  and the option's label
     */
    labelStyle: PropTypes.object,

    /**
     * The class of the <label> that wraps the radio input
     *  and the option's label
     */
    labelClassName: PropTypes.string,

    /**
     * Dash-assigned callback that gets fired when the radio item gets selected.
     */
    fireEvent: PropTypes.func,

    /**
     * Dash-assigned callback that gets fired when the value changes.
     */
    setProps: PropTypes.func,

    dashEvents: PropTypes.oneOf(['change'])
};

RadioItemsList.defaultProps = {
    inputStyle: {},
    inputClassName: '',
    labelStyle: {},
    labelClassName: '',
    options: {}
};
