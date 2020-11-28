import React, { useState, useEffect, useCallback } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
const url = "https://course-api.netlify.app/api/react-tabs-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const getJobs = useCallback(async () => {
    setLoading(true);
    const response = await fetch(url);
    const jobs = await response.json();
    setJobs(jobs);
    setLoading(false);
  }, []);

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  if (loading) {
    return (
      <section className='section loading'>
        <h1>Loading...</h1>
      </section>
    );
  }
  const { company, dates, duties, title } = jobs[value];

  return (
    <section className='section'>
      <div className='title'>
        <h2>Expierence</h2>
        <div className='underline'></div>
      </div>
      <div className='jobs-center'>
        {/* tabs */}
        <div className='btn-container'>
          {jobs.map((job, index) => {
            return (
              <button
                key={index}
                className={`job-btn ${index === value && "active-btn"}`}
                onClick={() => {
                  setValue(index);
                }}
              >
                {job.company}
              </button>
            );
          })}
        </div>
        {/* job info */}
        <article className='job-info'>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='job-date'>{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div className='job-desc' key={index}>
                <FaAngleDoubleRight className='job-icon' />
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default App;
