const { Router } = require("express");
// import all routers;
const productRouter = require("./product.js");
const { utils } = require("./utils");
const categoryRouter = require("./category.js");
const webhooks = require('./webhooks.js');

const router = Router();
// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use("/utils", utils);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/webhooks", webhooks);

module.exports = router;