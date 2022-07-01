import React from 'react';

import './Form.css';

const Form = ( props ) => {
    let inputElement = null;
    const inputClasses = ['Input', 'InputElement'];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid');
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
         case ( 'file' ):
            inputElement = <div><button className='Button upload' style={{ position: 'relative' }}><input
                id='fileUpload'
                className='displayNone'
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} style={{ position: 'absolute', right: 0, left: 0, bottom: 0, top: 0 }}/>Upload Picture</button>
                <span style={{  position: 'absolute' }}>{props.value.split("\\")[props.value.split("\\").length - 1]}</span>
                </div>;
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className="Input">
            {inputElement}
        </div>
    );

};

export default Form;