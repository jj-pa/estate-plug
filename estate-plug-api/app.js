const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:5000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// db connection
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to estate-plug application." });
});

// route (monthly price)
require("./app/routes/monthly_price/apart_trade_monthly_price.routes")(app);
require("./app/routes/monthly_price/apart_contract_monthly_price.routes")(app);
require("./app/routes/monthly_price/detached_trade_monthly_price.routes")(app);
require("./app/routes/monthly_price/detached_contract_monthly_price.routes")(app);
require("./app/routes/monthly_price/land_trade_monthly_price.routes")(app);
require("./app/routes/monthly_price/multi_housing_trade_monthly_price.routes")(app);
require("./app/routes/monthly_price/multi_housing_contract_monthly_price.routes")(app);
require("./app/routes/monthly_price/officetel_trade_monthly_price.routes")(app);
require("./app/routes/monthly_price/officetel_contract_monthly_price.routes")(app);

// route (monthly increase)
require("./app/routes/monthly_increase/apart_trade_monthly_increase.routes")(app);
require("./app/routes/monthly_increase/apart_contract_monthly_increase.routes")(app);
require("./app/routes/monthly_increase/detached_trade_monthly_increase.routes")(app);
require("./app/routes/monthly_increase/detached_contract_monthly_increase.routes")(app);
require("./app/routes/monthly_increase/land_trade_monthly_increase.routes")(app);
require("./app/routes/monthly_increase/multi_housing_trade_monthly_increase.routes")(app);
require("./app/routes/monthly_increase/multi_housing_contract_monthly_increase.routes")(app);
require("./app/routes/monthly_increase/officetel_trade_monthly_increase.routes")(app);
require("./app/routes/monthly_increase/officetel_contract_monthly_increase.routes")(app);

// route (yearly increase)
require("./app/routes/yearly_increase/apart_trade_yearly_increase.routes")(app);
require("./app/routes/yearly_increase/apart_contract_yearly_increase.routes")(app);
require("./app/routes/yearly_increase/detached_trade_yearly_increase.routes")(app);
require("./app/routes/yearly_increase/detached_contract_yearly_increase.routes")(app);
require("./app/routes/yearly_increase/land_trade_yearly_increase.routes")(app);
require("./app/routes/yearly_increase/multi_housing_trade_yearly_increase.routes")(app);
require("./app/routes/yearly_increase/multi_housing_contract_yearly_increase.routes")(app);
require("./app/routes/yearly_increase/officetel_trade_yearly_increase.routes")(app);
require("./app/routes/yearly_increase/officetel_contract_yearly_increase.routes")(app);

// route (yearly percentage)
require("./app/routes/yearly_percentage/apart_trade_yearly_percentage.routes")(app);
require("./app/routes/yearly_percentage/apart_contract_yearly_percentage.routes")(app);
require("./app/routes/yearly_percentage/detached_trade_yearly_percentage.routes")(app);
require("./app/routes/yearly_percentage/detached_contract_yearly_percentage.routes")(app);
require("./app/routes/yearly_percentage/land_trade_yearly_percentage.routes")(app);
require("./app/routes/yearly_percentage/multi_housing_trade_yearly_percentage.routes")(app);
require("./app/routes/yearly_percentage/multi_housing_contract_yearly_percentage.routes")(app);
require("./app/routes/yearly_percentage/officetel_trade_yearly_percentage.routes")(app);
require("./app/routes/yearly_percentage/officetel_contract_yearly_percentage.routes")(app);

// route (etc)
require("./app/routes/apart_trade_compare_count.routes")(app);
require("./app/routes/apart_trade_guro_indecrease.routes")(app);
require("./app/routes/apart_trade_gwanak_indecrease.routes")(app);
require("./app/routes/apart_trade_jongno_indecrease.routes")(app);
require("./app/routes/apart_trade_kangdong_indecrease.routes")(app);
require("./app/routes/apart_trade_kangnam_indecrease.routes")(app);
require("./app/routes/apart_trade_targetarea_increase.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
