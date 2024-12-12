import React, { useState } from 'react';

const PredictionForm = ({ onPredict }) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && year && month) {
      onPredict(name, year, month);
    }
  };

  // 年の選択肢（2015年から2029年）
  const years = Array.from({ length: 2029 - 2015 + 1 }, (_, i) => 2015 + i);
  // 月の選択肢（1月から12月）
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  // 部品名の選択肢
  const partNames = ['Part_A', 'Part_B', 'Part_C', 'Part_D', 'Part_E'];

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Part Name:</label>
      <select
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      >
        <option value="">Select Part</option>
        {partNames.map((part) => (
          <option key={part} value={part}>
            {part}
          </option>
        ))}
      </select>

      <label htmlFor="year">Year:</label>
      <select
        id="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="">Select Year</option>
        {years.map((yr) => (
          <option key={yr} value={yr}>
            {yr}
          </option>
        ))}
      </select>

      <label htmlFor="month">Month:</label>
      <select
        id="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        <option value="">Select Month</option>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <button type="submit">Predict</button>
    </form>
  );
};

export default PredictionForm;
