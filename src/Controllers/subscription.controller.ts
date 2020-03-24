import * as Yup from 'yup'
import { Request, Response } from 'express'

import { Mailer } from '../Functions'
import { Subscription } from '../Models'
import { $response } from '../Utils'

const create = async (req: Request, res: Response): Promise<Response> => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    phone: Yup.string().required()
  })
  const { body: payload } = req

  const isSchemaValid = await schema.isValid(payload)
  if (!isSchemaValid) {
    return $response.badRequest(res, {
      error: 'Validation fails. Invalid payload'
    })
  }

  const found = await Subscription.findOne({ email: payload.email })
  if (found) {
    return $response.conflict(res, { error: 'Email already taken' })
  }

  const [created] = await Promise.all([
    Subscription.create(payload),
    Mailer.sentContentInfo(payload.email)
  ])

  return $response.created(res, created)
}

export default { create }
