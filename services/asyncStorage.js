import AsyncStorage from "@react-native-async-storage/async-storage";
var jwt_decode = require('jwt-decode')




async function getAccessUsingRefresh (refreshToken) {
  const data = JSON.stringify({"refresh":refreshToken});
  //http://10.0.2.2:8000/
  //https://khushiikids.herokuapp.com/

    return await fetch("https://khushiikids.herokuapp.com/auth/jwt/refresh/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }).then(res => res.json())
  }

  async function getVerifiedKeys (keys) {
    console.log('Loading keys from storage')
  
    if (keys) {
      console.log('checking access')
  
      if (!isTokenExpired(keys.access)) {
        console.log('returning access')

        return keys
      } else {
        console.log('access expired')
        console.log('checking refresh expiry')
        if (!isTokenExpired(keys.refresh)) {
          console.log('fetching access using refresh')
          const response = await getAccessUsingRefresh(keys.refresh)
          response["refresh"] =keys.refresh 
          console.log(response)
  
          await AsyncStorage.setItem('token', JSON.stringify(response))
  
          console.log('UPDATED ONE')
  
          return response
        } else {
          console.log('refresh expired, please login')
  
          return null
        }
      }
    } else {
      console.log('access not available please login')
  
      return null
    }
  }
  
  function isTokenExpired (token) {
    var decoded = jwt_decode(token)
  
    if (decoded.exp < Date.now() / 1000) {
      return true
    } else {
      return false
    }
  }



const storeToken = async(value)=>{
    try{
        await AsyncStorage.setItem('token', JSON.stringify(value))
    } catch (error)
    {
        console.log(error)
    }
}

const getToken = async()=>{
    try{

       var cred =  await AsyncStorage.getItem('token')
       let token = await getVerifiedKeys(JSON.parse(cred))

       if (cred != null && token != null) {
        return token
      } else {
        return null
      }
    } catch (e) {
      console.log(e)
    }
  
    return null
  }
const removeToken = async()=>{
    try{

      await AsyncStorage.removeItem('token')
    } catch (error)
    {
        console.log(error)
    }
}

const storeLanguage = async(value)=>{
    try{
 
        await AsyncStorage.setItem('language', value)
    } catch (error)
    {
        console.log(error)
    }
}
const getLanguage = async()=>{
    try{
       const language =  await AsyncStorage.getItem('language')
       console.log(language)
       if(language!==null){
        return language
       }else{
        return ''
       }
    } catch (error)
    {
        console.log(error)
    }
}
const removeLanguage = async()=>{
    try{

      await AsyncStorage.removeItem('language')
    } catch (error)
    {
        console.log(error)
    }
}
export {getToken, storeToken, removeToken, storeLanguage, removeLanguage, getLanguage}