import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_name: string;
};
dotenvSafe.config();
const sql = postgres();

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
  id: number;
  date: Date;
  time: string;
  match: string;
};

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
  date: number;
  time: number;
  match: string;
}) {
  const [sport] = await sql<[Sport | undefined]>`
    INSERT INTO sports
      (date, time, match)
    VALUES
      (${date}, ${time}, ${match})
    RETURNING
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
        sports
         `;
  // console.log('proooo', products);
  return sports.map((sport) => {
    return camelcaseKeys(sport);
  });
}

export async function getSportById(id: number) {
  const [sport] = await sql<[Sport]>`
      SELECT
      id,
    date,
    time,
    match
      FROM
     sportsform
      Where
      id =${id}
      `;
  return camelcaseKeys(sport);
}

export async function deleteSportById(id: number) {
  const [sport] = await sql<[Sport | undefined]>`
    DELETE FROM
      sports
    WHERE
      id = ${id}
    RETURNING
    id,
    date,
    time,
    match
  `;
  return sport && camelcaseKeys(sport);
}

export async function updateSportById(
  id: number,
  {
    date,
    time,
    match,
  }: {
    date: number;
    time: number;
    match: string;
  },
) {
  const [sport] = await sql<[Sport | undefined]>`
    UPDATE
      sports
    SET
      date = ${date},
      time = ${time},
      match = ${match}
    WHERE
      id = ${id}
    RETURNING
      id,
     date,
     time,
     match
  `;
  return sport && camelcaseKeys(sport);
}
