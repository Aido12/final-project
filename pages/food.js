import { css } from '@emotion/react';
import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';

const background = css`
  background-image: url('/images/drinks2.jpeg');
`;
const bev = css`
  background: linear-gradient(#c4c4c4, grey, #c4c4c4);
  display: flex;
  color: black;
  text-align: center;
  justify-content: center;
  margin-left: 20%;
  margin-right: 20%;
  border-radius: 20px;
  padding: 2px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 600;
  text-shadow: 100px 100px 100px rgba(0, 0, 0, 0.25);
  background-image: linear-gradient(grey, #c4c4c4);

  li {
    list-style: none;
  }
  ul {
    margin-left: 100px;
    margin-right: 100px;
  }
`;

export default function drinks() {
  return (
    <div css={background}>
      <Header />
      <main css={bev}>
        <div>
          <h1> Food</h1>
          <ul>
            <li>Fish Basket........€11.90</li>
            <li>Beef Burger........€13.90</li>
            <li>Popcorn Chicken........€11.90</li>
            <li>Club Sandwich........€11.90</li>
            <li>Hot Chicken Wings........9.90</li>
          </ul>
          <p> All come served with Fries</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
