import {Http} from './Http'
import { getBaseEndpointUrl } from './config';

//Login user's
export const loginUser =  (email, password) => {
  const baseURL = getBaseEndpointUrl();
  return Http.post(baseURL + '/user' , {email, password})
};

export const updateUserPassword = (userId, newPassword) => {
  const baseURL = getBaseEndpointUrl();
  return Http.put(baseURL + `/user/${userId}`, { newPassword });
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

export const complexitySubmit = (selectedDays, selectedValue) => {
  const baseURL = getBaseEndpointUrl();
  return Http.post(baseURL + '/complexity', {selectedDays, selectedValue})
}

//components

export const getComponents =  () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(baseURL + '/components' )
};

//workitems

export const workItemsSubmit =  (workItem) => {
  console.log(workItem)
  const baseURL = getBaseEndpointUrl();
  return Http.post(baseURL + '/workitems' , workItem)
};

//GeneralSetings
export const getGeneralSettingsAPI = () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(baseURL + '/generalsettings');
};

export const updateGeneralSettingsAPI = (updatedValues) => {
  const baseURL = getBaseEndpointUrl();
  return Http.put(baseURL + '/generalsettings', updatedValues);
};
