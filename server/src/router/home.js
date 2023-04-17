import express from 'express';

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  res.send(`
    <h1>Home Page Node</h1>    
    `)
})

module.exports = homeRouter;