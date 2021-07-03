import React from 'react';
import Link from 'gatsby-link';
// import FCCSearch from 'react-freecodecamp-search';

import NavLogo from './components/NavLogo';
import UserState from './components/UserState';

import './header.css';

function Header() {
  return (
    <header>
      <nav id='top-nav'>
        <a className='home-link' href='https://www.freecodecamp.one'>
          <NavLogo />
        </a>
        <ul id='top-right-nav'>
          <li>
            <Link to='/'>课程</Link>
          </li>
          <li>
            <a href='https://chinese.freecodecamp.org/forum/' target='_blank'>论坛</a>
          </li>
          <li>
            <UserState />
          </li>
        </ul>
      </nav>
      <a class="banner" id="banner" rel="noopener noreferrer" target="_blank" href="https://chinese.freecodecamp.org/">
        <p>
          <span>freeCodeCamp.org 官方中文站</span>已于 2021 年春节正式上线，点击<span>此处</span>前往学习，Happy coding!
        </p>
      </a>
    </header>
  );
}

export default Header;
