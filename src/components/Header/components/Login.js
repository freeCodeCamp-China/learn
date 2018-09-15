/* global HOME_PATH */
import React from 'react';
import { Button } from 'react-bootstrap';

function Login() {
  return (
    <Button
      bsStyle='default'
      className='btn-cta'
      href={'https://www.freecodecamp.one/account-login'}
      target='_blank'
      >
      登录
    </Button>
  );
}

Login.displayName = 'Login';

export default Login;
