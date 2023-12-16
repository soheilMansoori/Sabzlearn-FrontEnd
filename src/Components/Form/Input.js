import React, { useEffect, useReducer } from 'react'
import './Input.css'
import Validator from '../../Validator/Validator'

const inputReducer = (prevState, action) => {
    switch (action.type) {
        case 'CHANGE': {
            return (
                { ...prevState, value: action.value, isValid: Validator(action.value, action.rules) }
            )
        }

        default: {
            return prevState
        }
    }

}


export default function Input(props) {
    // HOOKS
    const [mainInput, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: false
    })


    useEffect(() => {
       props.onInputHandeler && props.onInputHandeler(props.id, mainInput.value, mainInput.isValid)
    }, [mainInput.value])


    // functions
    const changeHandeler = event => {
        dispatch({
            type: 'CHANGE',
            value: event.target.value,
            rules: props.validations
        })
    }

    // jsx
    const element = props.element === 'input' ? (
        <input
            type={props.type}
            className={`${props.className} ${mainInput.isValid ? 'success' : 'error'}`}
            placeholder={props.placeholder}
            onChange={changeHandeler}
            value={mainInput.value}
        />
    ) : (
        <textarea
            className={props.className}
            placeholder={props.placeholder}
            onChange={changeHandeler}
            value={mainInput.value}
            style = {props.style}
        />
    )

    return element
}
