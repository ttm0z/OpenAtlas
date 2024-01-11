const express = require(express);
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String
})

const User = new mongoose.model("User", userSchema);
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;



database.on('error', => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(cors());
app.use(express.json());
app.use(require('body-parser').json());

//app.use('/', routes)
    // consider moving endpoints to dedicated routes file/directory]
//  more modular!


// HTTP post request - create new user (signup)
app.post("/Register", async (req, res)=>{
    console.log(req.body);
    const {name, email, password} = req.body;
    const user = User.findOne({email:email})
    const data = new User({name,email,password});
    try{
	const saveData = await data.save()
	res.status(200).json({message: "success!"});
	console.log("Data Write Successful: ", data)
    }
    catch(error){
	res.status(500).json({message : "Error"})
    }
})


app.get("/api", (req,res) => {
    res.json({messsage: "Hello from server!"});
});

// HTTP POST request - authenticate user upon login attempt

app.post("/Login", async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    console.log("Recieved Login Request");
    try{
	const data = await User.findOne({username:username})
	JSON.stringify(data)
	console.log(data)
	if(data){
	    console.log("success");
	    if(data.password === password) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({message:"success"}))
	    }
	    else {
		res.json({message : "Failure"})
	    }
	}
	else{
	    res.json({message, "No user with given username"})
	}
    }
    catch(error){
	return
    }
})




app.listen(PORT, ()=> {
    console.log(`Server listening on $(PORT)`);
});
