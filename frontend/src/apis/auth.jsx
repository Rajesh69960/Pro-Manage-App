import axios from "axios"
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const userLogin = async (email, password) => {
  try {
    const reqUrl = `${backendUrl}/api/auth/login`
    const response = await axios.post(reqUrl, { email, password })
    return response.data
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}
export const userRegister = async ({
  name,
  email,
  confirmPassword,
  password,
}) => {
  try {
    const reqUrl = `${backendUrl}/api/auth/register`
    const reqPayload = { name, email, confirmPassword, password }
    const response = await axios.post(reqUrl, reqPayload)

    return response.data
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}

export const userUpdate = async ({
  newName,
  email,
  updateEmail,
  oldPassword,
  newPassword,
}) => {
  try {
    const reqUrl = `${backendUrl}/api/auth/update`
    const reqPayload = { newName, email, updateEmail, oldPassword, newPassword }
    const token = localStorage.getItem("token")
    const response = await axios.post(reqUrl, reqPayload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const addEmail = async (email) => {
  try {
    const reqUrl = `${backendUrl}/api/auth/mail`
    const token = localStorage.getItem("token")
    const response = await axios.post(reqUrl, email, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}
export const getAllMails = async () => {
  try {
    const reqUrl = `${backendUrl}/api/auth/allmail`
    const token = localStorage.getItem("token")
    const response = await axios.get(reqUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}
