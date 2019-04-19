const db = require('./dbConfig');

module.exports = {
	getAll,
	insert,
	getById
};

function getAll() {
	return db('games');
}

async function insert(game) {
	const [ id ] = await db('games').insert(game);
	return await db('games').where({ id }).first();
}

// stretch
async function getById(id) {
	return db('games').where({ id: id }).first();
}