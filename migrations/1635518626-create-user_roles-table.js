exports.up = async function up(sql) {
  await sql`
CREATE TABLE user_roles (
 id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 admin varchar(50) NOT NULL
)
	`;
};

exports.down = async function down(sql) {
  await sql`DROP TABLE user_roles`;
};
