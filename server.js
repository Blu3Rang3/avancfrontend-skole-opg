const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
const textSnippetRoutes = require('./routes/textSnippet.routes');

//----- DB mongo og mongoose
//------------------------------------------------------------
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));

const db = mongoose.connection;
db.on('error', (error) => console.log("FEJL: " + error));
db.once('open', () => console.log("I SEE THE LIGHT!!!!!!!"));

//-------APP
//----------------------------
app.use(express.json()); // Correctly parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Correctly parse URL-encoded bodies


// Static files (e.g., images) are served from the 'public' folder
app.use(express.static('public/images'));

//---------- GET serverens endpoint: http://localhost:5000
app.get('/', async (req, res) => {
    console.log("GET serverens endpoint");
    res.status(200).json({
        message: "Velkommen til serverens start-endpoint!"
    });
});

app.use('/images', express.static('public/images'));


// ROUTES
app.use('/todos', require('./routes/todos.routes'));
app.use('/images', require('./routes/image.routes'));
app.use('/text-snippets', require('./routes/textSnippet.routes'));

// NO MATCH
//----------------------------------
app.get('*', async (req, res) => {
    res.status(404).json({
        message: 'siden findes ikke'
    });
});

//-------LISTEN opstart server
app.listen(PORT, () =>
    console.log("------> Serveren er startet op nu på port: " + PORT)
);
