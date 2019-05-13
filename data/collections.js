const dbConnection = require("./connection");

// Get Mongo collections, based on Professor's lecture code
const getCollectionFn = collection => {
    let _col = undefined;

    return async () => {
        if (!_col) {
            const db = await dbConnection();
            _col = await db.collection(collection);
        }
        return _col; 
    }
};

// Export collections
module.exports = {
    drinks: getCollectionFn("drinks"),
    users: getCollectionFn("users")
};