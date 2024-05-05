import { createMongooseModel, mongooseExecutor } from "@/utils/mongooseUtils"
import { Model } from "mongoose"
import { User, userSchema } from "./schema"

const modelName = "user"

interface UserModelInterface extends Model<User> {
  findUsers: () => Promise<User[]>
  findUser: (email: string, password: string) => Promise<User | null>
}

userSchema.statics.findUsers = async function findUsers() {
  return mongooseExecutor(() => this.find())
}

userSchema.statics.findUser = async function findUser(email: string, password: string) {
  return mongooseExecutor(() => this.findOne({ email, password }))
}

const UserModel = createMongooseModel<User, UserModelInterface>(modelName, userSchema)

export { UserModel }
