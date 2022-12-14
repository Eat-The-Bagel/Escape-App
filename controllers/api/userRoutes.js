const router = require('express').Router();
const { User, Character } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
      const userData = await User.findAll({
         include: [Character]
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({where: {id :req.params.id},
      include: [Character]
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with that id' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE new user
router.post('/signup', async (req, res) => {
  try {
    console.log(req) 
    const dbUserData = await User.create({
      user_name: req.body.username,
      password: req.body.password,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id =dbUserData.id
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: { user_name : req.body.username }
    });

    //  console.log("DBUSER DATA" ,dbUserData)


    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);
    // console.log("validPassword" ,validPassword)
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
        console.log("here")
      return;
    }
    // res.status(200).json(dbUserData)

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id=dbUserData.id
      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});






module.exports = router;