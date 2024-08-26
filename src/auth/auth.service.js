import { pool } from "../database.js";

export default class AuthService {
  login = async (username, password) => {
    let sql = `SELECT id , username , firstname , lastname FROM users WHERE username = '${username}' AND password = '${password}' LIMIT 1`;

    const [[user]] = await pool.query(sql);
    console.log(sql);

    return user;
  };

  profile = async (id) => {
    let sql = `SELECT id,username,firstname,lastname FROM users WHERE id = '${id}' LIMIT 1`;

    const [[user]] = await pool.query(sql);

    return user;
  };
}