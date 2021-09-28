
import * as frisby from 'frisby'
import { FARM_ID,getSession } from '../util/test-util'
import { ALARM_ROOT_URL, frisbyGet } from '../util/test-util'

describe('Alarm list retrieve user farm alarms', () => {
    beforeAll(async () => {
      const idToken = await getSession('matknu@kth.se','#Tacos123')          
      frisby.globalSetup({
        request: {
          headers: {
            authorization: idToken,
          },
        },
      })
    })
  
    let rootResponseBody: any
  
  it('Alarm list for user with limit 100 should return a status of 200', async () => {
    await frisby
      .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/9999999999/alarms?limit=100')
      .expect('status', 200)
      .promise()
  })

  it('Alarm root url is working with farm id', async () => {
    await frisby
      .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/profiles')
      .expect('status', 200)
      .promise()
  })

  it('Alarm list for user should return a status of 200', async () => {
    await frisby
      .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/9999999999/alarms')
      .expect('status', 200)
      .promise()
  })

  it('Alarm list with farm_id and worker_id should return a status of 200', async () => {
    await frisby
      .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/7a6355ea-cc97-46d6-9e89-cdd58f0c484a/alarms')
      .expect('status', 200)
      .promise()
  })

  it('Alarm Configuration should return all warning and errors with status of 200', async () => {
    await frisby
      .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/06210b7e-bab9-4969-b38e-cf7c7671f824/alarms?state=active&limit=100')
      .expect('status', 200)
      .promise()
  })

})