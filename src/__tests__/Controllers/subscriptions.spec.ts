import faker from 'faker'
import { MongoMemoryServer } from 'mongodb-memory-server'
import Mongoose from 'mongoose'
import request from 'supertest'

import App from '../../app'

import { Mailer } from '../../Functions'

describe('Subscription Controller', () => {
  const $http = request(App.app)
  const basePath = '/api/subscription'
  const mongod = new MongoMemoryServer({
    instance: { dbName: 'jest', port: 27019 }
  })

  beforeAll(async () => {
    const uri = await mongod.getUri()
    await Mongoose.connect(uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  })

  afterAll(async () => {
    await mongod.stop()
  })

  describe('POST / - Register new subscription', () => {
    const subPayload = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber()
    }

    it('should respond with 201 when success', async () => {
      const { status, body } = await $http.post(basePath).send(subPayload)

      expect(status).toBe(201)
      expect(body).toEqual(expect.objectContaining(subPayload))
    })

    it('should respond with 400 when had an incomplete payload', async () => {
      const name = faker.name.findName()
      const phone = faker.phone.phoneNumber()
      const email = faker.internet.email()

      const noName = { email, phone }
      const noPhone = { email, name }
      const noEmail = { name, phone }

      const payload = [noEmail, noName, noPhone][faker.random.number(2)]
      const { status, body } = await $http.post(basePath).send(payload)

      expect(status).toBe(400)
      expect(body).toHaveProperty('error')
    })

    it('should respond with 409 when email already taken', async () => {
      const { status, body } = await $http.post(basePath).send(subPayload)
      expect(status).toBe(409)
      expect(body).toHaveProperty('error')
    })

    it('should call Mailer to send email with content', async () => {
      const mailerSpy = jest.spyOn(Mailer, 'sentContentInfo')
      const payload = {
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email()
      }

      await $http.post(basePath).send(payload)

      expect(mailerSpy).toHaveBeenCalledWith(payload.email)
    })
  })
})
