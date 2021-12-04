const yup = require('yup');

const isValid = validation =>{
    return (req, res, next) => {
        try {
            validation(req.body);
            next();
        } catch (err) {
            next(err);
        }
    }
}
const validationSignUp = (data) =>{
    const schema = yup.object().shape({
        direccion: yup.string().min(4).max(100).required(),
        nombre: yup.string().min(2).required(),
        email: yup.string().email().required(),
        apellido: yup.string().required(),
        password: yup.string()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        "el password tiene que tener 8 carcateres 1 mayuscula 1 miniuscula y numeros").required()
    });
    schema.validateSync(data);
}
const validationSignIn = (data) =>{
    const schema = yup.object().shape({        
        email: yup.string().email().required(),        
        password: yup.string()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        "el password tiene que tener 8 carcateres 1 mayuscula 1 miniuscula y numeros").required()
    });
    schema.validateSync(data);
}
const validationPedido = (data) =>{
    const schema = yup.object().shape({        
        usuario: yup.string().email().required("El peido tiene lo tiene que hacer un usuario"),        
        pedido: yup.array().min(1, "Tenes que ingresar un pedido").required("Tenes que ingresar un pedido")
    });
    schema.validateSync(data);
}
module.exports = {
    isValid,
    validationSignUp,
    validationSignIn,
    validationPedido
}