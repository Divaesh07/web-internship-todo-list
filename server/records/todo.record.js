const { v4: uuid } = require('uuid');
const { pool } = require('../utils/db');

class TodoRecord {
  constructor(obj) {
    if (!obj.todo || obj.todo.length < 3 || obj.todo.length > 50) {
      throw new Error(
        'Todo must have at least 3 characters and less than 50 characters'
      );
    }

    this.id = obj.id || null; // Allow `id` to be NULL (MySQL will auto-generate if `AUTO_INCREMENT`)
    this.todo = obj.todo;
  }

  static async listAll() {
    const [results] = await pool.execute('SELECT * FROM `todos`');
    return results.map((obj) => new TodoRecord(obj));
  }

  static async getOne(id) {
    const [results] = await pool.execute(
      'SELECT * FROM `todos` WHERE `id` = ?',
      [id]
    );
    return results.length === 0 ? null : new TodoRecord(results[0]);
  }

  async insert() {
    await pool.execute('INSERT INTO `todos`(`todo`) VALUES(?)', [this.todo]);
  }

  async update(id, todo) {
    await pool.execute('UPDATE `todos` SET `todo` = ? WHERE `id` = ?', [
      todo,
      id,
    ]);
  }

  async delete() {
    if (!this.id) throw new Error("Cannot delete: ID is missing.");
    await pool.execute('DELETE FROM `todos` WHERE `id` = ?', [this.id]);
}

}

module.exports = {
  TodoRecord,
};
