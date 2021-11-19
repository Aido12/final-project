import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  position: relative;
  width: 100%;
  height: 150px;
  left: 0px;
  top: 0px;
  border: 1px solid #666;
  background: #c4c4c4;
  z-index: 1;

  header {
    position: relative;
    text-align: center;
    font-family: 'Lobster' cursive;
    font-style: italic;
    font-weight: 400px;
    font-size: 48px;
    line-height: 70px;
    padding: 50px, 50px;
    color: #000000;
    /* border: 1px solid #000000; */
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  nav {
    display: flex;
    text-align: center;
    justify-content: center;
    margin-top: 50px;
    padding: 50px, 50px;
    border-radius: 50px;
    gap: 100px;
  }
  a:hover {
    transform: scale(1.3);
  }
`;

export default function Header() {
  return (
    <div css={navStyles}>
      <header>The Wild Geese</header>
      <nav>
        <Link href="/">
          <a>Home </a>
        </Link>
        <Link href="/aboutus">
          <a>About</a>
        </Link>
        <Link href="/gallery">
          <a> Gallery </a>
        </Link>
        <Link href="/sportsdiary">
          <a>Sports</a>
        </Link>
        <Link href="/reservations">
          <a> Reservations</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/register">
          <a> Register</a>
        </Link>
        <Link href="/logout">
          <a> Logout</a>
        </Link>
      </nav>
    </div>
  );
}
