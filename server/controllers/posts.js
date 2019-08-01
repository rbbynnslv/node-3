function create(req, res) {
    const db = req.app.get('db');
  
    const { userId, content } = req.body;
  
    db.posts
    .insert(
        {
        userId,
        content,
        },
    )
    .then(user => res.status(201).json(user))
    .catch(err => {
        console.error(err);
  });
  }

function getById(req, res) {
    const db = req.app.get('db');
    const comment = [];

    if (req.query.comments === "" || req.query.comments === "all") {
      db.posts
        .find({
          id: req.params.id
        })
        .then(post => {
          postComment.push(post);
          const idPost = post[0].id;
          db.comments
            .find({
              postId: idPost
            })
            .then(com => {
              comment.push(com);
              res.status(200).json(comment);
            });
        })
        .catch(err=>{
            console.error(err)
            res.status(500).end()
        })
    } else {
      db.posts
        .findOne(req.params.id)
        .then(user => res.status(200).json(user))
        .catch(err => {
          console.error(err);
          res.status(500).end();
        });
    }
}

function getPost(req, res) {
    const db = req.app.get('db');
  
    db.posts
      .find({
        userId: req.params.id,
      })
      .then(user => res.status(200).json(user))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  }

function updatePost(req, res) {
    const db = req.app.get('db');

    const { content } = req.body;
    db.posts
        .update({
            id: req.params.id,
        }, {
            content: content,
        })
        .then(user => res.status(201).json(user))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });

}

module.exports = {
    create, 
    getById, 
    getPost, 
    updatePost,
  };
