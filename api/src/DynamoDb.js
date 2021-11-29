const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: "us-east-2",
    accessKeyId: "",
    secretAccessKey: ""
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "PeliculasApi";

const getPeliculas =  () =>{
    const params = {
        TableName:TABLE_NAME
    };
    dynamoClient.scan(params, (err, res) =>{
        if (err) {
            console.error(err);
        } else {
            console.log(res.Items);
            return res;
        }
    })
    // .then(res => json(res))
    // .catch(err => err);
    // const peliculas = await dynamoClient.scan(params).promise();
    //console.log("await" + peliculas);
    // return peliculas;
}
const addOrUpdatePeliculas = async (pelicula) => {
    const params = {
        TableName: TABLE_NAME,
        Item: pelicula
    }
    return await dynamoClient.put(params).promise();
}

const deletePelicula = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        key: { id }
    }
    return await dynamoClient.delete(params).promise();
}
const peli = {
    "id" : 5,
    "title" : "The Godfather",
    "img": "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    "descripcion": "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown",
    "precio" : 200
}

module.exports = {
    dynamoClient,
    getPeliculas,
    addOrUpdatePeliculas,
    deletePelicula,
    TABLE_NAME
};