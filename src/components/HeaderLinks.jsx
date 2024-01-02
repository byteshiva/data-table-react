// HeaderLinks.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { YearListData } from './YearListData';
import './HeaderLinks.css';

const HeaderLinks = () => {
  const navigate = useNavigate();
  const years = YearListData();
  const [selectedYear, setSelectedYear] = useState('');

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    navigate(`/table/${selectedYear}`);
  };

  return (
    <section id="header-strip">
      <label className="year-label">Select the year:</label>

      <select className="year-dropdown" value={selectedYear} onChange={handleYearChange}>
        <option value="" disabled>
          Select a year
        </option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </section>
  );
};

export default HeaderLinks;