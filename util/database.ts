import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
};

export type Session = {
  id: number;
  token: string;
  userId: number;
  expiryTimestamp: Date;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type Sport = {
  date: string;
  time: string;
  match: string;
};
dotenvSafe.config();

declare module globalThis {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}
// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;
  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an “unauthorized” certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    // When we’re in development, make sure that we connect only
    // once to the database
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }
  return sql;
}
const sql = connectOneTimeToDatabase();

export async function insertUser({
  first_name,
  last_name,
  email,
  user_name,
  password_hash,
}: {
  first_name: string;
  last_name: string;
  email: string;
  user_name: string;
  password_hash: string;
}) {
  const [user] = await sql<[User | undefined]>`
    INSERT INTO users
      (first_name, last_name, email, user_name, password_hash)
    VALUES
      (${first_name}, ${last_name}, ${email}, ${user_name}, ${password_hash})
    RETURNING
      id,
      user_name,
      first_name,
      last_name,
      email
      ;
  `;
  return user && camelcaseKeys(user);
}

export async function getUserWithPasswordHashByUsername(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
    SELECT
      id,
      user_name ,
      password_hash
    FROM
      users
    WHERE
      user_name  = ${username};
  `;
  return user && camelcaseKeys(user);
}

export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING
      *
  `;

  return camelcaseKeys(session);
}

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < NOW()
    RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session));
}

export async function getValidSessionByToken(token: string) {
  if (!token) return undefined;

  const [session] = await sql<[Session | undefined]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token} AND
      expiry_timestamp > NOW()
  `;

  return session && camelcaseKeys(session);
}

export async function deleteSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session))[0];
}

export async function insertSport({
  date,
  time,
  match,
}: {
  date: string;
  time: string;
  match: string;
}) {
  const [sport] = await sql<[Sport | undefined]>`
    INSERT INTO sport_events
      (date, time, match)
    VALUES
      (${date}, ${time}, ${match})
    RETURNING
    id,
 date,
 time,
 match
  `;
  return sport && camelcaseKeys(sport);
}

export async function getSports() {
  const sports = await sql<Sport[]>`
      SELECT
        id,
       date,
       time,
       match
      FROM
        sport_events
        ORDER BY date ASC;
         `;

  return sports.map((sport) => {
    return camelcaseKeys(sport);
  });
}

export async function deleteSport(id: number) {
  const [sport] = await sql<[Sport | undefined]>`
    DELETE FROM
      sport_events
    WHERE
   id=${id}
       RETURNING
       id,
     date,
     time,
     match


  `;
  return sport && camelcaseKeys(sport);
}
