const express = require("express");
const cors = require('cors');
const isBizMail = require('is-biz-mail');
const EmailValidator = require('email-deep-validator')
const emailValidator = new EmailValidator();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.json({
        Welcome: '*** Email Validation API 📬 ***',
        Usage: 'Send a POST request to the endpoint {/validate-email} with the email address as your query parameter',
        Respnse: 'SuccessMsg: Valid Email, ErrorMsg: Invalid Email',
        cheers: '🙏🏻 Thank You 🥂',
        note: "You can use every other mail service apart from Yahoo, their SMTP Server does not allow this"
    })
});

app.post('/validate-email', async (req, res)=>{
    try{   
    const email = req.query.email;
    const { wellFormed, validDomain, validMailbox } = await emailValidator.verify(email);
    
     
    let result = isBizMail.isFreeMailAddress(email);
    // console.log([email, result]);

    if (wellFormed === true && validDomain === true && validMailbox === true){
        res.json({SuccessMsg: "Valid Email", statusCode: res.statusCode, result: validMailbox})
        // console.log(email + " *V* " + validMailbox)
        return 
    } else if (result === true && validMailbox === null){
        // console.log(email + " " + validMailbox + " " + result)
        res.json({SuccessMsg: "Valid Email", statusCode: res.statusCode, result}); 
        return
    } else if (result === false && validMailbox === null && validDomain === true){
        // console.log(email + " " + validMailbox + " " + result)
        res.json({SuccessMsg: "Valid Email", statusCode: res.statusCode, result: validDomain}); 
        return
    } else {
        console.log(wellFormed, validDomain, validMailbox)
       res.json({ErrorMsg: "Invalid Email", result})
    }
    // return result
    
} catch (error){
    // res.json({ErrorMsg: e.ErrorMsg, result})
    return res.json({ErrorMsg: error.message});
}
})



const Port = process.env.PORT || 3555;
app.listen(Port, ()=>{
    console.log(`Server listening on Port ${Port}`)
});