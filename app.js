const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const mongoUrl =
  "mongodb+srv://yousef:P102030_@cluster0.fwb8jlr.mongodb.net/?retryWrites=true&w=majority";

const jwt = require("jsonwebtoken");

const jwt_SECRET =
  "lfjshrkgjldkajwlerfuwerh28959234562934jlkjlsdkj09kjefoej()wfwrqfwe";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => console.log(e));

// Define user schema
const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  phone: String,
  password: String,
  userType: String,
  status: String,
});

// Define user model
const User = mongoose.model("UserInfo", userSchema);

app.post("/register", async (req, res) => {
  const { fullname, email, phone, password, userType } = req.body;

  const encryptedpassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    await User.create({
      fullname,
      email,
      phone,
      password: encryptedpassword,
      userType,
      status: "pending", // Set the status to "pending" for new registration requests
    });
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.send({ status: "error", error: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.send({ status: "error", error: "Incorrect password" });
    }

    const token = jwt.sign({ email }, jwt_SECRET);

    res.send({
      status: "ok",
      user: {
        email: user.email,
        userType: user.userType,
        status: user.status,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

app.get("/getalluser", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

app.get("/pending-registrations", async (req, res) => {
  try {
    const pendingRegistrations = await User.find({ status: "pending" });
    res.send({ status: "ok", data: pendingRegistrations });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

app.post("/approve-registration", async (req, res) => {
  const { email, status } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { status },
      { new: true }
    );

    if (!user) {
      return res.send({ status: "error", error: "User not found" });
    }

    res.send({ status: "ok", data: user });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

// Define book schema
const bookSchema = new mongoose.Schema({
  bookName: String,
  ISBN: String,
  title: String,
  author: String,
  rackNumber: Number,
  category: String,
  description: String,
  image: Buffer,
  status: String,
});

// Define book model
const Book = mongoose.model("Book", bookSchema);

app.post("/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.send({ status: "ok", data: newBook });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

app.get("/books", async (req, res) => {
  try {
    const { isbn, rackNumber } = req.query;
    let allBooks;

    if (isbn && rackNumber) {
      allBooks = await Book.find({ ISBN: isbn, rackNumber: rackNumber });
    } else if (isbn) {
      allBooks = await Book.find({ ISBN: isbn });
    } else if (rackNumber) {
      allBooks = await Book.find({ rackNumber: rackNumber });
    } else {
      allBooks = await Book.find({});
    }

    res.send({ status: "ok", data: allBooks });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({ status: "ok", data: updatedBook });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

// Define borrow request schema
const borrowRequestSchema = new mongoose.Schema({
  bookId: String,
  userId: String,
  status: String,
  borrowDate: Date,
  returnDate: Date,
});

// Define borrow request model
const BorrowRequest = mongoose.model("BorrowRequest", borrowRequestSchema);

app.post("/borrow-request", async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    const borrowRequest = new BorrowRequest({
      bookId,
      userId,
      status: "pending",
      borrowDate: new Date(),
    });
    await borrowRequest.save();
    res.send({ status: "ok", data: borrowRequest });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

app.get("/borrow-requests", async (req, res) => {
  try {
    const borrowRequests = await BorrowRequest.find({}).populate("userId");
    res.send({ status: "ok", data: borrowRequests });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

app.put("/borrow-requests/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, returnDate } = req.body;
    const borrowRequest = await BorrowRequest.findByIdAndUpdate(
      id,
      {
        status,
        returnDate,
      },
      {
        new: true,
      }
    );
    res.send({ status: "ok", data: borrowRequest });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});