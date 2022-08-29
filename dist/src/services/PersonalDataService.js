"use strict";
const express = require('express');
const app = express();
const PORT = 3000;
app.post('/api');
app.listen(PORT, () => console.log(`Running on port ${PORT} ...`));
