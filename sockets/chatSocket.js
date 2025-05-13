module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('chat message', (msg) => {
      const lower = msg.toLowerCase();
      let reply = "Sorry, I didn't understand that.";
      if (lower.includes('hello')) reply = 'Hi there! How can I help you?';
      else if (lower.includes('delivery')) reply = 'We deliver in 3–5 business days.';
      else if (lower.includes('price')) reply = 'Please specify the product name.';
      else if (lower.includes('return')) reply = 'You can return products within 7 days.';

      socket.emit('chat reply', reply);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
