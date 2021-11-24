import { css } from '@emotion/react';
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
          <h1> Drinks</h1>
          <h3>Beer</h3>
          <ul>
            <li>Stiegl Golbräu.....€3.20...€4.10</li>
            <li>Schladerminger Märzen .....€3.20...€4.10</li>
            <li>Gösser Märzen .....€3.20...€4.10</li>
          </ul>
          <h3>Cider</h3>
          <ul>
            <li>Magners.....€3.20...€4.10</li>
            <li>Mount Kiwi .....€3.20...€4.10</li>
            <li>Strongbow .....€3.20...€4.10</li>
          </ul>
          <h3>Wein</h3>
          <ul>
            <li>Grüner Veltliner..0.125l..€3.9</li>
            <li>Blaufrankish..0.125l..€3.9</li>
          </ul>
          <h3>Whiskey</h3>
          <ul>
            <li>Jameson.....€5.00</li>
            <li>Jameson 12 yr.....€6.00</li>
            <li>Wild Geese.....€6.00</li>
            <li>Tullamore Dew.....€5.00</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
