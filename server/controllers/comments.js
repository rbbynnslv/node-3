function create(req, res) {
    const db = req.app.get('db');
  
    const { userId, postId, comment } = req.body;
  
    db.comments
    .insert(
        {
        userId,
        postId,
        comment
        },
    )
    .then(user => res.status(201).json(user))
    .catch(err => {
        console.error(err);
  });
  }

  function editComment(req, res) {
    const db = req.app.get('db');

    const { comment } = req.body;

    db.comments
        .update({
            id: req.params.id,
            userId: req.params.userId
        }, {
            comment: comment,
        })
        .then(user => res.status(201).json(user))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });

}


module.exports = {
    create, 
    editComment,
};
