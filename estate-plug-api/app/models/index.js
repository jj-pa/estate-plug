const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.apart_trade_monthly_price = require("./apart_trade_monthly_price.model.js")(mongoose);
db.apart_trade_compare_count = require("./apart_trade_compare_count.model.js")(mongoose);
db.apart_trade_guro_indecrease = require("./apart_trade_guro_indecrease.model.js")(mongoose);
db.apart_trade_gwanak_indecrease = require("./apart_trade_gwanak_indecrease.model.js")(mongoose);
db.apart_trade_jongno_indecrease = require("./apart_trade_jongno_indecrease.model.js")(mongoose);
db.apart_trade_kangdong_indecrease = require("./apart_trade_kangdong_indecrease.model.js")(mongoose);
db.apart_trade_kangnam_indecrease = require("./apart_trade_kangnam_indecrease.model.js")(mongoose);
db.apart_trade_targetarea_increase = require("./apart_trade_targetarea_increase.model.js")(mongoose);

module.exports = db;