import { use, schema } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'

use(prisma({
  features: {
    crud: true,
  },
  migrations: true,
}))

import { getUserId } from './utils'
schema.addToContext(({ req }) => {
  return {
    getUserId: () => getUserId(req)
  }
})