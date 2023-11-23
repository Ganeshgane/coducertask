import nodemailer from "nodemailer";

// send mail
const sendMail = async (req, res, next) => {
  try {
    const verifiedUser = await Optsend.findOne({
      email: req.body.email,
    });

    if (verifiedUser) await Otpsend.findOneAndDelete({ email: req.body.email }); // email

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "ramaganesh12@gmail.com",
        pass: "", // app password
      },
    });

    var data = {
      from: "ramaganesh12@gmail.com",
      to: req.body.email,
      subject: "Verify Otp",
      html: `The otp is ${otp}`,
    };

    try {
      transporter.sendMail(data, async (error, info) => {
        if (error) return next(error);
        else {
          // const Otpverification = await Otpsend.create({
          //     email: req.body.email,
          //     otp: otp
          // })
          // await Otpverification.save()
        }
      });

      return res.status(200).json({
        message: "Success",
        status: "OK",
        data: "Email send successfully",
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// https://github.com/geshan/nodejs-posgresql

export { sendMail };
