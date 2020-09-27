const chai = require('chai');
const chaiHttp = require('chai-http');
const { typeDefs, resolvers } = require('../schema');
const { server } = require('../main');
const testUrl = 'http://localhost:4000/graphql';
const expect = chai.expect;
chai.use(chaiHttp);
/*
server.listen().then(({ url }) => {
 console.log(`Test server has started on ${url}`);
});
*/
describe('Starting test server', () => {
before(() => {
    try {
    server.listen().then(({ url }) => {
        console.log(`Test server has started on ${url}`);
    });
    }
    catch(error) {
        console.log(error);
    }
});
}
);

console.log('Running tests');

describe('Calling getCount method', () =>{
    it('getCount call should return status 200', async () => {
        let res = await chai 
            .request(testUrl)
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .send({ query: 'query { getCount }' })
        expect(res.status).to.equal(200);
    });

    it('getCount method should return a number', async () => {
        let res = await chai 
            .request(testUrl)
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .send({ query: '{ getCount }' })
        expect(res.body.data.getCount).to.be.a('number')
    });
});




describe('Calling Photos method', () =>{
    it('Photos call should return status 200', async () => {
        let res = await chai 
            .request(testUrl)
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .send({ query: 'query { Photos { id, albumId, title, url, thumbnailUrl } }' })
        expect(res.status).to.equal(200);
    });

    it('Photos call should return an array', async () => {
        let res = await chai 
            .request(testUrl)
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .send({ query: 'query { Photos { id, albumId, title, url, thumbnailUrl } }' })
        expect(res.body.data.Photos).to.be.a('array');
    });

});

describe('Calling getPhotos query', () =>{
    it('getPhotos call should return status 200', async () => {
        let res = await chai 
            .request(testUrl)
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .send({ query: 'query { getPhotos { id, albumId, title, url, thumbnailUrl } }' })
        expect(res.status).to.equal(200);
    });

    it('Photo object should have id, albumId, title, url and thumbnailUrl properties', async () => {
        let res = await chai 
            .request(testUrl)
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .send({ query: '{ getPhotos(id: "1") { id, albumId, title, url, thumbnailUrl } }' })
        expect(res.body.data.getPhotos[0]).to.have.property('id')
        expect(res.body.data.getPhotos[0]).to.have.property('albumId')
        expect(res.body.data.getPhotos[0]).to.have.property('title')
        expect(res.body.data.getPhotos[0]).to.have.property('url')
        expect(res.body.data.getPhotos[0]).to.have.property('thumbnailUrl')

    });
});

after(() => {
    console.log('Tests completed. Stopping test server.');
    try {
        server.stop();
        console.log('Successfully stopped test server.');
    }
    catch(error) {
        console.log(error);
    }
});