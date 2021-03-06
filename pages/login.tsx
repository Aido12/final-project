import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Errors } from '../util/types';
import { LoginResponse } from './api/login';

const main = css`
  background-image: url('/images/drinks2.jpeg');
`;
const form = css`
  background: linear-gradient(#c4c4c4, grey, #c4c4c4);
  /* display: flex;

  color: black;
  text-align: center;
  justify-content: center; */
  text-shadow: 100px 100px 100px rgba(0, 0, 0, 0.25);
  background-image: linear-gradient(#c4c4c4, grey, #c4c4c4);
  /* width: 50%; */
  margin-right: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  margin-left: 20%;
  margin-right: 20%;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  input {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
  }

  button {
    width: 100%;
    background-image: linear-gradient(to right, grey, #c4c4c4, grey);
    color: black;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 20px;
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  return (
    <div>
      <Header />
      <main css={main}>
        <div css={form}>
          <h1>Login</h1>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const loginResponse = await fetch('/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                }),
              });

              const loginJson = (await loginResponse.json()) as LoginResponse;

              if ('errors' in loginJson) {
                setErrors(loginJson.errors);
                return;
              }
              const destination =
                typeof router.query.returnTo === 'string' &&
                router.query.returnTo
                  ? router.query.returnTo
                  : `/sportadmin`;

              // props.refreshUsername();

              router.push(destination);
            }}
          >
            <label>
              Username
              <input
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </label>
            <button>Login</button>
            <button type="button" onClick={() => router.push('/sportadmin')}>
              Back
            </button>
          </form>
        </div>
        <div>
          {errors.map((error) => (
            <div key={`error-${error.message}`}>{error.message}</div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getValidSessionByToken } = await import('../util/database');

  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/login`,
        permanent: true,
      },
    };
  }

  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);

  console.log(session);

  if (session) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering

    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
