const express = require('express');
const router = express.Router();

// Modellen for todo-data
const Todo = require('../models/todos.model'); // Corrected the path here

// Håndter data (i post/put) som multipart formdata (hvis det også inkluderer image filer så brug multer i stedet)
// const formData = require('express-form-data');
// router.use(formData.parse());

//------Multer til upload af images------------------------
//-------------------------------------------------------
const multer = require( 'multer' );
const upload = multer( {

        storage: multer.diskStorage( {
                destination: function ( req, file, cb ) {
                        //hvor multer skal gemme billederne/filler:
                        cb( null, 'public/images' );
                },
                filename: function ( req, file, cb ) {
                        //hvordan multer skal navngive den uploadede fil:
                        //cb(null, Date.now() + '-' + file.originalname)
                        cb(null, Date.now() + '-' + file.originalname);                }
        } )
} );

//-------GET - alt
//-------------------------------------------------
router.get('/', async (req, res) => {
//     res.status(200).json({ data: "GET: her henter vi mange ting" });

        console.log( "GET - hent alle" )

        try {
                let todos = await Todo.find() // find() betyder find alle
                return res.status( 200 ).json( { todos: todos } )
        }       catch ( error ) {
                return res.status( 400 ).json( { todos: null, message: "der er sket en fejl: " + error.message } )
        }

} );

//-------GET - specified
//-------------------------------------------------
router.get('/:id', async (req, res) => {
//     res.status(200).json({ data: "GET: her henter baseret på ID fra DB id: " + req.params.id });
        console.log( "GET - hent udfra ID" )

        try {

                let todo = await Todo.findById( req.params.id )
                return res.status( 200 ).json( {todo: todo } )
        } catch ( error ) {

                return res.status( 400 ).json( { todo: null, message: "der er sket en fejl: " + error.message } )

        }
} );

//-------POST
//-------------------------------------------------
router.post('/', upload.single( "image" ), async (req, res) => {
//     res.status(200).json({ data: "POST: modtag data til oprettelse id DB" });
try {

        let todo = new Todo( req.body )
        todo.image = req.file ? req.file.filename : null
        await todo.save()
        return res.status( 201 ).json( { message: "Ny er oprettet", created: todo } )

} catch ( error ) {
        return res.status( 400 ).json( { message: "der er sket en fejl: " + error.message, created: null } )
}
});

//-------PUT
//-------------------------------------------------
router.put('/:id', upload.single( "image" ), async (req, res ) => {
//     res.status(200).json({ data: "PUT: udfra ID skal modtage data + ID på det som skal rettes i DB ID: " + req.params.id });
        console.log( "PUT - ret udfra ID" )

        try {
                // hvis der er en fil med i reques = tilføj filnavnet (fra multer) til request inden "update"
                if ( req.file ) {
                        req.body.image = req.file.filename;
                }
                let todo = await Todo.findByIdAndUpdate( { _id: req.params.id }, req.body, { new: true } )

                if ( todo === null ) {
                        return res.status( 404 ).json( { message: "objekt kunne ikke findes og rettes", updated: null } )
                }

                return res.status( 201 ).json( { message: "objektet er rettet", updated: todo } )

        } catch ( error ) {
                return res.status( 400 ).json( { message: "der er sket en fejl: " + error.message, updated: null } )
        }
} );

//-------DELETE
//-------------------------------------------------
router.delete('/:id', async (req, res) => { // Corrected to DELETE method instead of GET
//     res.status(200).json({ data: "DELETE udfra ID: skal modtage id på det som skal slettes i DB ID: " + req.params.id });
        console.log( "DELETE - slet udfra ID" )

        try {

                let todo = await Todo.findByIdAndDelete( req.params.id )

                //hvis ingen match til ID findes
                if ( todo == null ) {
                        return res.status( 404 ).json( { deleted: null, message: "Objekt kunne ikke findes og slettes" } )
                }

                return res.status( 201 ).json( { deleted: todo, message: " objekt er slettet" } )
        } catch ( error ) {

                return res.status( 400 ).json( { deleted: null, message: "der er sket en fejl: " + error.message } )
        }

} );

// HUSK !!!!!!!!!!!!!
module.exports = router;
