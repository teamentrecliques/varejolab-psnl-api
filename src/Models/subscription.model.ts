import Mongoose, { Schema, Document } from 'mongoose'

interface SubscriptionInterface extends Document {
  name: string
  email: string
  phone: string
  createdAt: Date
  updatedAt: Date
}

const subscriptionSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const model = Mongoose.model<SubscriptionInterface>(
  'Subscription',
  subscriptionSchema,
  'subscriptions'
)

export default model
