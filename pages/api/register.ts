import crypto from 'node:crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../util/auth';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
// import { verifyCsrfToken } from '../../util/csrf';
import {
  createSession,
  deleteExpiredSessions,
  getUserWithPasswordHashByUsername,
  insertUser,
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

export type RegisterResponse = { errors: Errors } | { user: User };

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>,
) {
  console.log('req.body', req.body);
  // Some magic to convert password to pasword_hash
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      errors: [{ message: 'Request does not contain username and password' }],
    });
    return;
  }
  try {
    const username = req.body.username;

    const existingUser = await getUserWithPasswordHashByUsername(username);

    if (existingUser) {
      res.status(400).send({
        errors: [{ message: 'Username already exists' }],
      });
      return;
    }
    const passwordHash = await hashPassword(req.body.password);
    const user = await insertUser({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email,
      user_name: req.body.username,
      password_hash: passwordHash,
    });

    //   // clean old sessions
    deleteExpiredSessions();

    if (!user) {
      res.status(500).send({ errors: [{ message: 'User not create' }] });
      return;
    }

    //   // // Create the record in the sessions table with a new token

    //   // // 1. create the token
    const token = crypto.randomBytes(64).toString('base64');

    //   // // 2. do a DB query to add the session record
    const newSession = await createSession(token, user.id);

    //   // // set the response to create the cookie in the browser

    const cookie = createSerializedRegisterSessionTokenCookie(newSession.token);
    res.status(200).setHeader('set-Cookie', cookie).send({ user: user });
  } catch (err) {
    res.status(500).send({ errors: [{ message: (err as Error).message }] });
  }
}
