const conexion = require('../api/conexion');
module.exports = {
    async insertar(primerNombre,segundoNombre,primerApellido,segundoApellido,edad,genero,email,contrasena){
        sql = "INSERT INTO usuarios (nombre_1,nombre_2,apellido_1, apellido_2, sw_estado,edad,genero) VALUES ('"+primerNombre+"','"+segundoNombre+"','"+primerApellido+"','"+segundoApellido+"','1','"+edad+"','"+genero+"');\n";
        await conexion.query(sql);
        sql = "SELECT user_id FROM usuarios WHERE nombre_1 = '"+primerNombre+"' AND apellido_1 = '"+primerApellido+"';";
        let id_user = await conexion.query(sql);
        sql = "INSERT INTO login (usuarios_user_id,password,email,created_on,last_login) VALUES ('"+id_user.rows[0].user_id+"','"+contrasena+"','"+email+"',NOW(),NOW());";
        let resultados = await conexion.query(sql);
        return resultados;
    },
    async obtener(){
        sql = 'SELECT * FROM usuarios;';
        const resultados = await conexion.query(sql);
        return resultados.rows;
    },
    async login(usuario,contrasena){
        sql = "SELECT CASE WHEN email != '' THEN '1' ELSE '0' END AS ingreso FROM login WHERE email = '"+usuario+"' AND password = '"+contrasena+"'";
        const resultados = await conexion.query(sql);
        return (!resultados.rows)?resultados:resultados.rows;
    }
}