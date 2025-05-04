import express from 'express'


const router = express.Router();


router.get('/helloWorld', (req, res) => {
    res.send('Hello World')
})







export default router;