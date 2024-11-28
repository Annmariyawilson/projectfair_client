import { useEffect, useState } from 'react';
import React from 'react';
import Header from '../Components/Header';
import ProjectCard from '../Components/ProjectCard';
import { allProjectsApi } from '../services/allApi';

function AllProject() {
  const [data, setData] = useState([]); // Use array as default state

  useEffect(() => {
    if (sessionStorage.getItem('Token')) {
      getdata();
    }
  }, []);

  const getdata = async () => {
    const res = await allProjectsApi();
    if (res.status === 200) {
      setData(res.data);
    }
  };

  console.log(data);

  return (
    <>
      <Header />
      <div className="container-fluid p-3">
        <h3>All Projects</h3>
        <div className="d-flex justify-content-around ">
          {data.length > 0 ? (
            data.map((item) => <ProjectCard key={item.id} project={item} />) // Use unique key if available (e.g., item.id)
          ) : (
            <h4 className="text-danger text-center">
              Project is not Available ... check if you're Logged in
            </h4>
          )}
        </div>
      </div>
    </>
  );
}

export default AllProject;
