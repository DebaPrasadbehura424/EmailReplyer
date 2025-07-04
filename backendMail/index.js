const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("../backendMail/server/route/userRouters");

app.use(express.json());
app.use(
  cors({
    origin: "https://email-replyer-frontend.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
    ],
  })
);

app.use("/api/email", userRouter);

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.listen(5757, () => {
  console.log("Server started on port http://localhost:5757");
});
