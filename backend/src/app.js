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
const authRoutes = require('./routes/authRoute');
const postRoutes = require('./routes/postRoute');
const likeRoutes = require('./routes/likeRoute');
const commentRoutes = require('./routes/commentRoute');
const followRoutes = require('./routes/followRoute');
const searchRoutes = require('./routes/searchRoute');
const notificationRoutes = require('./routes/notificationRoute');
const messageRoutes = require('./routes/messageRoute');

// endpoints
app.use('/api/user', userRoutes);
app.use("/api/auth", authRoutes);
app.use(postRoutes);
app.use(likeRoutes);
app.use(commentRoutes);
app.use(followRoutes);
app.use(searchRoutes);
app.use(notificationRoutes);
app.use(messageRoutes);

// apenas teste
app.get('/', (req, res) => {
    res.send('Rodando a API da Rede Social Pet!');
});

module.exports = app;
