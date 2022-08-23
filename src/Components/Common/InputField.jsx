import React from 'react'
import {Form} from 'react-bootstrap';
const InputField = ({label,value,setValue,type,placeholder}) => {
    return (
        <Form.Group>
       {label && <Form.Label style={{fontWeight:"600" ,color:"#11283F",fontSize:"16px"}}>{label&&label}</Form.Label>}
        <Form.Control type={type} placeholder={placeholder&&placeholder} required value={value} onChange={(e)=>setValue(e.target.value)}/>
    </Form.Group>
            
        
    )
}

export default InputField
