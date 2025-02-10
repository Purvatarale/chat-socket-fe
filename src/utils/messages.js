export const formatDate = (date) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  
  export const formatTime = (date) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleTimeString("en-US", options);
  };
  
  export const formatMessages = (messages) => {
    const groupedMessages = messages.reduce((acc, msg) => {
      const dateKey = formatDate(new Date(msg.timestamp));
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push({
        sender: msg.sender,
        message: msg.message,
        timestamp: formatTime(new Date(msg.timestamp)),
      });
      return acc;
    }, {});
    return Object.entries(groupedMessages)?.map(([date, chats]) => ({
      date,
      chats,
    }));
  };
  