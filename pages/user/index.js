import { css } from '@emotion/react';
import Link from 'next/link';
import Header from '../../components/Header';

export default function Users(props) {
  return (
    <div>
      <Header />
    </div>
  );
}

export async function getServerSideProps() {
  const { users } = await import('../../util/database');

  console.log(users);
  return {
    props: {
      users,
    },
  };
}
