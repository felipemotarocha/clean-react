import AccountModel from '../models/account'

type AuthenticationParams = {
  email: string
  password: string
}

interface Authentication {
  auth(params: AuthenticationParams): Promise<AccountModel>
}

export default Authentication
