import {Form,Button,Container,Col,Row, Alert} from 'react-bootstrap';
import '../App.css'
import InputField from './Common/InputField';
import {Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useUserAuth } from './Context/UserAuthContext';
const Signup=()=> {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [error,setError]=useState('');
  const {signUp}=useUserAuth();
  const navigate=useNavigate()
  const handleSubmit =async (e)=>{
    e.preventDefault();
    setError('')
    try{
      await signUp(email,password);
      navigate('/')

    }
    catch(err){
      setError(err.message);
    }
  }

  return (
  <>
  <div style={{paddingTop:'40px'}}>
    <h1 style={{textAlign:'center'}}>Sign Up</h1><br/>
    {error && <Alert variant="danger">{error}</Alert>}
    <Form onSubmit={handleSubmit}>
  <Container style={{display:'flex',justifyContent:'center',lineHeight:'20px'}}> 
            <Col sm={4}>
            {/* <InputField label={'First Name'} type={'text'}/><br/>
            <InputField label={'Last Name'} type={'text'}/><br/> */}
            <InputField label={'Email'} type={'email'} value={email} setValue={setEmail}/><br/>
            <InputField label={'Password'} type={'password'} value={password} setValue={setPassword}/><br/>
            {/* <InputField label={'Confirm Password'} type={'password'}/><br/> */}
            <div style={{paddingTop:'20px'}} >
      <Button type="submit" className='btn btn-primary'>Sign Up</Button>
      </div><br/>
      <div style={{textAlign:'center',fontSize:'18px',fontWeight:'600'}}><hr/>Already Account  <Link to='/' style={{color:'#09b0e3',textDecoration:'none'}}>Login</Link></div>
            </Col><br/>
    </Container>
    </Form>
    </div>
    
    </>
  );
}

export default Signup;