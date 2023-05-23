const nodemailer = require("nodemailer");

// Configuración de Nodemailer
async function main(email, subject, html) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "no-reply@beemeral.com", // generated ethereal user
        pass: "wloetzoezmflyvtf", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'BEEMERAL <no-reply@beemeral.com', // sender address
      to: `${email}`, // list of receivers
      subject, // Subject line
      html, // plain text body
      //html:  // html body
    });

    ("Message sent: %s", info.messageId);
  }


  const getTemplate = (name, token, language) => {

    let email = "";

    if(language == "en-GB" || language == "en-US"){
       email = `
       <div id="email___content">
         <div style="background-color: #002646; padding: 10px; width: 100%">
           <img src="https://beemeral.com/wp-content/uploads/2022/12/Beemeral_Logo_N.png" alt="">
         </div>
         <h2>Hello ${name},</h2>
         <p>To verify your account, click on this link:</p>
         <a
             href="http://localhost:4000/users/verify/${token}"
             target="_blank"
         ><button type= "submit" style="margin-top: 10px; padding: 10px; border-radius: 10px; background-color: #19BA7A; color: white; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">Click here</button></a>
       </div>
     `;

    }
    else if(language == "es-ES" || language == "es-419"){
 
      email = `
      <div id="email___content">
        <div style="background-color: #002646; padding: 10px; width: 100%">
          <img src="https://beemeral.com/wp-content/uploads/2022/12/Beemeral_Logo_N.png" alt="">
        </div>
        <h2>Hola ${name},</h2>
        <p>Para verificar su cuenta, pulse el siguiente enlace:</p>
        <a
            href="http://localhost:4000/users/verify/${token}"
            target="_blank"
        ><button type= "submit" style="margin-top: 10px; padding: 10px; border-radius: 10px; background-color: #19BA7A; color: white; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">Pulse aquí</button></a>
      </div>
    `;
    }
    
    return email ;
  }



  module.exports = {main, getTemplate};