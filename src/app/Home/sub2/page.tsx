"use client"; // Important for React components in Next.js 13
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Modal, Button, Input, message, Radio } from 'antd';
import 'react-calendar/dist/Calendar.css'; // For calendar styling
import '../../page.module.css'

// Define the shape of the event object
interface Event {
  date: string; // The date of the event, formatted as MM/DD/YYYY
  title: string;
  type: 'event' | 'reminder'; // Event or reminder type
}

const CalendarApp: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Store the selected date
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Modal visibility
  const [eventTitle, setEventTitle] = useState<string>(''); // Store event title
  const [eventType, setEventType] = useState<'event' | 'reminder'>('event'); // Store event type
  const [events, setEvents] = useState<Event[]>([]); // Store events and reminders

  // Handle date selection from the calendar
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalVisible(true); // Show modal to add an event or reminder
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEventTitle('');
  };

  // Handle event or reminder creation
  const handleAddItem = () => {
    if (!eventTitle) {
      message.error('Please provide a title!');
      return;
    }

    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString(); // Format the date (MM/DD/YYYY)
      const newItem: Event = { date: formattedDate, title: eventTitle, type: eventType };

      setEvents((prevEvents) => [...prevEvents, newItem]); // Add the new item to the state

      setEventTitle('');
      setIsModalVisible(false); // Close modal
      message.success(`${eventType === 'event' ? 'Event' : 'Reminder'} added successfully!`);
    }
  };

  // Calendar tile content function to render events and reminders inside each tile
  const tileContent = ({ date }: any) => {
    const formattedDate = date.toLocaleDateString(); // Format the date for comparison
    const itemsForDate = events.filter((item) => item.date === formattedDate);

    return (
      <>
        {itemsForDate.length > 0 && (
          <div style={{ padding: '4px', fontSize: '12px', color: '#1890ff' }}>
            {itemsForDate.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: item.type === 'event' ? '#e6f7ff' : '#fff0f6',
                  padding: '4px',
                  marginBottom: '4px',
                  borderRadius: '4px',
                  color: item.type === 'event' ? '#1890ff' : '#f5222d',
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div style={{ padding: '50px' }}>
      {/* Calendar with padding for each tile */}
      <div
        style={{
          maxWidth: '50%',
          padding: '60px', // Apply padding to the calendar container
          backgroundColor: '#fff', // Optional background color for the calendar container
          borderRadius: '10px', // Optional: Add rounded corners
        }}
      >
        <Calendar
          onClickDay={handleDateClick}
          tileContent={tileContent}
            className="styled-calendar"
    
        />
      </div>

      {/* Modal for adding event or reminder */}
      <Modal
        title="Add Event or Reminder"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Input
          placeholder="Enter title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Radio.Group
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          style={{ marginBottom: 16 }}
        >
          <Radio value="event">Event</Radio>
          <Radio value="reminder">Reminder</Radio>
        </Radio.Group>
        <Button type="primary" onClick={handleAddItem} block>
          Add {eventType === 'event' ? 'Event' : 'Reminder'}
        </Button>
      </Modal>

      {/* Events and Reminders List */}
      <div style={{ marginTop: '20px' }}>
        <h3>Upcoming Items:</h3>
        <ul>
          {events.map((item, index) => (
            <li key={index} style={{ color: item.type === 'event' ? '#1890ff' : '#f5222d' }}>
              {item.date}: {item.title} ({item.type === 'event' ? 'Event' : 'Reminder'})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarApp;
