exports.up = async function up(sql) {
  await sql`
CREATE TABLE reservations (
 id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
user_id integer,
date int NOT NULL,
time int NOT NULL,
amount varchar(50) NOT NULL,
is_approved boolean
);
`;
};

exports.down = async function down(sql) {
  await sql`DROP TABLE reservations`;
};
