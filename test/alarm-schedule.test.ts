import * as frisby from 'frisby'
import { FARM_ID,getSession } from '../util/test-util'
import { ALARM_ROOT_URL, frisbyGet } from '../util/test-util'



describe('Alarm Schedule', () => {
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
  
  it('Alarm schedule should return a status of 200', async () => {
    await frisby
      .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/schedules?customerId=9999999999')
      .expect('status', 200)
      .promise()
  })

  it('Alarm list for user schedules', async () => {
    await frisby
      .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/schedules')
      .expect('status', 200)
      .promise()
  })

  it ('PUT for schedules should return a status of 200 OK', async () =>{
      await frisby
        .put(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/06210b7e-bab9-4969-b38e-cf7c7671f824/schedules', {
          from: 1628035200000,
          to: 1628078400000,
          type: 'ON_DUTY',
          weekday: 'friday'
         })
        .expect('status', 200)
        .promise()
    })
})