//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){ 

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_adress: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    //const url = There was a small url problem here, but it will be fixed.

    const options = {
        method : "POST",
        auth: "angela1:b584fc710670576e41b29ddcec6f329b-us8"
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200) {
            res.send(__dirname + "/failure.html");
        } else {
            res.send(__dirname + "/success.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

}); 

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});



//api key
//b584fc710670576e41b29ddcec6f329b-us8

//list id
// 408a690933