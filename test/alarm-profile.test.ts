import * as frisby from 'frisby'
import { FARM_ID, getSession } from '../util/test-util'
import { ALARM_ROOT_URL, frisbyGet } from '../util/test-util'
import { extract_value } from '../util/test-util'
const Joi = frisby.Joi;


describe('Alarm profile retrive all farm alarm profiles', () => {
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
  
  it('Alarm profile retrive all farm alarm profiles should return a status of 200', async () => {
      await frisby
      .get(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/profiles')
      .expect('status', 200)
      .promise()
      })
  
  
  it('Post the profile name to create profiles by giving profile name correct information', async () => {
    const response = await frisby
    .post(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/profiles', {
      name: "test_frisby"
    })
    .expect('status', 201)
    .promise()
    const rootResponseBody = JSON.parse(response.body.toString())
    
    })

  
    it('Post the profile name to create profiles with all the correct information', async () => {
      const response = await frisby
      .post(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/profiles', {
        name: "test_frisby",
        categories: ["connectivity"],
        devices: [{"id": "666c4a97-424a-4ece-9058-46c42a98fe9a"}],
        workers: [{"id": "06210b7e-bab9-4969-b38e-cf7c7671f824"}],
        selectionType: "specific-id"
      })
      .expect('status', 201)
      .promise()
      const rootResponseBody = JSON.parse(response.body.toString())
      
      })
      // {
      //   "name": "test_01",
      //   "categories": ["connectivity"],
      //   "devices": [{
      //     "id": "666c4a97-424a-4ece-9058-46c42a98fe9a"
      //   }],
      //   "workers": [{
      //     "id": "06210b7e-bab9-4969-b38e-cf7c7671f824"
      //   }],
      //   "selectionType": "specific-id"
      // }




    // it('delete profiles with correct information', async () => {
    //   await frisby 
    //     .del(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/profiles/d17192f8-645b-5719-adee-fa3ea7335885')
    //     .expect('status', 204)
    //     .promise()
    // })
    
    // it('delete farm with correct information, line 1048', async () => {
    //   await frisby 
    //     .del(ALARM_ROOT_URL + 'farm-alarms/'+FARM_ID+'/workers/06210b7e-bab9-4969-b38e-cf7c7671f824/schedules/_qStkaxp_QyTHcKeCCIJS')
    //     .expect('status', 204)
    //     .promise()
    // })
    ///////////////////////////////////////////////////////////////////////////////
   
})