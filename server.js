const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config');
const db = require('./models');
const { authenticateToken, isAdmin } = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

db.sequelize.sync();

app.post('/api/register', async (req, res) => {
  const { name, email, password,  role = 'employee' } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({ name, email, password: hashedPassword, role });
    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({ where: { email } });

  if (user == null || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ success: false, error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, config.secret);
  res.json({ success: true, token });
});

app.get('/api/me', authenticateToken, async (req, res) => {
  try {
    const user = await db.User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }  // Exclude password from the response
    });
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.post('/api/menus', authenticateToken, isAdmin, async (req, res) => {
  const { date } = req.body;
  try {
    const menu = await db.Menu.create({ date });
    res.json({ success: true, menu });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.post('/api/menus/:MenuId/options', authenticateToken, isAdmin, async (req, res) => {
  const { MenuId } = req.params;
  const { option_name } = req.body;
  console.log('menuId:', MenuId);
  try {
    const menuOption = await db.MenuOption.create({ MenuId, option_name });
    res.json({ success: true, menuOption });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// app.get('/api/menus/:date/choices', authenticateToken, isAdmin, async (req, res) => {
//   const { date } = req.params;
//   try {
//     const menu = await db.Menu.findOne({ where: { date }, include: { model: db.MenuOption, include: { model: db.Choice, include: db.User } } });
//     if (menu) {
//       res.json({ success: true, choices: menu.MenuOptions.flatMap(option => option.Choices.map(choice => ({ user: choice.User, menuOption: option }))) });
//     } else {
//       res.status(404).json({ success: false, error: 'Menu not found' });
//     }
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// });

app.get('/api/menus/:date/choices', authenticateToken, isAdmin, async (req, res) => {
  const { date } = req.params;
  try {
    const menu = await db.Menu.findOne({
      where: { date },
      include: {
        model: db.MenuOption,
        include: {
          model: db.Choice,
          include: {
            model: db.User,
            attributes: ['id', 'name', 'email'] // Specify user attributes to return
          }
        }
      }
    });

    if (menu) {
      const choices = menu.MenuOptions.flatMap(option =>
        option.Choices.map(choice => ({
          user: choice.User,
          menuOption: option.option_name // Use option name instead of option object
        }))
      );
      res.json({ success: true, choices });
    } else {
      res.status(404).json({ success: false, error: 'Menu not found' });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});



app.get('/api/menus/today', authenticateToken, async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const menu = await db.Menu.findOne({ where: { date: today }, include: db.MenuOption });
    if (menu) {
      res.json({ success: true, menuOptions: menu.MenuOptions });
    } else {
      res.status(404).json({ success: false, error: 'No menu for today' });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.post('/api/choices', authenticateToken, async (req, res) => {
  const { MenuOptionId } = req.body;
  try {
    const choice = await db.Choice.create({ UserId: req.user.id, MenuOptionId });
    res.json({ success: true, choice });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/menus', authenticateToken, isAdmin, async (req, res) => {
  try {
    const menus = await db.Menu.findAll();
    res.json({ success: true, menus });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
