import * as frisby from 'frisby'
import { getSession } from '../util/test-util'
import { EIAC_ROOT_URL } from '../util/test-util'

describe('EIAC exception path tests', () => {
  beforeAll(async () => {
    const idToken = await getSession()

    frisby.globalSetup({
      request: {
        headers: {
          authorization: idToken,
        },
      },
    })
  })

  it('EIAC root should return a status of 401 when unauthenticated', async () => {
    await frisby
      .setup({ request: { headers: { authorization: '' } } })
      .get(EIAC_ROOT_URL)
      .expect('status', 403)
      .promise()
  })

  it.skip('EIAC root should return a status of 404 when authenticated but on an invalid path', async () => {
    await frisby
      .get(EIAC_ROOT_URL + '/7a6355ea-cc97-46d6-9e89-cdd58f0c484a')
      .expect('status', 404)
      .promise()
  })

  it.skip('EIAC root should return a status of 401 when unauthenticated but on an invalid path', async () => {
    await frisby
      .setup({ request: { headers: { authorization: '' } } })
      .get(EIAC_ROOT_URL + '/7a6355ea-cc97-46d6-9e89-cdd58f0c484a')
      .expect('status', 401)
      .promise()
  })
})
