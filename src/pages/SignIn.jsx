import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
function SignIn() {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

 
  useEffect(() => {
    axios
      .get('http://localhost:3031/users')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Something went wrong', error);
      });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

  
    const user = userData.find(
      (user) => user.email === mail && user.password === pass
    );


    if (user && user.id === '71ef') {
      Swal.fire('Admin Entered successfully');
      navigate('/dashboard');
    } else if (user && user.isLogged) {
      localStorage.setItem('user', user.id);
      navigate('/');
    } else if (user && !user.isLogged) {
      alert('You are restricted or blocked');
    } else {
      alert('Invalid credentials, try again');
    }
  };

  return (
    <div
      style={{
         
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          width: '300px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            />
          </div>
<p className='text-sm'>Did't have an account ?
  <NavLink className="text-blue-500"to='/SignUp'> Sign up</NavLink>
</p>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginTop:'10px'
            }}
          >
            Submit
          </button>
        
        </form>
      </div>
    </div>
  );
}

export default SignIn;
