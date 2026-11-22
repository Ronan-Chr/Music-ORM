const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();

// Initialize database connection
const db = new Sequelize({
    dialect: 'sqlite',
    storage: `database/${process.env.DB_NAME || 'music_library.db'}`,
    logging: console.log
});

// Define Track model
const Track = db.define('Track', {
    // trackId (primary key, auto-increment)
    trackId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // songTitle (string, required)
    songTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // artistName (string, required)
    artistName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // albumName (string, required)
    albumName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // genre (string, required)
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // duration (integer, in seconds)
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // releaseYear (integer)
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Create the database and tables
async function setupDatabase() {
    try {
        await db.authenticate();
        console.log('Connection to database established successfully.');

        await db.sync({ force: true });
        console.log('Database file created at:', `database/${process.env.DB_NAME}`);

        await db.close();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Run setup if this file is executed directly
if (require.main === module) {
    setupDatabase();
}

// Export the model and the connection to use in other files
module.exports = { db, Track };
