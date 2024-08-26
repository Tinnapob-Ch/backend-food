import { pool } from "../database.js";

export default class UserService {
  async getUser() {
    let sql = `SELECT * FROM users`;

    const [result] = await pool.query(sql);

    return result;
  }

  async createUser(user) {
    let sql = `INSERT INTO users SET ?`;

    const [result] = await pool.query(sql, user);

    return result;
  }



  async editUser(user) {
    let sql = `UPDATE users SET ? WHERE id = ${user.id}`;

    const [result] = await pool.query(sql);

    return result;
  }


  async deleteUser(id) {
    let sql = `DELETE FROM users WHERE id = ${id} limit 1`;

    const [result] = await pool.query(sql);

    return result;
  }


  async getUserID(id) {
    let sql = `SELECT * FROM users WHERE id = ${id}`;

    const [result] = await pool.query(sql);

    return result;
  }

  
}
