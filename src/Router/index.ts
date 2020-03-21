import { Router as ExpressRouter } from 'express'

// import * as Middlewares from './Middlewares'
import * as Routes from './Routes'

const Router = ExpressRouter()

Router.use('/', Routes.root)
Router.use('/subscription', Routes.subscription)

export default Router
