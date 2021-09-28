import * as frisby from 'frisby'
import { FARM_ID,getSession } from '../util/test-util'
import { ALARM_ROOT_URL, frisbyGet } from '../util/test-util'

describe('Alarm list retrieve user farm alarms', () => {
    beforeAll(async () => {
      const idToken = await getSession('324324234@mailinator.com','erwrwrw123')         
      frisby.globalSetup({
        request: {
          headers: {
            authorization: idToken,
          },
        },
      })
    })
  
    let rootResponseBody: any
  
  it('Alarm list for all user having active state should return a status of 200', async () => {
    await frisby
      .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/9999999999/alarms?state=active')
      .expect('status', 200)
      .promise()
  })
  it('Alarm list for all user having active state and limit 100  should return a status of 200', async () => {
    await frisby
    .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/9999999999/alarms?state=active&limit=100')
    .expect('status', 200)
    .promise()
  })
  it('Alarm list for all user having limit 100 should return a status of 200', async () => {
    await frisby
    .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/9999999999/alarms?alarms?limit=100')
    .expect('status', 200)
    .promise()
  })

  it('Get list of alarms with wrong auth ', async () => {

    frisby
        .setup({
            request: {
                headers: {
                    'authorization': "aaa",
                    'Content-Type': 'application/json'
                }
            }
        })
      .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/9999999999/alarms')
      .expect('status', 403)
      .promise()
})
})