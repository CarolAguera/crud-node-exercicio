
(async () => {
  const db = require("./db")
  const express = require('express')
  const app = express()
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static('public'))
  app.use(express.static('styles'))


  console.log('SELECT * FROM usuario');
  const clientes = await db.selectCustomers();
  console.log(clientes);

  //console.log('UPDATE usuario');
  //const result2 = await db.updateCustomer(4, { nome: "Zé José", cpfcnpj: "opa", email: "carolzinha@gmail.com", telefone: 80808080, endereco: "rua dos bobos", numero: 0, cidade: "Umuarama", estado: "PR", status: 1, cep: "0000000" });
  //console.log(result2);

  console.log('DELETE FROM usuario');
  const result3 = await db.deleteCustomer(3);
  console.log(result3);

  app.set('view engine', 'ejs')

  app.get('/', (req, res) => {
    res.render('cadastro-usuario.ejs')
  })


  app.post('/cadastrar', async (req, res) => {
    console.log(req.body)
    res.send(req.body)
    let nome = req.body.nome
    let sexo = req.body.sexo
    let idade = req.body.idade
    let hobby = req.body.hobby
    let datanascimento = req.body.datanascimento
    const result = await db.insertCustomer({ nome:nome,sexo:sexo,idade:idade,hobby:hobby,datanascimento:datanascimento});
    console.log(result);
  })

  app.listen(3000, () => { console.log('ESTÁ RODANDO NA PORTA 3000') })
})();