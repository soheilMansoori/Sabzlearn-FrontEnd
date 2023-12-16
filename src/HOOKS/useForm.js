import React, { useCallback, useReducer } from 'react'

const formReducer = (prevState, action) => {
    // console.log(prevState, action)
    // console.log(action)
    switch (action.type) {
        case "INPUT_CHANGE": {
            let isFormValid = true
            for (const inputID in prevState.inputs) {
                if (inputID === action.inputID) {
                    isFormValid = isFormValid && action.isValid
                } else {
                    isFormValid = isFormValid && prevState.inputs[inputID].isValid
                }
            }

            return {
                inputs: {
                    ...prevState.inputs,
                    [action.inputID]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isFormValid: isFormValid
            }
        }
        default: {
            return prevState
        }
    }
}

export default function useForm(AllInputs, FormValid) {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: AllInputs,
        isFormValid: FormValid,
    })
    // console.log('AllInputs 1 => ', AllInputs);
    // console.log('FormValid 2 => ', FormValid);
    // console.log('formState 1,2=> ', formState);

    const onInputHandeler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            inputID: id,
            value,
            isValid,
        })
    }, [])
    return [formState, onInputHandeler]
}
