import cors from "cors";
import express from "express";

import router from "./routers";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

// init router
app.use("/", router);
app.all("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.on("error", (error) => {
  console.error("Error:", error);
});

app.listen(port, () => console.log("Server is running on port", port));
