const express = require("express"),
    app = express(),
    mongoose = require("mongoose");

require("dotenv")
    .config();

const mongo_db_connection_string = "mongodb+srv://mahohih515:OpQfly5fhTqcJmmj@agent-placement.1nm1kpx.mongodb.net/agent_collection?retryWrites=true&w=majority&appName=agent-placement";


//Connect to database
try {
    mongoose.connect(mongo_db_connection_string, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("connected to db");
} catch (error) {
    handleError(error);
}
process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});
    
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

//setup server to listen on port 5000
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is live on port 5000");
})