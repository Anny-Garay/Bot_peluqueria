const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const port = 3000;

app.use(express.json()); //Esto es para procesar Json
app.use(express.static('public')); //Esto es para servir los archivos html, css, js que este en la carpeta public
app.use(cors());

//Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('¡Bienvenida al bot_peluqueria! 💇‍♀️✨');
});

//Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db.json'));
    res.json(data.usuarios);
});

//Crear un nuevo usuario
app.post('/usuarios', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db.json'));
    const nuevosUsuarios = data.usuarios;
    const nuevoUsuario = { id: Date.now(), ...req.body };
    nuevosClientes.push(nuevoUsuario);
    fs.writeFileSync('db.json', JSON.stringify({ usuarios: nuevosUsuarios }, null, 2));
    res.send('Usuario agregado');
});

//Actualizar un cliente por ID
app.put('/clientes/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db.json'));
    const clientes = data.clientes.map(c => {
        if (c.id == req.params.id) {
            return { ...c, ...req.body };
        }
        return c;
    });
    fs.writeFileSync('db.json', JSON.stringify({ clientes }, null, 2));
    res.send('Cliente actualizado');
});

//Eliminar un cliente por ID
app.delete('/clientes/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db.json'));
    const clientesFiltrados = data.clientes.filter(c => c.id != req.params.id);
    fs.writeFileSync('db.json', JSON.stringify({ clientes: clientesFiltrados }, null, 2));
    res.send('Cliente eliminado');
});



app.listen(port, () => {
    console.log(`Bot_peluqueria corriendo en http://localhost:${port}`);
});
