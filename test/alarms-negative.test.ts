import * as frisby from 'frisby'
import { FARM_ID,getSession } from '../util/test-util'
import { ALARM_ROOT_URL, frisbyGet } from '../util/test-util'



describe('Alarm Schedule', () => {
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
  
  it('passing wrong url and correct authorization in alarm', async () => {
    await frisby
      .get(ALARM_ROOT_URL + 'farm-alarm/'+FARM_ID+'/workers/06210b7e-bab9-4969-b38e-cf7c7671f824/alarms?state=active&limit=100')
      .expect('status', 403)
      .promise()
  })

  it('passing wrong worker id in getting alarms should return a status of 401', async () => {
    await frisby
      .setup({ request: { headers: { authorization: '' } } })
      .get('https://farm-alarms.dev-an.delaval.cloud/farm-alarms/fc9c3c60-a865-48ce-9302-11f8dd1a1027/workers/234234234234324234234324234/alarms')
      .expect('status', 401)
      .promise()
  })

  it('passing wrong farm id in getting alarms should return a status of 401', async () => {
    await frisby
      .setup({ request: { headers: { authorization: '' } } })
      .get(ALARM_ROOT_URL+'farm-alarms/fc9tttttc3c60-a865-48ce-9302-11f8dd1a1027/workers/9999999999/alarms')
      .expect('status', 401)
      .promise()
  })
  
  it('passing wrong farm_id as well as worker_id in getting alarms should return a status of 401', async () => {
    await frisby
      .setup({ request: { headers: { authorization: '' } } })
      .get(ALARM_ROOT_URL+'farm-alarms/fc9cqwewqewqeq3c60-a865-48ce-9302-11f8dd1a1027/workers/532465214556/alarms')
      .expect('status', 401)
      .promise()
  })

  it('Alarm root should return a status of 403 wrong url', async () => {
    await frisby
      .setup({ request: { headers: { authorization: '' } } })
      .get(ALARM_ROOT_URL)
      .expect('status', 403)
      .promise()
  })

  it('Alarm root url contains farm-alarms path should return a status of 403', async () => {
    await frisby
      .setup({ request: { headers: { authorization: '' } } })
      .get(ALARM_ROOT_URL+'farm-alarms/')
      .expect('status', 403)
      .promise()
  })

  it.skip('Alarm root should return a status of 404 when authenticated but on an invalid path', async () => {
    await frisby
      .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers')
      .expect('status', 404)
      .promise()
  })

  it('Get farms with wrong auth ', async () => {

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
