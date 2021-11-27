

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

const AWS = require('aws-sdk');

global.fetch = require('node-fetch');

const poolData = {    
    UserPoolId : "us-east-2_zYu3aWlOC", // Your user pool id here    
    ClientId : "6c8s326j80vdcsilue5q9nq8ul" // Your client id here
    }; 
const pool_region = 'us-east-2';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
function registro(atributos){
    console.log(atributos);
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"address", Value: atributos.direccion}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name", Value: atributos.nombre}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email", Value: atributos.email}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"family_name", Value: atributos.apellido}));
    
    userPool.signUp(atributos.email, atributos.password, attributeList, null,
    function  (err, res){
        if (err) {
            console.log(err);
            return;
        }
        cognitoUser = res.user.getUsername();
        console.log('user name is ' + cognitoUser);
        return 'user name is ' + cognitoUser;
        });

};

const login = (user) =>{
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : user.email,
        Password : user.password
    });
    var userData = {
        Username : user.email,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            // console.log('id token + ' + result.getIdToken().getJwtToken());
            // console.log('refresh token + ' + result.getRefreshToken().getToken());
            const token = {"token": result.getAccessToken().getJwtToken()}
            return token;
        },
        onFailure: function(err) {
            console.log(err);
        },

    });

}


module.exports = { registro, login };