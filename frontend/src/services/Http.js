import axios from 'axios';
const _axios = axios;

export class Http{
  static get(url, options={}){
    console.log('url--->', url)
    return _axios.get(url, options);
  }
  static post(url,body, options={}){
    console.log('url--->', url)
    return _axios.post(url,body, options);
  }
  static put(url,body, options={}){
    console.log('url--->', url)
    return _axios.put(url,body, options);
  }
  static delete(url, options={}){
    console.log('url--->', url)
    return _axios.delete(url, options);
  }
}