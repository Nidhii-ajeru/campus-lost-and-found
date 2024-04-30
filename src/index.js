const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const FoundItem = require('./mongodb'); 
const collection = require("./config");
const LostItem = require('./mongodb1'); 
const multer = require('multer');


//Storage and filename setting
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage });




app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));






app.get("/", (req, res) => {
  res.render("home");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email_r, password_r } = req.body;

    // Ensure password_r is not empty and is a string
    if (!password_r || typeof password_r !== 'string') {
      res.locals.errorMessage = "Invalid email or password";
      res.status(401).render("login");
    }

    // Hashing the password before saving
    const hashedPassword = await bcrypt.hash(password_r, 10);

    // Creating a new user using the Mongoose model
    const newUser = new collection({
      username: username,
      email: email_r,
      password: hashedPassword,
    });

    // Saving the user to the database
    await newUser.save();

    res.render("rules");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).alert("Error saving user");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Log the received email for debugging
    console.log("Received email:", email);

    // Implement authentication logic here, check if the user exists in the database
    // You will need to fetch the user from the database and compare passwords

    // For example:
    const user = await collection.findOne({ email: email.toLowerCase() });

    // Log the user data for debugging
    console.log("User data from the database:", user);

    if (!user) {
      res.locals.errorMessage = "Invalid email or password";
res.status(401).render("login");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.locals.errorMessage = "Invalid email or password";
      res.status(401).render("login");
    }

    // Authentication successful, you can redirect or send a success response
    res.render("rules"); // Change "/dashboard" to your desired route
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500);
  }
})

//found code
app.get("/found-items", async(req, res) => {
  try{
    const foundItems = await FoundItem.find({});
    res.render('found-items', { foundItems: foundItems });
  }
  catch (error) {
    console.error('Error fetching found items:', error);
    res.status(500).send('Error fetching found items');
  }

   // Update with the appropriate EJS file for found-items
});



app.get("/found", (req, res) => {
  // Implement logic to render the page for adding new found items
  res.render("found"); // Update with the appropriate EJS file for adding new found items
});

app.post('/found-items', upload.single('image'), async (req, res) => {
  try {
    const { filename } = req.file;  // Correctly accessing the uploaded file
    const { object, foundDate, description, contact } = req.body;
    const newFoundItem = new FoundItem({
      image: filename,
      object: object,
      foundDate: foundDate,
      description: description,
      contact: contact,
    });
    await newFoundItem.save();
    console.log('Found item saved successfully!');
    res.redirect('/found-items'); // Update with the appropriate route
  } catch (error) {
    console.error('Error saving found item:', error);
    res.status(500).send('Error saving found item');
  }
});

//lost

app.get("/lost-items", async(req, res) => {
  try{
    const lostItems = await LostItem.find({});
    res.render('lost-items', { lostItems: lostItems });
  }
  catch (error) {
    console.error('Error fetching found items:', error);
    res.status(500).send('Error fetching lost items');
  }

   // Update with the appropriate EJS file for found-items
});

app.get("/lost", (req, res) => {
  // Implement logic to render the page for adding new found items
  res.render("lost"); // Update with the appropriate EJS file for adding new found items
});


app.post('/lost-items', upload.single('image'), async (req, res) => {
  try {
    const { filename } = req.file;  // Correctly accessing the uploaded file
    const { object, lostDate, description, contact, reward } = req.body;
    const newLostItem = new LostItem({
      image: filename,
      object: object,
      lostDate: lostDate,
      description: description,
      contact: contact,
      reward: reward
    });

    await newLostItem.save();
    console.log('Lost item saved successfully!');
    res.redirect('/lost-items');
  } catch (error) {
    console.error('Error saving lost item:', error);
    res.status(500).send('Error saving lost item');
  }
});







app.get("/home", (req, res) => {
  // Implement logic to render the page for adding new found items
  res.render("home"); // Update with the appropriate EJS file for adding new found items
});
app.get("/home2", (req, res) => {
  // Implement logic to render the page for adding new found items
  res.render("home2"); // Update with the appropriate EJS file for adding new found items
});

app.get("/aboutus", (req, res) => {
  // Implement logic to render the page for adding new found items
  res.render("aboutus"); // Update with the appropriate EJS file for adding new found items
});
app.get("/aboutus2", (req, res) => {
  // Implement logic to render the page for adding new found items
  res.render("aboutus2"); // Update with the appropriate EJS file for adding new found items
});

app.get("/contact", (req, res) => {
  // Implement logic to render the page for adding new found items
  res.render("contact"); // Update with the appropriate EJS file for adding new found items
});
app.get("/contact2", (req, res) => {
  // Implement logic to render the page for adding new found items
  res.render("contact2"); // Update with the appropriate EJS file for adding new found items
});

app.get("/forgot", (req, res) => {
  // Implement logic to render the page for adding new found items
  res.render("forgot"); // Update with the appropriate EJS file for adding new found items
});
app.get("/rules", (req, res) => {
  // Implement logic to render the page for adding new found items
  res.render("rules"); // Update with the appropriate EJS file for adding new found items
});

app.get("/home1", (req, res) => {
  // Implement logic to render the page for adding new found items
  res.render("home1"); // Update with the appropriate EJS file for adding new found items
});



app.get("/lost", (req, res) => {
  // Implement logic to render the page for adding new found items
  res.render("lost"); // Update with the appropriate EJS file for adding new found items
});





const port = 5000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
