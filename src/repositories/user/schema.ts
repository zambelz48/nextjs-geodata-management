import { Schema } from "mongoose"

export interface User {
  name: string
  email: string
}

export const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
})
