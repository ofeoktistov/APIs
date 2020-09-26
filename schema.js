const { gql } = require('apollo-server');
const fetch = require('node-fetch');
const photosUrl = 'https://jsonplaceholder.typicode.com/photos';
const typeDefs = gql`
    type Photo {
        albumId: Int
        id: Int
        title: String
        url: String
        thumbnailUrl: String
    }

    type Query {
        getPhotos(albumId: String, id: [String]): [Photo],
        getCount: Int
    }
`;

const resolvers = {
    Query: {
        getPhotos: async (parent, args, context, info) => {
            try {
                let response = await fetch(photosUrl);
                if (response.ok) {
                    let jsonResponse = await response.json();
                    if (args.albumId) {
                        let albumId = parseInt(args.albumId, 32);
                        let getByAlbumId = jsonResponse.filter(photo => photo.albumId === albumId);
                        return getByAlbumId;
                    }
                    else if (args.id) {   
                        let idArray = args.id.map(x => {
                            return parseInt(x, 32);
                        });
                        let filteredByIds = jsonResponse.filter(photo => {
                            return idArray.includes(photo.id);
                        });
                        return filteredByIds;
                    }
                    
                    }
                    else {
                        return jsonResponse;
                    }
                }

            catch(error) {
                console.log(error);
            }
        },

        getCount: async() => {
            try {
                let response = await fetch(photosUrl);
                if (response.ok) {
                    let jsonResponse = await response.json();
                    return jsonResponse.length;
            }
        }
            catch(error) {
                console.log(error);
            }
        }

    }
}
        
exports.typeDefs = typeDefs;
exports.resolvers = resolvers;