exports.up = async function up(sql) {
  await sql`
	CREATE TABLE users (
 id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name varchar(50) NOT NULL,
last_name varchar(50) NOT NULL,
email varchar(50) NOT NULL,
user_name varchar(50) UNIQUE NOT NULL,
password_hash varchar(60) NOT NULL
);
`;
};

exports.down = async function down(sql) {
  await sql`DROP TABLE users`;
};
