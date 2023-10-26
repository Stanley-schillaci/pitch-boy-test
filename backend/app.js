const express = require('express');
const fs = require('fs');

const port = 3000;

const app = express();

app.use(express.json());

const jsonData = require('./resources/laposte_hexasmal.json');

// Route pour accéder à la liste complète
app.get('/villes', (req, res) => {
  res.json(jsonData);
});

// Route pour accéder à un code postal précis
app.get('/villes/:codePostal', (req, res) => {
    const codePostal = req.params.codePostal;
    const ville = jsonData.find((entry) => entry.fields.code_postal === codePostal);
  
    if (ville)
      res.json(ville);
    else
      res.status(404).json({ message: 'Code postal non trouvé' });
  });

// Route pour modifier une entrée via le code postal
app.put('/villes/:codePostal', (req, res) => {
    const codePostal = req.params.codePostal;
    const updatedData = req.body;
    const index = jsonData.findIndex((entry) => entry.fields.code_postal === codePostal);
  
    if (index !== -1)
    {
      jsonData[index] = {
        ...jsonData[index],
        ...updatedData,
      };
  
      fs.writeFileSync('./resources/laposte_hexasmal.json', JSON.stringify(jsonData, null, 2));
  
      res.json({ message: 'Données mises à jour avec succès' });
    }
    else
      res.status(404).json({ message: 'Code postal non trouvé' });
  });

// Route pour supprimer une entrée via le code postal
app.delete('/villes/:codePostal', (req, res) => {
    const codePostal = req.params.codePostal;
    const index = jsonData.findIndex((entry) => entry.fields.code_postal === codePostal);
  
    if (index !== -1)
    {
        jsonData.splice(index, 1);
        fs.writeFileSync('./resources/laposte_hexasmal.json', JSON.stringify(jsonData, null, 2));
    
        res.json({ message: 'Données supprimées avec succès' });
    } 
    else 
      res.status(404).json({ message: 'Code postal non trouvé' });
  });

app.listen(port, () => {
    console.log(`Serveur écoutant sur le port ${port}`);
  });
  

