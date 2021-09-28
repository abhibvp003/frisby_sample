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
  
  it('Passing wrong url Alarm schedule should return a status of 403', async () => {
    await frisby
      .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/worke/schedules?customerId=9999999999')
      .expect('status', 403)
      .promise()
  })

  it('Passing wrong url Alarm schedule should return a status of 403', async () => {
    await frisby
      .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/schedules')
      .expect('status', 403)
      .promise()
  })

  it('Get schedule having customer id with wrong auth ', async () => {

    frisby
        .setup({
            request: {
                headers: {
                    'authorization': "aaa",
                    'Content-Type': 'application/json'
                }
            }
        })
        .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/schedules?customerId=9999999999')
      .expect('status', 403)
      .promise()
})

it('Get schedule with wrong auth ', async () => {

    frisby
        .setup({
            request: {
                headers: {
                    'authorization': "aaa",
                    'Content-Type': 'application/json'
                }
            }
        })
        .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/schedules')
      .expect('status', 403)
      .promise()
})

  it('passing wrong url to schedule alarm', async () => {
    await frisby
      .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/schedu')
      .expect('status', 403)
      .promise()
  })

//   it ('PUT for schedules should return a status of 200 OK', async () =>{
//       await frisby
//         .put(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/06210b7e-bab9-4969-b38e-cf7c7671f824/schedules', {
//           from: 1628035200000,
//           to: 1628078400000,
//           type: 'ON_DUTY',
//           weekday: 'friday'
//          })
//         .expect('status', 200)
//         .promise()
//     })
})