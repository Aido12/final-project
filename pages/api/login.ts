import crypto from 'node:crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyPassword } from '../../util/auth';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
// import { verifyCsrfToken } from '../../util/csrf';
import {
  createSession,
  deleteExpiredSessions,
  getUserWithPasswordHashByUsername,
  User,
} from '../../util/database';
import { Errors } from '../../util/types';

// export type RegisterRequest = {
//   firstname: string;
//   lastname: string;
//   email: string;
//   username: string;
//   password: string;
// };

export type LoginResponse = { errors: Errors } | { user: User };

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>,
) {
  // 1. check if there is a req.body.username exist and req.body.password exist
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      errors: [{ message: 'Request does not contain username and password' }],
    });
    return;
  }
  try {
    const username = req.body.username;

    const userWithPasswordHash = await getUserWithPasswordHashByUsername(
      username,
    );
    // 2. check if the username exist in your database
    if (!userWithPasswordHash) {
      res.status(401).send({
        errors: [{ message: 'Username or password does not match' }],
      });
      return;
    }
    // 3. check if the pw match trought crypto
    const isPasswordVerified = await verifyPassword(
      req.body.password,
      userWithPasswordHash.passwordHash,
    );

    // Password doesn't match hash in the database
    if (!isPasswordVerified) {
      res.status(401).send({
        errors: [{ message: 'Username or password does not match' }],
      });
      return;
    }

    deleteExpiredSessions();

    // 4. create a session with a token created with random bytes bcrypt

    const token = crypto.randomBytes(64).toString('base64');
    // 5. set a cookie named sessionToken
    const newSession = await createSession(token, userWithPasswordHash.id);
    const cookie = createSerializedRegisterSessionTokenCookie(newSession.token);
    // 6. return te cookie and the user

    const { passwordHash, ...user } = userWithPasswordHash;

    res.status(200).setHeader('Set-Cookie', cookie).send({ user: user });
  } catch (err) {
    res.status(500).send({ errors: [{ message: (err as Error).message }] });
  }
}
