
(async () => {
  const db = require("./db")
  const express = require('express')
  const app = express()
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static('public'))
  app.use(express.static('styles'))


  //console.log('SELECT * FROM CLIENTES');
  //const clientes = await db.selectCustomers();
  //console.log(clientes);

  //console.log('UPDATE CLIENTES');
  //const result2 = await db.updateCustomer(4, { nome: "Zé José", cpfcnpj: "opa", email: "carolzinha@gmail.com", telefone: 80808080, endereco: "rua dos bobos", numero: 0, cidade: "Umuarama", estado: "PR", status: 1, cep: "0000000" });
  //console.log(result2);

  //console.log('DELETE FROM CLIENTES');
  //const result3 = await db.deleteCustomer(7);
  //console.log(result3);

  app.set('view engine', 'ejs')

  app.get('/', (req, res) => {
    res.render('index.ejs')
  })

  app.post('/cadastrar', async (req, res) => {
    console.log(req.body)
    res.send(req.body)
    let email = req.body.email
    let senha = req.body.senha
    const result = await db.insertCustomer({ nome: "FLALALALALAL", cpfcnpj: senha, email: email, 
    telefone: 90909090, endereco: "rua dos bobos", numero: 0, cidade: "Umuarama", estado: "PR", status: 1, cep: "87503420" });
    console.log(result);
  })

  app.listen(3000, () => { console.log('ESTÁ RODANDO NA PORTA 3000') })
})();