
let express = require("express"),
path = require('path'),
nodeMailer = require('nodemailer'),
bodyParser = require('body-parser');

let app = express();

app.use(express.static('src'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/get',function(req,res){
    let msg ='test'
    return res.send(msg);
})

app.post('/send-email', function (req, res) {
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
     body: req.body.message
     
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

let server = app.listen(8081, function(){
  let port = server.address().port;
  console.log("Server started at http://localhost:%s", port);
});