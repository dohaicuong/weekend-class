import { createTestContext as originalCreateTestContext, TestContext } from 'nexus/testing'

export function createTestContext() {
  let ctx = {} as TestContext

  // @ts-ignore
  beforeAll(async () => {
    Object.assign(ctx, await originalCreateTestContext())
    await ctx.app.start()
  })

  // @ts-ignore
  afterAll(async () => {
    // TODO: wait for nexus fix @types
    // @ts-ignore
    await ctx.app.db.client.$disconnect()
    await ctx.app.stop()
  })
  return ctx
}
