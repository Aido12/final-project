import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { Errors } from '../util/types';
import { LoginResponse } from './api/login';

// import Header from '../components/Header';

const formStyles = css`
  label {
    display: block;
  }
`;
const errorsStyles = css`
  color: red;
`;
// type props = {
//   refreshUsername: () => void;
//   username?: string;
// };
export default function LoginPage(props: { refreshUsername: () => void }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  return (
    <div>
      <main>
        <div>
          <h1>Login</h1>
          <form
            css={formStyles}
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
                  : `/sportsdiary`;

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
            <button type="button" onClick={() => router.push('/')}>
              Back
            </button>
          </form>
        </div>
        <div css={errorsStyles}>
          {errors.map((error) => (
            <div key={`error-${error.message}`}>{error.message}</div>
          ))}
        </div>
      </main>
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
        destination: '/sportsdiary',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
