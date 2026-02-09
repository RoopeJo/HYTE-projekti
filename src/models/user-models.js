
import promisePool from '../utils/database.js';

// TODO: lisää mallit ja muokkaa kontrollerit reiteille:
// GET /api/users - list all users
// GET /api/users/:id - get one user by id
// POST /api/users - add new user

// Huom: virheenkäsittely puuttuu
const findUserByUsername = async (username) => {
    const sql = 'SELECT * FROM Users WHERE username = ?';
    const [rows] = promisePool.execute(sql, [username]);
    return rows[0];
};

const findAllUsers = async () => {
    const sql = 'SELECT id, username, email FROM Users';
    const [rows] = await promisePool.execute(sql);
    return rows;
};

const findUserById = async (id) => {
    const sql = 'SELECT id, username, email FROM Users WHERE id = ?';
    const [rows] = await promisePool.execute(sql, [id]);
    return rows[0];
};

const createUser = async (userData) => {
    const sql = `
        INSERT INTO Users (username, email, password)
        VALUES (?, ?, ?)
    `;
    const params = [userData.username, userData.email, userData.password];
    const [result] = await promisePool.execute(sql, params);

    return {
        id: result.insertId,
        username: userData.username,
        email: userData.email
    };
};

export { findUserByUsername, findAllUsers, findUserById, createUser
};
