import { schema, use } from "nexus";
import { connectionFromPromisedArray } from "graphql-relay";

schema.objectType({
  name: 'Post',
  definition: t => {
    t.implements('Node')
    // t.model.id()
    t.model.content()
    t.model.like()
    t.model.author()
    t.model.createdAt()
  }
})

schema.extendType({
  type: 'User',
  definition: t => {
    t.model.posts()
  }
})

// POSTS QUERY
schema.inputObjectType({
  name: 'PostConnetWhereInput',
  definition: t => {
    t.string('keyword')
    t.string('author_email')
  }
})
schema.extendType({
  type: 'Query',
  definition: t => {
    t.connection('posts', {
      type: 'Post',
      additionalArgs: {
        where: 'PostConnetWhereInput'
      },
      resolve: (_root, { where, ...args }, ctx) => {
        return connectionFromPromisedArray(
          ctx.db.post.findMany({
            where: {
              content: {
                contains: where?.keyword ?? undefined
              },
              author: {
                email: where?.author_email ?? undefined
              },
            }
          }),
          args
        )
      }
    })
  }
})

// CREATE POST MUTATION
schema.inputObjectType({
  name: 'CreatePostInput',
  definition: t => {
    t.string('content', { required: true })
  }
})
schema.objectType({
  name: 'CreatePostPayload',
  definition: t => {
    t.field('post', { type: 'Post' })
  }
})
schema.extendType({
  type: 'Mutation',
  definition: t => {
    t.field('createPost', {
      type: 'CreatePostPayload',
      args: {
        input: schema.arg({
          type: 'CreatePostInput',
          required: true,
        })
      },
      resolve: async (_root, { input }, ctx) => {
        const userId = ctx.getUserId()
        if (!userId) throw new Error('Unauthorized')

        const post = await ctx.db.post.create({
          data: {
            content: input.content,
            author: {
              connect: {
                id: userId
              }
            }
          }
        })

        return {
          post
        }
      }
    })
  }
})

// DELETE POST MUTATION
// LIKE POST MUTATION

