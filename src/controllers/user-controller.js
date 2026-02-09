import {findUserByUsername} from "../models/user-models.js";
import jwt from 'jsonwebtoken';
// TODO: lisää tietokanta funktiot user modeliin ja käytä niitä täällä
// TODO: Refaktoroi tietokanta funktiolle   


const getUsers = (request, response) => {
// ÄLÄ IKINÄ LÄHETÄ SALASANOJA HTTP VASTAUKSESSA!

for(let i=0; i<users.length; i++) {
   delete users [i].password;

// Sensuroi myös emailit
// users[i].email = 'sensored';
}
response.json(users);   
};

// TODO: getUserById

// TODO: putUserByID


// TODO: deleteUserById

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

// Tietokantaversio valmis

const postlogin = async (request, response) => {
    const {username, password} = request.body;
    
    // Haetaan käyttäjä objekti nimen perusteella
    const user = await findUserByUsername(username);
    console.log('postLogin user from db', user);

    if (user) {
        if (user.password === password) {
            delete user.password;
            // generate & sign token using a secret from .env file
            const token = jwt.sign(user, process.env.JWT_SECRET,{
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            
            return response.json({message: 'login ok', user, token});
        }
        return response.status(403).json({error: 'wrong password'});
}
response.status(404).json({error: 'user not found'});
};

// Get user information based on token
const getMe = (req, res) => {

    res.json(req.user);
}

export {getUsers, postUser, postlogin, getMe};