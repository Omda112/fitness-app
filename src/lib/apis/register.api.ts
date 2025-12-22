import { RegisterSchema } from '../schema/register.schema'
import { RegisterSuccessResponse } from '../types/register'

const API_URL = 'https://fitness.elevateegy.com/api/v1/auth/signup'

export const ApiRegister = async (data: RegisterSchema): Promise<RegisterSuccessResponse> => {
  // Fetch the data from the API
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Send the data to the API
    body: JSON.stringify(data),
  })

  // Get the result from the API
  const result = await response.json()

  // Check if there is an error - use the error message from the API
  if (result.error) {
    throw new Error(result.error)
  }

  // Check if the response is valid
  if (!result.user || !result.token) {
    throw new Error('Invalid response from server. Please try again.')
  }

  // Success
  return result as RegisterSuccessResponse
}