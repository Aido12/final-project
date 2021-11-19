import { css } from '@emotion/react';
import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';

const main = css`
  background: #c4c4c4;

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    height: 90%;
    border-radius: 15px;
  }
`;
export default function Home() {
  return (
    <div>
      <Header />
      <main css={main}>
        <div>
          <img
            src="/images/geesebar1.jpeg"
            alt="bar"
            width="75%"
            height="500px"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
