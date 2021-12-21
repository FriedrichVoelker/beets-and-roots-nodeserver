const { createClient } = require('redis');

// Get from Database

async function get(key){
	const client = createClient();
	client.on('error', (err) => console.log('Redis Client Error', err));
	await client.connect();

	var res = await client.get(key)

	return res != null ? res : null

}

// Delete from Database

async function del(key){
	const client = createClient();
	client.on('error', (err) => console.log('Redis Client Error', err));
	await client.connect();

	return await client.del(key)
}

// Set to Database

async function set(key, value){
	const client = createClient();
	client.on('error', (err) => console.log('Redis Client Error', err));
	await client.connect();

	return await client.set(key, value)

}


module.exports = {get, set, del} 