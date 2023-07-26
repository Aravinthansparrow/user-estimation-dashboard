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

export const getClientDetails = (clientId) => {
  const baseURL = getBaseEndpointUrl();
  const url = `${baseURL}/clients`;

  // No try/catch needed here since we are not adding specific error handling logic.
  
  return Http.get(url, { params: { clientId } });

  
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

export const complexitySubmit = (complexityId,complexity , days) => {
  const baseURL = getBaseEndpointUrl();
 
  
  return Http.put(baseURL + '/complexity', {complexityId, complexity, days})
}

//components

export const getComponents =  () => {
  const baseURL = getBaseEndpointUrl();
  return Http.get(baseURL + '/components' )
};

export const addingComponent = (name, isDefault) =>{
 
  const baseURL = getBaseEndpointUrl();
  return Http.post(baseURL + '/components', {name, isDefault})
}

export const deletingComponent = (id) =>{
 
  const baseURL = getBaseEndpointUrl();
  return Http.delete(baseURL + `/components/${id}`)
}

export const updateComponentName = (id, name, isDefault) =>{
  const baseURL = getBaseEndpointUrl();
  return Http.put(baseURL + `/components/${id}`, {name, isDefault})
}

//workitems

export const workItemsSubmit =  (workItem) => {
  console.log(workItem)
  const baseURL = getBaseEndpointUrl();
  return Http.post(baseURL + '/workitems' , workItem)
};

export const workItemsGet = (clientId) => {
  const baseURL = getBaseEndpointUrl();
  const url = `${baseURL}/workitems`;

  // No try/catch needed here since we are not adding specific error handling logic.
  
  return Http.get(url, { params: { clientId } });

  
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

//activities

export const getActivities = () => {
  const baseURL = getBaseEndpointUrl();
  console.log('jh')
  return Http.get(baseURL + '/activity');
};

export const addActivity = (activity, percentagesplit) => {
  const baseURL = getBaseEndpointUrl();
  return Http.post(baseURL + '/activity', { activity, percentagesplit });
};

export const updateActivity = (id, activity, percentagesplit) => {
  const baseURL = getBaseEndpointUrl();
  return Http.put(baseURL + `/activity/${id}`, { activity, percentagesplit });
};

export const deleteActivity = (id) => {
  const baseURL = getBaseEndpointUrl();
  return Http.delete(baseURL + `/activity/${id}`);
};
