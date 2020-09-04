import { schema } from 'nexus'
import { toGlobalId, fromGlobalId } from 'graphql-relay'

schema.interfaceType({
  name: 'Node',
  definition: t => {
    t.id('id', {
      description: 'Relay ID',
      nullable: false,
      // @ts-ignore
      resolve: ({ id }, __, ___, { parentType }) => {
        return toGlobalId(parentType.name, id)
      }
    })

    t.resolveType(node => {
      // @ts-ignore
      return node.type
    })
  }
})

schema.extendType({
  type: 'Query',
  definition: t => {
    t.field('node', {
      type: 'Node',
      args: { id: schema.idArg({ required: true }) },
      resolve: async (_, args, { db }) => {
        const { id, type, prismaObject } = decodeGlobalId(args.id)

        // @ts-ignore
        const model = db[prismaObject]
        const node = await model.findOne({ where: { id } })
        return {
          ...node,
          type
        }
      }
    })
    t.field('nodes', {
      type: 'Node',
      list: true,
      args: {
        ids: schema.idArg({ list: true, required: true })
      },
      // @ts-ignore
      // TODO wait for fix from nexusjs
      resolve: (_, args, { db }) => {
        return args.ids.map(async globalId => {
          const { id, type, prismaObject } = decodeGlobalId(globalId)
          // @ts-ignore
          const model = db[prismaObject]
          const node = await model.findOne({ where: { id } })
          return {
            ...node,
            type
          }
        })
      }
    })
  }
})

/*
 * HELPERS
 */
const decodeGlobalId = (globalId: string): { id: string, type: string, prismaObject: string } => {
  const { type, id } = fromGlobalId(globalId)
  const prismaObject = type.charAt(0).toLowerCase() + type.slice(1)
  return { id, type, prismaObject }
}