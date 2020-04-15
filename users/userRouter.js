const express = require('express');

const router = express.Router();

const db = require('./userDb');

router.post('/', (req, res) => {
  // do your magic!
  if (!req.body.name) {
    res.status(400).json({message: "please provide a name"});
  } else {
    db.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })  // end of then
      .catch(error => {
        console.log(error)
        res.status(500).json({message:"Unknown error !"})
        });
  }
});  

router.post('/:id/posts', (req, res) => {
  // do your magic!
  

});

router.get('/', (req, res) => {
  // do your magic!
    db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => console.log(error))
});

router.get('/:id', (req, res) => {
  // do your magic!
  const userId = req.params.id;
  db.getById(userId)
    .then(user => {
      if (!user) {
        res.status(400).json({ message: "User not found in our database" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "An unknown error occurred" })
    })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  db.getById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(400).json({message: "cannot find that specific user"})
      } else {
        db.getUserPosts(req.params.id)
          .then(post => {
            if (!post) {
              res.status(400).json({ message: "Cannot find post" });
            } else {
              res.status(200).json(post);
          }
        })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "An unknown error occurred !"})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const usr = db.getById(req.params.id);
  db.remove(req.params.id)
    .then(user => {
      if (!user) {
        res.status(400).json({message: "Cannot find user to delete !"})
      } else {
        res.json(`Success !`);
      }
    }
    )
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "An unknown error has occurred !"})
    }

    )
});

router.put('/:id', (req, res) => {
  // do your magic!
  db.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json({message: "Data has been updated"})
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

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
