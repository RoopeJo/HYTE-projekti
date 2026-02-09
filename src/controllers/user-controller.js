import { findAllUsers, findUserById, createUser, findUserByUsername } from '../models/user-models.js';
import promisePool from '../utils/database.js';


// TODO: lisää tietokanta funktiot user modeliin ja käytä niitä täällä
 
  

// TODO: Refaktoroi tietokanta funktiolle


const getUsers = async (request, response) => {
  try {
    const users = await findAllUsers();
    // Älä ikinä lähetä salasanoja HTTP vastauksessa!
    users.forEach(u => delete u.password);
    return response.json(users);
  } catch (err) {
    console.error('getUsers error:', err);
    return response.status(500).json({ error: 'error' });
  }
};



// TODO: getUserById
const getUserById = async (request, response) => {
  try {
    const { id } = request.params;

    const user = await findUserById(id);
    if (!user) {
      return response.status(404).json({ error: 'user not found' });
    }
    // poista salasana vastauksesta
    delete user.password;

    return response.json(user);
  } catch (err) {
    console.error('getUserById error:', err);
    return response.status(500).json({ error: 'internal server error' });
  }
};




// TODO: putUserByID
const putUserById = async (request, response) => {
    try {
        const { id } = request.params;
        const { username, email } = request.body;

        // Katsotaan löytyykö käyttäjä
        const user = await findUserById(id);
        if (!user) {
            return response.status(404).json({ error: 'user not found' });
        }

        // Päivitä/Lisää käyttäjä
        const sql = `
            UPDATE Users
            SET username = ?, email = ?
            WHERE id = ?
        `;
        await promisePool.execute(sql, [username, email, id]);

        // Hakee käyttäjän ja palautaa ilman salasanaa
        const updated = await findUserById(id);
        if (updated) delete updated.password;

        response.json(updated);

    } catch (err) {
        console.error('putUserById error:', err);
        response.status(500).json({ error: 'internal server error' });
    }
};



// TODO: deleteUserById
const deleteUserById = async (request, response) => {
  try {
    const { id } = request.params;

    // Tarkista että käyttäjä olemassa
    const existing = await findUserById(id);
    if (!existing) {
      return response.status(404).json({ error: 'user not found' });
    }

    const sql = 'DELETE FROM Users WHERE id = ?';
    const [result] = await promisePool.execute(sql, [id]);

    if (!result || result.affectedRows === 0) {
      return response.status(404).json({ error: 'user not found' });
    }

    return response.status(204).send();
  } catch (err) {
    console.error('deleteUserById error:', err);
    return response.status(500).json({ error: 'internal server error' });
  }
};
``




// Käyttäjän lisäys (rekisteröityminen)

const postUser = (request, response) => {

// UUsilla käyytäjllä pitää olla kaikki vaaditut ominaisuudet
// itse koodattu erittäin yksinkertainen syötteen validointi
if (!(newUser.username && newUser.password && newUser.email)) {
    return response.status(400).json({error: 'required fields missing'});

}

// HUOM! ÄLÄ ikinä loggaa käyttäjätietoja ensimmäisten pakollisten testien jälkeen!!
    const newUser = request.body;
    console.log('registering new users', newUser);
    const newId = users[users.length-1].id+1;
    newUser.id = newId;
    // Luodaan uusi objekti joka sisältää id-propetyn ja kaikki NewUser objektin
    // ominaisuudet ja lisätään se users taulukkon loppuun
    users.push({id:newId,...newUser});
    delete newUser.password;
    console.log('users', users);
    response.status(201).json({message: 'new user added', user: newUser});
};

// Tietokantaversio

const postlogin = async (request, response) => {
    const {username, password} = request.body;
    
    // Haetaan käyttäjä objekti nimen perusteella
    const user = await findUserByUsername(username);
    console.log('postLogin user from db', user);

    if (user) {
        if (user.password === password) {
            delete user.password;
            response.json({message: 'login ok', user: user});
        }
        return response.status(403).json({error: 'wrong password'});
}
response.status(404).json({error: 'user not found'});
};

export {getUsers, getUserById, putUserById, deleteUserById, postUser, postlogin};