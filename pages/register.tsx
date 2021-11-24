import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { Errors } from '../util/types';
import { RegisterResponse } from './api/register';

// import Header from '../components/Header';

const formStyles = css`
  label {
    display: block;
  }
`;
const errorsStyles = css`
  color: red;
`;
export default function RegisterPage(props: Props) {
  const router = useRouter();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  return (
    <div>
      <main>
        <div>
          <h1>Register</h1>
          <form
            css={formStyles}
            onSubmit={async (event) => {
              event.preventDefault();
              const registerResponse = await fetch('/api/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  firstname: firstname,
                  lastname: lastname,
                  email: email,
                  username: username,
                  password: password,
                }),
              });

              const registerJson =
                (await registerResponse.json()) as RegisterResponse;

              if ('errors' in registerJson) {
                setErrors(registerJson.errors);
                return;
              }

              const destination =
                typeof router.query.returnTo === 'string' &&
                router.query.returnTo
                  ? router.query.returnTo
                  : `/reservations/${registerJson.user.id}`;

              // props.refreshUsername();
              router.push(destination);
            }}
          >
            <label>
              First Name
              <input
                value={firstname}
                onChange={(event) => setFirstname(event.currentTarget.value)}
              />
            </label>
            <label>
              Last Name
              <input
                value={lastname}
                onChange={(event) => setLastname(event.currentTarget.value)}
              />
            </label>
            <label>
              Email
              <input
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </label>
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
            <button onClick={() => {}}>Register</button>
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
