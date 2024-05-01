const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./Repositories/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <div> 
      <form method="POST"> 
        <input name="email" placeholder ="email" />
        <input name="password" placeholder ="password" />
        <input name="passwordConfirmation" placeholder ="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("Email in use");
  }

  if (password !== passwordConfirmation) {
    console.log(req.body);
    console.log(password, passwordConfirmation);
    return res.send("Passwords must match");
  }

  // Create a user in our user repo to reporesent this person
  const user = await usersRepo.create({ email, password });
  // Store the id of that user inside the users cookie

  res.send("Account Created!!");
});

app.listen(3000, () => {
  console.log("Listening");
});
