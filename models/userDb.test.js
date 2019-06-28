const db = require('../data/dbConfig.js');
const userDb = require('./userDb.js');

describe('users model post', () => {
        beforeEach(async () => {
            await db('posts')
            .truncate();
        });
    describe('insert()', () => {
        it('should insert post', async () => {
            await userDb.insert({
                stylists_id: 1,
                title: 'silver',
                posts_image: 'string',
                description: 'this is a post'
                }); 
            const post = await db('posts')            
            expect(post).toHaveLength(1);
        });
    });
});
