const nodemailer = require( "nodemailer" );

const sendMail = async function ( email, name ) {
  try {
    let transporter = nodemailer.createTransport( {
      service: "Gmail",
      port:587,
      secure: true,
      auth: {
        user: "aniketsimha@gmail.com",
        pass:process.env.EMAIL_PASS
      }
    } )
    
    await transporter.sendMail( {
      from: "Task App <aniketsimha@gmail.com>",
      to: email,
      subject: "Welcome to the task app ",
      text:`Hello ${name}, welcome to the task app`
    })
    
  } catch ( error ) {
    console.log( error );
    throw Error( "Failed to send email" );
  }
}

module.exports = sendMail;