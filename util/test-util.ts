import * as frisby from 'frisby'
import fetch from 'node-fetch'

const env = process.env.TEST_TARGET_ENV
export const EIAC_ROOT_URL =
  env === 'prod'
    ? 'https://eiac.ccoe.delaval.cloud/'
    : `https://farm-alarms.dev-an.delaval.cloud/`


  export const ALARM_ROOT_URL =
    env === 'dev'
      ? 'https://farm-alarms.dev-an.delaval.cloud/'
      : `https://farm-alarms.stage-an.delaval.cloud/`
      
  export const FARM_ID =
    env === 'dev'
    ? 'fc9c3c60-a865-48ce-9302-11f8dd1a1027'
    : 'fc9c3c60-a865-48ce-9302-11f8dd1a1027'
    

export const getEndpoint = (endpoints: any, title: string) => {
  return endpoints.find((link: any) => link.title === title).href
}

const COGNITO_URL = 'https://cognito-idp.eu-west-1.amazonaws.com/'
const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID

export const getSession = async (username?: string, password?: string) => {
  const session = await fetch(COGNITO_URL, {
    method: 'post',
    headers: {
      'x-amz-target': 'AWSCognitoIdentityProviderService.InitiateAuth',
      'content-type': 'application/x-amz-json-1.1',
    },
    body: JSON.stringify({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: username || process.env.TEST_USER_USERNAME,
        PASSWORD: password || process.env.TEST_USER_PASSWORD,
      },
      ClientMetadata: {},
    }),
  })
  const authStatus: number = await session.status
  expect(authStatus).toBe(200)
  const json = await session.json()
  expect(json).not.toBeNull()
  const idToken = json.AuthenticationResult.IdToken
  expect(idToken).not.toBeNull()

  return idToken
}

export const frisbyGet = async (link: string) => {
  const response = await frisby.get(link).expect('status', 200).promise()
  return JSON.parse(response.body.toString())
}

export async function sleep(ms: any = 4500, silent: boolean = true) {
  await new Promise((resolve) => setTimeout(resolve, ms))
  if (!silent) console.log('Waking up after sleep.')
}

export function getType(p: any) {
  if (Array.isArray(p)) return 'array'
  else if (typeof p == 'string') return 'string'
  else if (typeof p == 'number') return 'number'
  else if (p != null && typeof p == 'object') return 'object'
  else return 'other'
}

export function extractHost(url: string) {
  let URL = require('url').URL
  let tmpUrl = new URL(url)
  let host = tmpUrl.protocol + '//' + tmpUrl.host
  return host
}

export function extract_value(json: any, path: any) {
  var i: any
  for (i = 0; json != null && i < path.length; i++) {
    if (getType(json) == 'array') {
      if (getType(path[i]) == 'object') {
        var limbRule = path[i]
        var checkLimb = limbRule['checkLimb']
        var checkVal = limbRule['checkVal']
        var regSearch = limbRule['regSearch']
        var regExpr = limbRule['regExpr']

        var oldjson = json
        var elements = json
        json = null
        for (var elem of elements) {
          var scout = elem
          for (var limbElem of checkLimb) {
            if (limbElem == '*') {
              if (Object.keys(scout).length >= 1) {
                var firstKey = Object.keys(scout)[0]
                scout = scout[firstKey]
              } else {
                console.log(
                  'Drilldown element * specified, but no properties found.',
                )
                scout = null
                break
              }
            } else {
              scout = scout[limbElem]
            }
          }
          if (regSearch && scout.search(checkVal) != null) {
            json = elem
            break
          } else if (regExpr && scout.match(checkVal) != null) {
            json = elem
            break
          } else if (scout == checkVal) {
            json = elem
            break
          }
        }
      } else if (getType(path[i]) == 'number') {
        json = json[path[i]]
      } else {
        json = json[0]
      }
    } else {
      if (getType(path[i]) == 'string') {
        if (path[i] == '*') {
          if (Object.keys(json).length >= 1) {
            var firstKey = Object.keys(json)[0]
            json = json[firstKey]
          } else {
            console.log(
              'Drilldown element * specified, but no properties found.',
            )
            json = null
            break
          }
        } else {
          json = json[path[i]]
        }
      } else {
        json = null
      }
    }
  }

  return json
}
