import base_url from "./base_url";
import commonApi from "./commonApi"; 

export const registerApi = async (data) => {
  return await commonApi(`${base_url}/reg`, 'POST', "", data);
};

export const loginApi = async(data)=>{
  return await commonApi(`${base_url}/log`,'POST',"",data)
}

export const addProjectApi = async (data, header) => {
  return await commonApi(`${base_url}/addproject`, "POST", header, data);
};

export const getProjectlistApi=async(header)=>{
  return await commonApi(`${base_url}/projectlist`,"GET",header,"")
}

export const deleteProjectApi=async(id,header)=>{
  return await commonApi(`${base_url}/delproject/${id}`,"DELETE",header,{})
}

export const editProjectApi=async(data,id,header)=>{
  return await commonApi(`${base_url}/editproject/${id}`,"PUT",header,data)
}

export const profileUpdateApi=async(data,header)=>{
  return await commonApi(`${base_url}/updateprofile`,"PUT",header,data)
}

export const allProjectsApi=async()=>{
  return await commonApi(`${base_url}/allprojects`,"GET","","")
}
