const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: "us-east-2",
    accessKeyId: "",
    secretAccessKey: ""
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "PeliculasApi";

const getPeliculas = async () =>{
    const params = {
        TableName:TABLE_NAME
    };
    const peliculas = await dynamoClient.scan(params).promise();
 
    return peliculas;
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
    deletePelicula
};