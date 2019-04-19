const server = require('./server');
const request = require('supertest');
const db = require('./data/dbConfig.js');

describe('server', () => {
	describe('GET / endpoint', () => {
		it('status code 200', () => {
			return request(server).get('/').expect(200);
		});
		it('returns the correct response body', () => {
			const responseBody = JSON.stringify({ api: 'up' });
			return request(server)
				.get('/')
				.expect(responseBody)
				.expect('Content-Length', responseBody.length.toString());
		});
	});

	describe('GET /games endpoint', () => {
		it('status code 200', () => {
			return request(server).get('/games').expect(200);
		});

		it('returns application/json type', async () => {
			const response = await request(server).get('/games');
			expect(response.type).toBe('application/json');
		});

		it('returns current games items', async () => {
			const res = await request(server).get('/games');
			expect(res.body).toHaveLength(0);
		});
	});

	describe('POST /games endpoint', () => {
        beforeEach(async () => {
			await db('games').truncate();
		});
		afterEach(async () => {
			await db('games').truncate();
		});

		const game = {
			title: 'Runescape',
			genre: 'MMORPG',
			releaseYear: '1990'
		};
		it('should insert successfully with status code 201', async () => {
			const response = await request(server).post('/games').send(game);
			expect(response.status).toBe(201);
		});

		it('should insert json object', async () => {
			const response = await request(server).post('/games').send(game);
			expect(response.type).toBe('application/json');
		});

		it('should response with status message of Created', async () => {
			const response = await request(server).post('/games').send(game);
			expect(response.res.statusMessage).toBe('Created');
		});
	});
});
  
