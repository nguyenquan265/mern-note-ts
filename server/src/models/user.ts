import { InferSchemaType, Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }
  },
  {
    timestamps: true
  }
)

type User = InferSchemaType<typeof userSchema>

const UserModel = model<User>('User', userSchema)

export default UserModel
