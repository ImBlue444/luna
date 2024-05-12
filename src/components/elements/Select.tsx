import React from 'react';

type Props = {
    title: string,
    options: string[]
}

const Select = (props: Props) => {
    return (
        <label className="form-control w-full max-w-xs">
            <span className="label-text">{props.title}</span>
            <select required className="select select-bordered">
                <option disabled selected>Seleziona</option>
                {props.options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </label>
    )
}

export default Select;
