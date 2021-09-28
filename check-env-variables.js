const nullCheckEnvVariable = (variableName) => {
  if (!process.env[variableName]) {
    throw Error(`required env variable ${variableName} not found`)
  }
}

nullCheckEnvVariable('TEST_USER_USERNAME')
nullCheckEnvVariable('TEST_USER_PASSWORD')
nullCheckEnvVariable('TEST_TARGET_ENV')
nullCheckEnvVariable('COGNITO_CLIENT_ID')
