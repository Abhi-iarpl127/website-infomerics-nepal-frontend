import React from 'react';

interface DateProps {
  date: string;
}

// Rename component to avoid conflict with built-in Date object
const DateComponent: React.FC<DateProps> = ({ date }) => {
  const formatDate = (dateString: string) => {
    try {
      // Use the Date constructor with type assertion
      const dateObj = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(dateObj.getTime())) {
        return dateString; // Return original string if invalid date
      }
      
      const day = dateObj.getDate();
      const month = dateObj.toLocaleString('default', { month: 'long' });
      const year = dateObj.getFullYear();
      
      return `${month} ${day}, ${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString; // Return original string in case of error
    }
  };

  return <span>{formatDate(date)}</span>;
};

export default DateComponent;
