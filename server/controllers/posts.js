module.exports = {
    create: function (req, res) {
        const db = req.app.get('db');

        const { userId, content } = req.body;

        db.posts
            .insert(
                {
                    content
                },
                {
                    deepInsert: true
                }
            )

            .then(posts => res.status(201).json(posts))
            .catch(err => {
                console.log(err);
            })
    },
    update: function(req, res) {
        const db = req.app.get('db');

    }
}
