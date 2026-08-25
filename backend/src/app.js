const express = require('express');
const cors = require('cors');

const app = express();

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());


// habilita CORS para o frontend em http://localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // Permite requisições do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
}));

// rotas
const userRoutes = require('./routes/userRoute');
const animalRoutes = require('./routes/animalRoute');
const adoptionRoutes = require('./routes/adoptionRoute');
const favoriteRoutes = require('./routes/favoriteRoute');
const authRoutes = require('./routes/authRoute');
const postRoutes = require('./routes/postRoute');

// endpoints
app.use('/api/user', userRoutes);
app.use('/api/animal', animalRoutes);
app.use('/api', adoptionRoutes);
app.use(favoriteRoutes);
app.use("/api/auth", authRoutes);
app.use(postRoutes);

// apenas teste
app.get('/', (req, res) => {
    res.send('Rodando a API da ONG!');
});

module.exports = app;
