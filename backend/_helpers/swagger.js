const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const Yaml = require('yamljs');
const swaggerDocument = Yaml.load('./swagger.yaml');

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
