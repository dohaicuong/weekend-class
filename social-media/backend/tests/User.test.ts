import { createTestContext } from './__helpers'

const ctx = createTestContext()

describe('User', () => {
  test('users should return seeded data', async () => {
    const result = await ctx.client.send(`
      query UsersQuery {
        users {
          id
          email
          name
          avatar
        }
      }
    `)

    expect(result).toMatchSnapshot()
  })
  test('node should return seeded user', async () => {
    const result = await ctx.client.send(`
      query UserNodeQuery {
        node(id: "VXNlcjox") {
          ... on User {
            email
            name
            avatar
          }
        }
      }
    `)

    expect(result).toMatchSnapshot()
  })
  test('nodes should return seeded users', async () => {
    const result = await ctx.client.send(`
      query UserNodesQuery {
        nodes(ids: ["VXNlcjox", "VXNlcjoy"]) {
          ... on User {
            email
            name
            avatar
          }
        }
      }
    `)

    expect(result).toMatchSnapshot()
  })
})