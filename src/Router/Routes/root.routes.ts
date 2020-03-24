import { Router as ExpressRouter } from 'express'

import { root as RootController } from '../../Controllers'

const Router = ExpressRouter()

Router.get('/run', RootController.run)

export default Router
