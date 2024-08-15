const mongoose = require( 'mongoose' )

const todoSchema = new mongoose.Schema ( {
    title: {
        type: String,
        required: [ true, 'titel er påkrøvet' ]
        
    },
    description: {
        type: String,
        required: [ true, 'beksrivelse er påkrævet' ]
    },

    image: {
        type: String
    }
} )

module.exports = mongoose.model( 'Todo', todoSchema, 'todos')