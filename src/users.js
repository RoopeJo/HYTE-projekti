// Users mock data and endpoints

const users = [
  {
    id: 1,
    username: "johndoe",
    password: "password1",
    email: "johndoe@example.com"
  },
  {
    id: 2,
    username: "janedoe",
    password: "password2",
    email: "janedoe@example.com"
  },
  {
    id: 3,
    username: "bobsmith",
    password: "password3",
    email: "bobsmith@example.com"
  }
];
    
// Users endpoints

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
//

// Käyttäjän lisäys (rekisteröityminen)
const postUser = (request, response) => {
// UUsilla käyytäjllä pitää olla kaikki vaaditut ominaisuudet
// itse koodattu erittäin yksinkertainen syötteen validointi
if (!(newUser.username && newUser.password && newUser.email)) {
    return response.status(400).json({error: 'required fields missing'});

}

// HUOM! ÄLÄ ikinä loggaa käyttäjätietoja ensimmäisten pakollisten testien jälkeen!!
    const newUser = request.body;
    console.log('registerign new users', newUser);
    const newId = users[users.length-1].id+1;
    newUser.id = newId;
    // Luodaan uusi objekti joka sisältää id-propetyn ja kaikki NewUser objektin
    // ominaisuudet ja lisätään se users taulukkon loppuun
    users.push({id:newId,...newUser});
    delete newUser.password;
    console.log('users', users);
    response.status(201).json({message: 'new user added', user: newUser});
};


const postlogin = (request, response) => {
    const {username, password} = request.body;
    
    // Haetaan käyttäjä objekti nime perusteella
    const userFound = users.find(user=> username===user. username);
    if (userFound) {
        if (userFound.password === password) {
            delete userFound.password;
            response.json({message: 'login ok', user: userFound});
        }
        return response.status(403).json({error: 'wrong password'});
}
response.status(404).json({error: 'user not found'});
};

export {getUsers, postUser, postlogin}
