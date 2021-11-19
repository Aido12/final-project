import {
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/react';
import Link from 'next/link';

const footer = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 200px;
  border: 1px solid #666;
  left: 0;
  bottom: 0;

  background: #c4c4c4;
  li {
    list-style: none;
  }
  ul {
    margin-left: 100px;
    margin-right: 100px;
  }
  icons {
  }
`;

const icon = css`
  display: flex;
  justify-items: center;
  align-items: center;
  grid-gap: 10px;
`;

export default function Footer() {
  return (
    <div>
      <footer css={footer}>
        <ul>
          <h4>Contact Details </h4>
          <li>Phone: +43 12955382</li>
          <li>Address: Rennweg 95,1030 Wien</li>
        </ul>
        <div css={icon}>
          <Link href="https://www.facebook.com/TheWildGeeseVienna" passHref>
            <FacebookOutlined style={{ fontSize: '32px' }} />
          </Link>
          <Link href="https://www.instagram.com/thewildgeesevienna" passHref>
            <InstagramOutlined style={{ fontSize: '32px' }} />
          </Link>
          <MailOutlined style={{ fontSize: '32px' }} />
        </div>
        <div>
          <ul>
            <h4>Opening Hours</h4>
            <li>MON-FRI......5:00PM-11.00PM</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
