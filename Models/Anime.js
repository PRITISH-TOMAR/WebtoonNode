const { model, Schema } = require('mongoose');

const AnimeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    characters: {
        type: Map,
        of: Boolean, 
        required: true,
        set: function(chars) {
            const charSet = {};
            chars.forEach(char => charSet[char] = true); // Each character is stored as a key with 'true' as value
            return charSet;
        }
    },
    coverImage: {
        type: String,
        default: './public/images/avatar.png'
    }
}, { timestamps: true });

// Create the Anime model
const Anime = model('Anime', AnimeSchema);
module.exports = { Anime };
