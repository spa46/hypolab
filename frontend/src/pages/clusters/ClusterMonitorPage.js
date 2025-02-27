import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClusterMonitorPage = () => {
  const [monitorData, setMonitorData] = useState([]);

  useEffect(() => {
    const fetchMonitorData = async () => {
      try {
        const response = await axios.get('/monitor');
        setMonitorData(response.data.monitor);
      } catch (error) {
        alert('Failed to fetch monitor data');
      }
    };

    fetchMonitorData();
  }, []);

  return (
    <div>
      <h1>Cluster Monitor</h1>
      <ul>
        {monitorData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClusterMonitorPage;