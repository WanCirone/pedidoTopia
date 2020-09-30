const { Router } = require("express");
// import all routers;
const productRouter = require("./product.js");
const categoryRouter = require("./category.js");
const webhooks = require('./webhooks.js');
const providerRouter = require("./provider.js");

const router = Router();
// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/webhooks", webhooks);
router.use("/providers", providerRouter);

module.exports = router;