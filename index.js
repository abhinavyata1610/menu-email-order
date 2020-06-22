let express = require("express"),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser'),
    cors = require('cors');

let app = express();
app.use(cors());
app.use(express.static('src'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))


app.post('/send-email', function(req, res) {
    console.log('THIS WORKS');
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // should be replaced with real sender's account
            user: 'abhinavmenuapp@gmail.com',
            pass: 'apporder'
        }
    });
    let mailOptions = {
        // should be replaced with real recipient's account
        to: 'abhinavyata@gmail.com',
        subject: req.body.subject,
        text: req.body.message

    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.writeHead(200);
    res.end();
});
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();
// });

let server = app.listen(process.env.PORT || 5000, function() {
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});