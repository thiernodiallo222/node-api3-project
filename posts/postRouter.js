const express = require('express');

const router = express.Router();

const db = require('./postDb');

router.get('/', (req, res) => {
  // do your magic!
  db.get()
    .then(posts => {
      res.status(200).json(posts);
    }).catch(error => {
      res.status(500).json(`An unknown error occurred`);
  })


});

router.get('/:id', (req, res) => {
  // do your magic!
  db.getById(req.params.id)
    .then(post => {
      if (!post) {
       return res.status(400).json({ message: "user not found " });
      }
      res.status(200).json(post);
    })
    .catch(error => {
    res.status(500).json({message: "Unknown error !"})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  db.remove(req.params.id)
    .then(item => {
      if (item) {
        res.status(200).end;
      }
      res.status(400).json({ message: "can't find data" });
    })
    .catch(error => console.log(error));
});

router.put('/:id', (req, res) => {
  // do your magic!
    db.update(req.params.id, req.body)
    .then(post => {
      if (post) {
        res.status(200).json({message: "post has been updated"})
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    }
    )
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "An unknown error occurred !"})
    }
  )

});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  db.getById(req.params.id)
    .then(post => {
      if (!post) {
        res.status(400).json({message: "post was not found !"})
      } else {
        next();
      }
    }).catch(error => console.log(error));
}

module.exports = router;
