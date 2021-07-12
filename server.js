const { data } = require("jquery");

(async () => {
  const db = require("./db")
  const express = require('express')
  const app = express()
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static('public'))
  app.use(express.static('styles'))

  app.set('view engine', 'ejs')

  app.get('/', async (req, res) => {
    res.render('cadastro-usuario')
  })

  
  app.post('/usuario/cadastrar', async (req, res) => {
    let nome = req.body.nome
    let sexo = req.body.sexo
    let idade = req.body.idade
    let hobby = req.body.hobby
    let datanascimento = req.body.datanascimento
    await db.insertCustomer({ nome: nome, sexo: sexo, idade: idade, hobby: hobby, datanascimento: datanascimento });
    res.redirect('/usuario/listar')
  })

  app.get('/usuario/listar', async (req, res) => {
    const clientes = await db.selectCustomers();

    clientes.forEach((cliente, index) => {
      let dataAtual = new Date(cliente.datanascimento);

      let dia = dataAtual.getDate();
      if (dia < 10) {
        dia = '0' + dia;
      }
      let mes = dataAtual.getMonth() + 1;
      if (mes < 10) {
        mes = '0' + mes;
      }
      let ano = dataAtual.getFullYear();

      clientes[index].dataConvertida = `${ano}-${mes}-${dia}`;
      clientes[index].dataBrasileira = `${dia}/${mes}/${ano}`;

    });
    res.render('listar-usuario', { clientes: clientes })
  })

//const result2 = await db.updateCustomer(4, { nome: "Zé José", cpfcnpj: "opa", email: "carolzinha@gmail.com", telefone: 80808080, endereco: "rua dos bobos", numero: 0, cidade: "Umuarama", estado: "PR", status: 1, cep: "0000000" });
 

    app.post('/usuario/atualizar', async (req, res) => {
      let id = req.body.id
      let nome = req.body.nome
      let sexo = req.body.sexo
      let idade = req.body.idade
      let hobby = req.body.hobby
      let datanascimento = req.body.datanascimento
       await db.updateCustomer(id, { nome:nome, sexo: sexo, idade: idade, hobby: hobby, datanascimento: datanascimento });
      res.redirect('/usuario/listar')
    });

    app.post('/usuario/excluir', async (req, res) => {
      let id = req.body.id
      await db.deleteCustomer(id);
      res.redirect('/usuario/listar')
    });


  app.listen(3000, () => { console.log('ESTÁ RODANDO NA PORTA 3000') })
})();