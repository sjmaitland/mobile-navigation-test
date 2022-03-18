import React, { useState, useRef, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

function App() {
  const [openDrawer, toggleDrawer] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    /* Closes the drawer when the user clicks outside of it */
    const closeDrawer = (event) => {
      if (drawerRef.current && drawerRef.current.contains(event.target)) {
        return;
      }
      toggleDrawer(false);
    };

    document.addEventListener("mousedown", closeDrawer);
    return () => document.removeEventListener("mousedown", closeDrawer);
  }, []);

  return (
    <Styles.Wrapper>
      <CSSReset />

      <Navbar.Wrapper>
        <Navbar.Logo>Logo</Navbar.Logo>

        <HamburgerButton.Wrapper onClick = { toggleDrawer }>
          <HamburgerButton.Lines />
        </HamburgerButton.Wrapper>

        <Navbar.Items ref = { drawerRef } openDrawer = { openDrawer }>
          <Navbar.Item>Home</Navbar.Item>
          <Navbar.Item>Blog</Navbar.Item>
          <Navbar.Item>About</Navbar.Item>
        </Navbar.Items>
      </Navbar.Wrapper>
    </Styles.Wrapper>
  );
}

const Styles = {
  Wrapper: styled.main`
    background-color: #eeeeee;
    display: flex;
    height: 100vh;
  `,
};

const CSSReset = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%; 
  }

  body {
    font-size: 1.4rem;
    font-family: sans-serif;
  }
`;

const Navbar = {
  Wrapper: styled.nav`
    align-items: center;
    align-self: flex-start;
    background-color: #f9f9f9;
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 1rem 3rem;

    @media only screen and (max-width: 40em) {
      bottom: 0;
      position: fixed;
      width: 100vw;
    }
  `,
  Logo: styled.h1`
    border: 1px solid gray;
    padding: 0.5rem 1rem;
  `,
  Items: styled.ul`
    display: flex;
    list-style: none;

    @media only screen and (max-width: 40rem) {
      background-color: white;
      flex-direction: column;
      height: 100%;
      padding: 1rem 2rem;
      position: fixed;
      right: 0;
      top: 0;
      transform: ${({ openDrawer }) => openDrawer ? `translateX(0)` : `translateX(100%)` };
      transition: 0.2s ease-out;
    }
  `,
  Item: styled.li`
    cursor: pointer;
    padding: 0 1rem;

    @media only screen and (max-width: 40em) {
      padding: 1rem 0;
    } 
  `,
}

const HamburgerButton = {
  Wrapper: styled.button `
    background: transparent;
    border: none;
    cursor: pointer;
    display: none;
    font-size: 12px;
    height: 3rem;
    outline: none;
    position: relative;
    width: 3rem;

    @media only screen and (max-width: 40em) {
      display: block;
    }

    &:after {
      content: "";
      display: block;
      height: 150%;
      left: -25%;
      position: absolute;
      top: -25%;
      width: 150%;
    }
  `,
  Lines: styled.div `
    margin-top: -0.125em;
    top: 50%;

    &,
    &:after,
    &:before {
      background-color: black;
      content: "";
      display: block;
      height: 2px;
      pointer-events: none;
      position: absolute;
      width: 100%;
    }

    &:after {
      top: -0.8rem;
    }

    &:before {
      top: 0.8rem;
    }
  `,
  Button: styled.div ``,
}

export default App;
