const express = require('express')
const massive = require('massive')

const users = require('./controllers/users.js')
const posts = require('./controllers/posts');
const comments = require('./controllers/comments');

massive({
    host: 'localhost',
    port: 5432,
    database: 'node3',
    user: 'postgres',
    password: 'node3db',
}).then(db => {
    const app = express();

    app.set('db', db);

    app.use(express.json());

    app.post('api/users', users.create);
    app.get('api/users', users.list);
    app.get('api/users/:id', users.getById);
    app.get('api/users/:id/profile', users.getProfile);

    app.post('/api/posts', posts.create);
    app.get('/api/posts/:id', posts.getById);
    app.get('/api/posts/:id/posts', posts.getPost)
    app.patch('/api/posts/:id/update' , posts.updatePost)

    app.post('/api/comments/', comments.create)
    app.patch('/api/:id/:userId/comments', comments.editComment)

    const port = 1800;
    app.listen(port, () => {
        console.log(`Server listening on port: ${port}`);
    })
})
    .catch (console.error);
