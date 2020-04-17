const express = require('express');

const router = express.Router();

const db = require('./userDb');
const db2 = require('../posts/postDb');

router.post('/', validateUser(), (req, res) => {
  // do your magic!
    db.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })  // end of then
      .catch(error => {
        console.log(error)
        res.status(500).json({message:"Unknown error !"})
        })
});  

router.post('/:id/posts', validatePost(), validateUserId(), (req, res) => {
  // do your magic!
  const postData ={ ...req.body, user_id: req.params.id}
  db2.insert(postData)
    .then(post => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      req.status(500).json({ message: "An unknown error occurred !" });
  })
});

router.get('/', (req, res) => {
  // do your magic!
    db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => console.log(error))
});

router.get('/:id', validateUserId(), (req, res, next) => {
  // do your magic!
  res.status(200).json(req.user);

});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
 
        db.getUserPosts(req.params.id)
          .then(post => {
            if (!post) {
              res.status(400).json({ message: "Cannot find post" });
            } else {
              res.status(200).json(post);
          }
        })
      
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "An unknown error occurred !"})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!

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

function validateUserId() {
  // do your magic!
  return (req, res, next) => {

    db.getById(req.params.id)
      .then(user => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(400).json({ message: "User not found !" });
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ message: "An unknown error occurred" })
      })
  }

};

function validateUser(req, res, next) {
  // do your magic!
  return (req, res, next) => {
       if (!req.body.name) {
        return res.status(400).json({ message: "Missing user data !" });
      } 
        next();

  }
};
function validatePost() {
  return (req, res, next) => {
    if (!req.body.text) {
    return res.status(404).json({ message: "Missing required text field !" }); 
    }
    next();
  }
}

// function validatePost() {
//   // do your magic!
//   return (req, res, next) => {
//     if (req.body) {
//       if (req.body.text) {
//         next();
//       } else {
//         res.status(404).json({ message: "Missing required text field !" });
//       }
//     } else {
//       res.status(404).json({ message: "Missing post data !" })
//     }
//   }
//   };
module.exports = router;
 