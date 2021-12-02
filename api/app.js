const express = require('express');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const { validationSignUp,
        validationSignIn,
        isValid } = require('./src/Validate');

const cognito = require('./src/cognito');

const AWS = require('aws-sdk');
const { getPeliculas, 
        addOrUpdatePeliculas,
        deletePelicula,
        dynamoClient,
        TABLE_NAME } = require('./src/DynamoDb');

global.fetch = require('node-fetch');

const poolData = {    
    UserPoolId : "us-east-2_zYu3aWlOC", // Your user pool id here    
    ClientId : "6c8s326j80vdcsilue5q9nq8ul" // Your client id here
    }; 
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json("hello world");
});
app.post('/login', isValid(validationSignIn), (req, res) => {
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : req.body.email,
        Password : req.body.password
    });
    var userData = {
        Username : req.body.email,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            res.json({token: `${result.getAccessToken().getJwtToken()}` });
        },
        onFailure: function(err) {
            res.json({error : `${err.message}`});
        }
    });

});
app.post('/registro', isValid(validationSignUp) ,(req, res) => {
    
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"address", Value: req.body.direccion}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name", Value: req.body.nombre}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email", Value: req.body.email}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"family_name", Value: req.body.apellido}));
    
    userPool.signUp(req.body.email, req.body.password, attributeList, null,
    function  (error, result){
        if (error) {
            console.log(error);
            res.json({error});
        }
        user = result.user;
        console.log('user name is ' + result.user);
        res.json({ usuario: `${user.getUsername()}` })
        });
    
});
app.get('/peliculas', (req, res) => {
    const params = {
        TableName:TABLE_NAME
    };
    dynamoClient.scan(params, (err, data) =>{
        if (err) {
            console.error(err);
            res.status(500).json({ error : "Algo salio mal intentalo mas tarde"});
        } else {
            res.status(200).json(data.Items);
        }
    
    });

});
app.post('/pedido', (req, res) => {
    const pedido  = req.body;
    console.log(pedido);
    const params1 = {
        TableName:'PedidoApi'
    }
    dynamoClient.scan(params1, (err, data) => {
        if (err) {
                    console.error(err);
                } else {        
        pedido.id = data.ScannedCount +1
        const params = {
            TableName:'PedidoApi',
            Item: pedido
        };
        dynamoClient.put(params, (err, data) =>{
            if (err) {
                console.error(err);
                res.status(500).json({ error : err.message});
            } else {
                res.status(200).json({mensaje : "Pedido cargado correctamente"});
            }
        
        });
        }        
    });
    

});
app.post('/pelicula/add', async (req, res) => {
    const pelicula = req.body;
    try {
        const newPelicula = await addOrUpdatePeliculas(pelicula);
        res.status(200).json(newPelicula);
    } catch (error) {
        console.error(err);
        res.status(500).json({ err : "Algo salio mal intentalo mas tarde"});
    }

});
app.post('/pelicula/:id', async (req, res) => {
    const pelicula = req.body;
    const {id} = req.params;
    pelicula.id = id;
    try {
        const updatePelicula = await addOrUpdatePeliculas(pelicula);
        res.status(200).json(updatePelicula);
    } catch (error) {
        console.error(err);
        res.status(500).json({ err : "Algo salio mal intentalo mas tarde"});
    }

});
app.delete('/pelicula/delete/:id', async (req, res) => {
    const {id} = req.params;
    try {        
        res.status(200).json(await deletePelicula(id) + "ok");
    } catch (error) {
        console.error(err);
        res.status(500).json({ err : "Algo salio mal intentalo mas tarde"});
    }

});
app.use((error, req, res, next) =>{
    res.status(501).json({error: error.message});
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});