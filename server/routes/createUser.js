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