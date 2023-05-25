const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const generatePasswordRand = require("../services/passGenerator");
const stripe = require("stripe")(process.env.STRIPE_KEY);


//Create user
//localhost:4000/users/createUser
const createUser = async (req, res) => {
  try {
    // Capturar los parámetros del formulario
    const { name, nickname, last_name, email, password } = req.body.register;
    const { language } = req.body;

    // Generar un código aleatorio para la verificación de cuenta
    const code = uuidv4();

    // Codificar la contraseña utilizando bcrypt
    const saltRounds = 8;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear el usuario utilizando Sequelize
    const newUser = await User.create({
      name,
      nickname,
      last_name,
      email,
      password: hashedPassword,
      code,
    });

    // Generar el token de verificación
    const token = jwt.sign(
      {
        data: {
          email,
          code,
        },
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    // Crear la plantilla del email
    const mensajeEmail =
      language === "en-GB" || language === "en-US"
        ? "User verification email"
        : "Mensaje de verificación de usuario";

    // Enviar el email
    await main(email, mensajeEmail, getTemplate(name, token, language));

    res.status(200).json({ result: newUser });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(500).json("Nickname o email ya existen");
    } else {
      console.error(error);
      res.status(500).json("Error en el servidor");
    }
  }
};

//login
//localhost:4000/users/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por email utilizando Sequelize
    const user = await User.findOne({ where: { email } });

    // Verificar si el usuario existe y no está eliminado
    if (!user || user.is_deleted === 1) {
      return res.status(401).json("Usuario no registrado");
    }

    // Verificar si el usuario está verificado
    if (user.is_verified === 0) {
      return res.status(400).json({ user });
    }

    // Comparar las contraseñas utilizando bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Si las contraseñas coinciden, generar el token de autenticación
    if (passwordMatch) {
      const token = jwt.sign(
        {
          user: {
            email: user.email,
            nickname: user.nickname,
            name: user.name,
            id: user.user_id,
            type: user.type,
            img: user.img,
          },
        },
        process.env.SECRET,
        { expiresIn: "10d" }
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json("Credenciales inválidas");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Error en el servidor");
  }
};

//select one user
//localhost:4000/users/oneUser/:user_id
const selectOneUser = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const user = await User.findOne({
      where: {
        user_id: user_id,
        is_deleted: false
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const dateEnd = user.subscription_end !== 0 ? new Date(user.subscription_end).toLocaleDateString("es-ES") : "";

    const projects = await Project.findAll({
      include: [{
        model: Size,
        required: true
      }],
      where: {
        user_id: user_id,
        is_deleted: false
      }
    });

    const subscription = await Subscription.findOne({
      where: {
        subscription_id: user.subscription_id
      }
    });

    const categories = await Category.findAll();
    const themes = await Theme.findAll();
    const sizes = await Size.findAll();

    res.status(200).json({
      user,
      projects,
      subscription,
      dateEnd,
      categories,
      themes,
      sizes
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//Edit user
//localhost:4000/users/editUser
const editUser = async (req, res) => {
  const user_id = req.params.user_id;
  const { nickname, name, last_name, email } = req.body;

  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingUser = await User.findOne({
      where: {
        email: email,
        user_id: { [Op.not]: user_id },
      },
    });

    if (existingUser) {
      return res.status(400).json("Email already exists");
    }

    user.nickname = nickname;
    user.name = name;
    user.last_name = last_name;
    user.email = email;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//edit image User
//localhost:4000/users/editImageUser
const editImgUser = async (req, res) => {
  const user_id = req.params.user_id;
  const img = req.file.filename;

  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.img = img;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//verify password
//localhost:4000/users/checkPassword/:userId
const checkPassword = async (req, res) => {
  const user_id = req.params.user_id;
  const { password } = req.body;

  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hash = user.password;
    const isMatch = await bcrypt.compare(password, hash);

    if (isMatch) {
      res.status(200).json({ response: true });
    } else {
      res.status(401).json({ response: false });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//edit password
//localhost:4000/users/editPassword/:userId
const editPassword = async (req, res) => {
  const user_id = req.params.user_id;
  const { password } = req.body;

  try {
    const saltRounds = 8;
    const hash = await bcrypt.hash(password, saltRounds);

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.password = hash;
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete user
//localhost:4000/users/deleteUser/:userId

const deleteUser = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.is_deleted = true;
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//verify User
//localhost:4000/users/verify/:token
const verifyUser = async (req, res) => {
  try {
    const { token } = req.params;

    let data = null;

    try {
      data = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      throw new Error("Error al obtener data del token");
    }

    if (data == null) {
      throw new Error("Error al obtener data");
    }

    const { email, code } = data.data;

    const transaction = await sequelize.transaction();

    try {
      const user = await User.findOne({ where: { email }, transaction });

      if (!user) {
        throw new Error("Usuario no registrado");
      }

      if (code != user.code) {
        throw new Error("Dirección errónea");
      }

      user.is_verificated = true;
      await user.save({ transaction });

      await transaction.commit();

      res.status(200)
        .send(`<body style='margin: 0'><div style="display: flex; justify-content: center; align-items: center; height: 100vh; width: 100vw; background-color: #002646">
          <div style= "display: flex; flex-direction: column; align-items: center;">
            <p style= "padding: 2rem; color: #19BA7A; font-family: Verdana, Geneva, Tahoma, sans-serif; font-size: 18pt;border-radius: 0.5rem; background-color: white;">&#x2611; You have successfully verified your account</p>           
            <a
              href="http://localhost:3000"
              target="_blank"
            ><button type= "submit" style="margin-top: 10px; padding: 25px; border-radius: 10px; background-color: #19BA7A; color: white; font-size: 20px; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">Back to Beemeral</button></a>
          </div>
          </div></body>`);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

//resend verify email
//localhost:4000/users/resendEmail
const resendEmail = async (req, res) => {
  try {
    const { name, email, code } = req.body.data;
    const { language } = req.body;

    const token = jwt.sign(
      {
        data: {
          email: email,
          code: code,
        },
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    const template = getTemplate(name, token, language);

    let mensajeEmail = "";

    if (language == "en-GB" || language == "en-US") {
      mensajeEmail = "User verification email";
    } else if (language == "es-ES" || language == "es-419") {
      mensajeEmail = "Mensaje de verificación de usuario";
    }

    await sendEmail(email, mensajeEmail, template);

    res.status(200).json({ message: "Email resend" });
  } catch (error) {
    res.status(500).json({ error: "Error al enviar el email" });
  }
};

//forgot password
//localhost:4000/users/forgotPassword
const forgotPassword = async (req, res) => {
  const { email } = req.body.login;
  const { language } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json("Email no registrado");
    }

    const password = generatePasswordRand(10, "rand");
    const saltRounds = 8;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await user.update({ password: hashedPassword });

    let subject = "";
    let messageEmail = "";

    if (language == "en-GB" || language == "en-US") {
      subject = "Beemeral password recovery email";
      messageEmail = `<div id="email___content">
          <div style="background-color: #002646; padding: 10px;width: 70%">
            <img style="object-fit: contain; object-position: center;" src="https://beemeral.com/wp-content/uploads/2022/12/Beemeral_Logo_N.png" alt="">
          </div>            
          <h3>These are your login details:</h3>
          <p>email: ${email}</p>            
          <p>password: ${password}</p>
          <a href="http://localhost:3000" target="_blank">
            <button style="margin-top: 10px; padding: 10px; border-radius: 10px; background-color: #19BA7A; color: white">Back to Beemeral</button>
          </a>
        </div>`;
    } else if (language == "es-ES" || language == "es-419") {
      subject = "Beemeral email de recuperación de contraseña";
      messageEmail = `<div id="email___content">
          <div style="background-color: #002646; padding: 10px;width: 70%">
            <img style="object-fit: contain; object-position: center;" src="https://beemeral.com/wp-content/uploads/2022/12/Beemeral_Logo_N.png" alt="">
          </div>            
          <h3>Tus credenciales son:</h3>
          <p>email: ${email}</p>            
          <p>contraseña: ${password}</p>
          <a href="http://localhost:3000" target="_blank">
            <button style="margin-top: 10px; padding: 10px; border-radius: 10px; background-color: #19BA7A; color: white">Volver a Beemeral</button>
          </a>
        </div>`;
    }

    await sendEmail(email, subject, messageEmail);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ error: "Error al recuperar la contraseña" });
  }
};

//spend render
//localhost:4000/users/spendRender/:user_id
const spendRender = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.increment("cont_render", { by: 1 });

    res.status(200).json({ message: "Render count updated" });
  } catch (error) {
    res.status(500).json({ error: "Error updating render count" });
  }
};

//spend export
//localhost:4000/users/spendExport/:user_id
const spendExport = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await user.increment("cont_export", { by: 1 });

    res.status(200).json({ cont_export: updatedUser.cont_export });
  } catch (error) {
    res.status(500).json({ error: "Error updating export count" });
  }
};

//pick up all the prices to stripe
//localhost:4000/users/getPrices
const getPrices = async (req, res) => {
  try {
    const prices = await stripe.price.findAll();
    const reversedPrices = prices.reverse();
    res.json(reversedPrices.map((price) => price.toJSON()));
  } catch (error) {
    res.status(500).json({ error: "Error retrieving prices" });
  }
};

module.exports = {
  createUser,
  login,
  editUser,
  editImgUser,
  checkPassword,
  editPassword,
  deleteUser,
  verifyUser,
  resendEmail,
  spendRender,
  spendExport,
  forgotPassword,
  getPrices,
  selectOneUser,
};
