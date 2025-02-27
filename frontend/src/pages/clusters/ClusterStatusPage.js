import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClusterStatusPage = () => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('/status');
        setStatus(response.data.status);
      } catch (error) {
        alert('Failed to fetch status');
      }
    };

    fetchStatus();
  }, []);

  return (
    <div>
      <h1>Cluster Status</h1>
      <ul>
        {status.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClusterStatusPage;