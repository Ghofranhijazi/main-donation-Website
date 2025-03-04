
// require("dotenv").config();

// const express = require("express");
// const cookieParser = require("cookie-parser");
// const { sequelize } = require("./utils/database");
// const cors = require("cors");
// const authRoute = require("./routes/auth");
// const path = require("path"); 

// const routeRequests = require("./routes/routeRequests");

// const detailsRoutes=require("./routes/details")
// const userRoutes = require("./routes/userRoutes");

// const app = express();

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: (_, callback) => {
//       callback(null, true);
//     },
//     credentials: true,
//   })
// );


// sequelize
// .sync()
//   .then(() => console.log("Database synced"))
//   .catch((err) => console.log("Error syncing database:", err));

// app.use("/auth", authRoute);
// app.use("/api/requests", routeRequests);
// app.use("/api/users", userRoutes); 
// app.use("/api/details", detailsRoutes);


// const PORT = 5000;
// app.listen(PORT, async () => {
//   console.log(`App is listening on port ${PORT}`);

// });


require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./utils/database");
const cors = require("cors");
const authRoute = require("./routes/auth");
const path = require("path"); 

const routeRequests = require("./routes/routeRequests");
const detailsRoutes = require("./routes/details");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");  // Import payment routes

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: (_, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);

// Sync database
sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log("Error syncing database:", err));

// Use routes
app.use("/auth", authRoute);
app.use("/api/requests", routeRequests);
app.use("/api/users", userRoutes);
app.use("/api/details", detailsRoutes);
app.use("/api/payment", paymentRoutes);  // Add the payment route

const PORT = 5000;
app.listen(PORT, async () => {
  console.log(`App is listening on port ${PORT}`);
});
