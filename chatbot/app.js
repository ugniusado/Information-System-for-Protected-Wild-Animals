document.getElementById('gpt3-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputText = document.getElementById('input-text').value;
  const messages = document.getElementById('messages');

  function addMessage(content, isUserMessage) {
      const message = document.createElement('div');
      message.classList.add('message');
      if (isUserMessage) {
          message.classList.add('user-message');
      } else {
          message.classList.add('ai-message');
      }

      const messageIcon = document.createElement('img');
      messageIcon.classList.add('message-icon');
      messageIcon.src = isUserMessage ? 'icons/user-icon.png' : 'icons/ai-icon.png';
      messageIcon.alt = isUserMessage ? 'User Icon' : 'AI Icon';
      
      const messageContent = document.createElement('p');
      messageContent.textContent = content;

      message.appendChild(messageIcon);
      message.appendChild(messageContent);

      messages.appendChild(message);
      messages.scrollTop = messages.scrollHeight;
      message.scrollIntoView({behavior: "smooth"});
  }

  addMessage(inputText, true);

  try {
      const response = await axios.post('http://localhost:3000/api/gpt3', { text: inputText });
      addMessage(response.data.output, false);
  } catch (error) {
      addMessage('Error: ' + error.message, false);
  }

  document.getElementById('input-text').value = '';
});
