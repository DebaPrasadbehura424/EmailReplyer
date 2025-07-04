const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("../backendMail/server/route/userRouters");

app.use(express.json());
app.use(cors());

app.use("/api/email", userRouter);

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.listen(5757, () => {
  console.log("Server started on port http://localhost:5757");
});
