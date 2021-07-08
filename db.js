async function connect(){
  if(global.connection && global.connection.state !== 'disconnected')
      return global.connection;

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection("mysql://root:@localhost:3306/carolina_aguera");
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}

async function selectCustomers(){
  const conn = await connect();
  const [rows] = await conn.query('SELECT * FROM cliente;');
  return rows;
}

async function insertCustomer(customer){
  const conn = await connect();
  const sql = 'INSERT INTO cliente(nome,cpfcnpj,email,telefone,cep,endereco,numero,cidade,estado,status) VALUES (?,?,?,?,?,?,?,?,?,?);';
  const values = [customer.nome, customer.cpfcnpj, customer.email,customer.telefone,customer.cep,customer.endereco,customer.numero,customer.cidade,customer.estado,customer.status];
  return await conn.query(sql, values);
}
async function updateCustomer(id, customer){
  const conn = await connect();
  const sql = 'UPDATE cliente SET nome=?,cpfcnpj=?,email=?,telefone=?,cep=?,endereco=?,numero=?,cidade=?,estado=?,status=? WHERE id=?';
  const values = [customer.nome, customer.cpfcnpj, customer.email,customer.telefone,customer.cep,customer.endereco,customer.numero,customer.cidade,customer.estado,customer.status, id];
  return await conn.query(sql, values);
}
async function deleteCustomer(id){
  const conn = await connect();
  const sql = 'DELETE FROM cliente where id=?;';
  return await conn.query(sql, [id]);
}

module.exports = {selectCustomers, insertCustomer, updateCustomer, deleteCustomer}
