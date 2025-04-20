import { Router } from 'express'

import { helloWorld } from '../controller/helloWorld.js'


const router = Router()


router.get('/', helloWorld)




export default router;