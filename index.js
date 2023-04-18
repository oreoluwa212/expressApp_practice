const express = require('express');

const app = express();

const uuid = require('uuid');

const path = require('path');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log("App is running on port" + PORT);
});

const logger = require('./middleware/logger');
//init middleware
// app.use(logger);


const membersRoute = require('./routes/members');

const members = require('./routes/members');

//Get all members
app.get('/api/members', (req, res) => {
   res.json(membersRoute);
});

//Get a single member
app.delete("/api/members/:id", (req, res) => {
  // res.send(req.params.id);
  const found = members.some((member) => member.id == req.params.id);
  if (!found) {
    res
      .status(404)
      .json({ message: `No member with the id of ${req.params.id}` });
  } else {
    res.json({
      msg: "Member deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
}});


//delete a single member
app.delete("/api/members/:id", (req, res) => {
  // res.send(req.params.id);
  const found = members.some((member) => member.id == req.params.id);
  if (!found) {
    res
      .status(404)
      .json({ message: `No member with the id of ${req.params.id}` });
  } else {
    res.json(members.filter((member) => member.id == req.params.id));
  }
});




//Update Member
// app.put('/api/members/:id', (req, res) => {
//   const found = members.some(member => member.id == req.params.id);
//   if (!found) {
//     res.status(400).json({ message: `No member with the id of ${req.params.id}`});
//   }else{
//     const updateMember = req.body;
//     members.forEach(member => {
//       if (member.id == req.params.id){
//         member.names = updateMember.names? updateMember.names : member.names;
//         member.email = updateMember.email? updateMember.email : member.email;

//         res.json({message: 'Updated member', member})
//       }
//     })
//   }
// })


//Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Create Member
app.post('/api/members', (req, res) => {
  // res.send(req.body);
  const newMember = {
    id: uuid.v4(),
    names: req.body.names,
    email: req.body.email,
    status_: req.body.status_
  }
  if(!newMember.names || !newMember.email){
    return res.status(400).json({ message: "Please include a name and an email"})
  }
  members.push(newMember);
  res.json(members)
});

// app.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

//OR

//set static folder
app.use(express.static(path.join(__dirname, 'public')));