const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs'); 

const app = express();
const port = 3000;


app.use(cors()); 

app.use(bodyParser.json());

app.post('/api', (req, res) => {
  try {
    const god_json = fs.readFileSync('deuses.json', { encoding: 'utf8' });
    const squad = JSON.parse(god_json);

    // Aqui estamos assumindo que 'members' é um array de objetos
    if (squad.members && squad.members.length <= 2) {
      const segundoMembro = squad.members[0];
      res.json(segundoMembro);
    } else {
      res.status(404).json({ mensagem: 'Segundo membro não encontrado' });
    }
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://127.0.0.1:${port}`);
});
