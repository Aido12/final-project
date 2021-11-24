import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import Link from 'next/link';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Link href="/drinks">
        <a>1st menu item</a>
      </Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link target="_blank" rel="noopener noreferrer" href="/food" passHref>
        2nd menu item
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" disabled>
      3rd menu item（disabled）
    </Menu.Item>
  </Menu>
);

export default function drinks() {
  return (
    <Dropdown overlay={menu}>
      <button className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Hover me <DownOutlined />
      </button>
    </Dropdown>
  );
}
