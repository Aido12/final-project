exports.up = async function up(sql) {
  await sql`
CREATE TABLE sport_events (
  date int NOT NULL,
time int NOT NULL,
match varchar(50) NOT NULL
);
`;
};

exports.down = async function down(sql) {
  await sql`DROP TABLE sport_events`;
};
