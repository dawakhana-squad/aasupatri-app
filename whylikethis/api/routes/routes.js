// Load the MySQL pool connection
const pool = require('../data/config');

const router = app => {
    //hospital directory table group by district
     app.get('/hospital_directory', (request, response) => {
        //const District = request.params.District;
    
        pool.query("SELECT * FROM hospital_directory WHERE District = 'Hyderabad' AND Mobile_Number <> '0' AND Location_Coordinates <> ('NA' OR 'Error')", (error, result) => {
            if (error) throw error;
   
            response.send(result);
         });
     });
    
     // Doctor information table 
     app.get('/doctor_info', (request, response) => {

        
            
        pool.query('SELECT * FROM doctor_info ORDER BY Doctor_name ', (error, result) => {
            if (error) throw error;
   
            response.send(result);
         });
     });

     //Blood availability information
     app.get('/blood_info', (request, response) => {
            
        pool.query('SELECT * FROM blood_info', (error, result) => {
            if (error) throw error;
   
            response.send(result);
         });
     });

     //rating information
     app.get('/rating', (request, response) => {
            
        pool.query('SELECT * FROM rating', (error, result) => {
            if (error) throw error;
   
            response.send(result);
         });
     });
    
     // Login details validation
    app.post('/login_details', (request, response) => {
        console.log(request.body);
        const Mob_number = request.body.Mob_number;
        const Pwd = request.body.Pwd;
        console.log('read', Mob_number, Pwd);
        const data = {
            "data": ""
        };

        pool.query('SELECT * FROM Login_details WHERE Mob_number = ? AND Pwd = ? ', [Mob_number,Pwd],
        function(error, rows,fields,result) {
            if (error) throw error;
            console.log(rows, 'rows', Mob_number, Pwd);
            if(rows.length != 0){
                data["data"] = true;
                response.json(data);
            }else{
                data["data"] = false;
                response.json(data);
            } 
            response.send(result)  
        });
    });

    //Registered users data
    app.post('/users_table', (request, response) => {
        const users = {
        "User_ID" : request.body.User_ID,
        "FName" : request.body.FName,
        "LName" : request.body.LName,
        "DOB" : request.body.DOB,
        "Email_ID" : request.body.Email_ID,
        "Sex" : request.body.Sex,
        "Pwd" : request.body.Pwd,
        "Ph_No" : request.body.Ph_No,
        "Bloodtype" : request.body.Bloodtype
        }
        const data = {
            "data": ""
        };      

        if(request.body.FName) {
        pool.query('INSERT INTO users_table SET ?', users, function(error,results, fields) {
            if (error) {
                console.log("error ocurred",error);
                response.json({
                    status:false,
                    message:"user registration failed"        
                });
              }else{
                console.log('The solution is: ', results);
                response.json({
                  status:true,
                  data: results,
                  message:"user registered sucessfully"
                 });
              }  
         });
        } else {
            pool.query('SELECT * FROM users_table WHERE Ph_No = ? AND Pwd = ? ', [users.Ph_No,users.Pwd],
            function(error, rows,fields,result) {
             if (error) throw error;
             //console.log(rows, 'rows', Ph_No, Pwd);
             if(rows.length != 0){
                 data["data"] = true;
                 response.json(data);
             }else{
                 data["data"] = false;
                 response.json(data);
             } 
             response.send(result)  
            });
        }

    });
}


// Export the router
module.exports = router;