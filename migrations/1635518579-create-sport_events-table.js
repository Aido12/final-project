exports.up = async function up(sql) {
  await sql`
CREATE TABLE sport_events (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
date varchar(50) NOT NULL,
time varchar(50) NOT NULL,
match varchar(50) NOT NULL
);
`;
};

exports.down = async function down(sql) {
  await sql`DROP TABLE sport_events`;
};
