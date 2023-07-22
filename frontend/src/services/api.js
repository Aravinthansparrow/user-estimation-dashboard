import {Http} from './Http'
import { getBaseEndpointUrl } from './config';

//Login
export const loginUser =  (email, password) => {
  const baseURL = getBaseEndpointUrl();
  return Http.post(baseURL + '/user' , {email, password})
};

//CLients
export const getEstimateList =  () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(baseURL + '/clients' )
};
export const submitClientDetails =  (formData) => {
  console.log(formData)
  const baseURL = getBaseEndpointUrl();
  return Http.post(baseURL + '/clients' , formData)
};
export const updateStatus = (id, status) => {
  const baseURL = getBaseEndpointUrl();
  return Http.put(baseURL + '/clients' + `/${id}`, {status})
}

//Complexity
export const getComplexity =  () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(baseURL + '/complexity' )
};