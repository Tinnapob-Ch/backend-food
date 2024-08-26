import { pool } from "../database.js";


export default class registerservice {
    area = async (users) => {
        let sql = `INSERT INTO sign_in (users,password) VALUES ('${users.users}','${users.password}')`;
        const [result] = await pool.query(sql);

        return result;

    }
    async postregister(firstname, lastname, phone, s_id) {
        let sql = `INSERT INTO member (firstname, lastname, phone,s_id) VALUES ('${firstname}', '${lastname}', '${phone}' , '${s_id}')`;
        const [result] = await pool.query(sql);
        return result;
    }
    async editregister(member) {
        let sql = `UPDATE member SET ? WHERE s_id = ${member.id}`;
        const [result] = await pool.query(sql, member);
        return result;
    }
    async loginmember(users, password) {
        let sql = `SELECT * FROM sign_in WHERE users = '${users}' AND password = '${password}'`;
        const [[user]] = await pool.query(sql);
        return user;
    }
    async getmember(id) {
        const sql = `SELECT *  FROM signmember WHERE id = ${id}`;
        const [result] = await pool.query(sql);
        return result;
    }
    async editsign_in(sign_in) {
        const sql = `UPDATE sign_in SET ? WHERE id = ${sign_in.id}`;
        const [result] = await pool.query(sql, sign_in);
        return result;
    }
    async getfood_recipes(user) {
        console.log(user.id);
        let sql = `SELECT * FROM food_recipes WHERE sign_id = ${user.id}`;
        const [result] = await pool.query(sql);
        return result;
      }
    async editrecipes(recipes) {
        const sql = `UPDATE food_recipes SET ? WHERE id = ${recipes.id}`;
        const [result] = await pool.query(sql,recipes);
        return result;
    }
    async createrecipes(name, recipes, food_type,food_picture,sign_id) {
        const sql = `INSERT INTO food_recipes (name, recipes, food_type,food_picture,sign_id) VALUES ('${name}', '${recipes}', '${food_type}','${food_picture}','${sign_id}')`;
        const [result] = await pool.query(sql);
        return result;
        
    }
    async deletefood_recipes(id) {
        const sql = `DELETE FROM food_recipes WHERE id = ${id} limit 1`;
        const [result] = await pool.query(sql);
        return result;
    }

}