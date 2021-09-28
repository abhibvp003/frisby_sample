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
  
  it('passing wrong url in alarm list for active state return 403', async () => {
    await frisby
      .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/alarms?state=active')
      .expect('status', 400)
      .promise()
  })

  it('passing wrong url in alarm list for active state and limit 100  should return a status of 400', async () => {
    await frisby
    .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/worke/9999999999/alarms?state=activelimit=100')
    .expect('status', 400)
    .promise()
  })
  

  it('Alarm list for all user having limit 100 should return a status of 403', async () => {
    await frisby
    .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/9999999999/alarm')
    .expect('status', 403)
    .promise()
  })

  it('Get alarms with wrong auth ', async () => {

    frisby
        .setup({
            request: {
                headers: {
                    'authorization': "aaa",
                    'Content-Type': 'application/json'
                }
            }
        })
      .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/06210b7e-bab9-4969-b38e-cf7c7671f824/alarms?state=active&limit=100')
      .expect('status', 403)
      .promise()
})

})
  