import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

function ControlMenu(props) {
    const { className, value, options, onOptionChanged } = props;
    return (
        <div className={className}>
            <select value={value} onChange={onOptionChanged}>
                {options.map((option) =>
                    <MenuItem
                        key={option.value}
                        value={option.value}
                        text={option.text}
                        disabled={option.disabled} />
                )}
            </select>
        </div>
    );
}

ControlMenu.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
    })).isRequired,
    onOptionChanged: PropTypes.func.isRequired,
};

ControlMenu.defaultProps = {
    className: "",
};

function MenuItem(props) {
    const { text, value, disabled } = props;
    return (
        <option value={value} disabled={disabled}>{text}</option>
    );
}

MenuItem.propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

MenuItem.defaultProps = {
    disabled: false,
};

export default ControlMenu;
