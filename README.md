# Test GraphQL Apollo Server on Node.js 

Test graphql server with unit tests.

## Deployment

Initialize npm and install dependencies in your project directory:
```
npm init
npm install chai chai-http mocha apollo-server node-fetch
```

## Running tests
Initialize tests in  package.json:
```
"scripts": {
    "test": "mocha tests/test.js"
  }
```

Run tests: \
`npm test`

## Query types
- `Photos` - get array of photo objects. \
- `getPhotos` - query photos array with filters. Filters available: \
  * `albumId: string` - get photos by albumId. \
  * `id: [string]` - get photos by photo ids. 

## Query example
```
query {
  getPhotos(albumId: "2") {
    id,
    albumId,
    title,
    url,
    thumbnail
  }
}
```

## Query specific properties
```
query {
  getPhotos(albumId: "2") {
    id,
    url
  }
 ```

## Getting all photos
```
Photos {
  id,
  albumId,
  title,
  url,
  thumbnailUrl
}
```
