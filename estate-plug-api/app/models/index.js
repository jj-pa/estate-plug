const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

/* monthly price */
db.apart_trade_monthly_price = require("./monthly_price/apart_trade_monthly_price.model.js")(mongoose);
db.apart_contract_monthly_price = require("./monthly_price/apart_contract_monthly_price.model.js")(mongoose);
db.detached_trade_monthly_price = require("./monthly_price/detached_trade_monthly_price.model.js")(mongoose);
db.detached_contract_monthly_price = require("./monthly_price/detached_contract_monthly_price.model.js")(mongoose);
db.land_trade_monthly_price = require("./monthly_price/land_trade_monthly_price.model.js")(mongoose);
db.multi_housing_trade_monthly_price = require("./monthly_price/multi_housing_trade_monthly_price.model.js")(mongoose);
db.multi_housing_contract_monthly_price = require("./monthly_price/multi_housing_contract_monthly_price.model.js")(mongoose);
db.officetel_trade_monthly_price = require("./monthly_price/officetel_trade_monthly_price.model.js")(mongoose);
db.officetel_contract_monthly_price = require("./monthly_price/officetel_contract_monthly_price.model.js")(mongoose);

/* monthly increase */
db.apart_trade_monthly_increase = require("./monthly_increase/apart_trade_monthly_increase.model.js")(mongoose);
db.apart_contract_monthly_increase = require("./monthly_increase/apart_contract_monthly_increase.model.js")(mongoose);
db.detached_trade_monthly_increase = require("./monthly_increase/detached_trade_monthly_increase.model.js")(mongoose);
db.detached_contract_monthly_increase = require("./monthly_increase/detached_contract_monthly_increase.model.js")(mongoose);
db.land_trade_monthly_increase = require("./monthly_increase/land_trade_monthly_increase.model.js")(mongoose);
db.multi_housing_trade_monthly_increase = require("./monthly_increase/multi_housing_trade_monthly_increase.model.js")(mongoose);
db.multi_housing_contract_monthly_increase = require("./monthly_increase/multi_housing_contract_monthly_increase.model.js")(mongoose);
db.officetel_trade_monthly_increase = require("./monthly_increase/officetel_trade_monthly_increase.model.js")(mongoose);
db.officetel_contract_monthly_increase = require("./monthly_increase/officetel_contract_monthly_increase.model.js")(mongoose);

/* yearly increase */
db.apart_trade_yearly_increase = require("./yearly_increase/apart_trade_yearly_increase.model.js")(mongoose);
db.apart_contract_yearly_increase = require("./yearly_increase/apart_contract_yearly_increase.model.js")(mongoose);
db.detached_trade_yearly_increase = require("./yearly_increase/detached_trade_yearly_increase.model.js")(mongoose);
db.detached_contract_yearly_increase = require("./yearly_increase/detached_contract_yearly_increase.model.js")(mongoose);
db.land_trade_yearly_increase = require("./yearly_increase/land_trade_yearly_increase.model.js")(mongoose);
db.multi_housing_trade_yearly_increase = require("./yearly_increase/multi_housing_trade_yearly_increase.model.js")(mongoose);
db.multi_housing_contract_yearly_increase = require("./yearly_increase/multi_housing_contract_yearly_increase.model.js")(mongoose);
db.officetel_trade_yearly_increase = require("./yearly_increase/officetel_trade_yearly_increase.model.js")(mongoose);
db.officetel_contract_yearly_increase = require("./yearly_increase/officetel_contract_yearly_increase.model.js")(mongoose);

/* compare */
db.apart_trade_compare_count = require("./apart_trade_compare_count.model.js")(mongoose);

/* increase / decrease */
db.apart_trade_guro_indecrease = require("./apart_trade_guro_indecrease.model.js")(mongoose);
db.apart_trade_gwanak_indecrease = require("./apart_trade_gwanak_indecrease.model.js")(mongoose);
db.apart_trade_jongno_indecrease = require("./apart_trade_jongno_indecrease.model.js")(mongoose);
db.apart_trade_kangdong_indecrease = require("./apart_trade_kangdong_indecrease.model.js")(mongoose);
db.apart_trade_kangnam_indecrease = require("./apart_trade_kangnam_indecrease.model.js")(mongoose);
db.apart_trade_targetarea_increase = require("./apart_trade_targetarea_increase.model.js")(mongoose);

module.exports = db;