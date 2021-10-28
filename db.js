async function connect() {
  if (global.connection && global.connection.state !== 'disconnected')
    return global.connection;

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection("mysql://root:gazin@172.17.0.2:3306/gazin");
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}

async function selectCustomers() {
  const conn = await connect();
  const [rows] = await conn.query('SELECT * FROM usuario;');
  return rows;
}
async function selectSearchCustomers(search) {
  const conn = await connect();
  let where = "where nome like '%" + search + "%'";  
  const [rows] = await conn.query('SELECT * FROM usuario '+ where + ';');
  return rows;
}

async function insertCustomer(customer) {
  const conn = await connect();
  const sql = 'INSERT INTO usuario(nome,sexo,idade,hobby,datanascimento) VALUES (?,?,?,?,?);';
  const values = [customer.nome, customer.sexo.toUpperCase(), customer.idade, customer.hobby, customer.datanascimento];
  return await conn.query(sql, values);
}
async function updateCustomer(id, customer) {
  const conn = await connect();
  const sql = 'UPDATE usuario SET nome=?,sexo=?,idade=?,hobby=?,datanascimento=? WHERE id=?';
  const values = [customer.nome, customer.sexo, customer.idade, customer.hobby, customer.datanascimento, id];
  return await conn.query(sql, values);
}
async function deleteCustomer(id) {
  const conn = await connect();
  const sql = 'DELETE FROM usuario where id=?;';
  return await conn.query(sql, [id]);
}

module.exports = { selectCustomers, selectSearchCustomers,insertCustomer, updateCustomer, deleteCustomer }
