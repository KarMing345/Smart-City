document.addEventListener('DOMContentLoaded', () => {
    // AI Assistant Chat
    const aiAssistantWindow = document.getElementById('aiAssistantWindow');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');

    window.toggleAIAssistant = () => {
        aiAssistantWindow.classList.toggle('active');
    };

    window.sendChatMessage = () => {
        const messageText = chatInput.value.trim();
        if (messageText === '') return;

        appendMessage(messageText, 'user');
        chatInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const botResponseKey = '我是智慧城市AI助手，很高兴为您服务！';
            const botResponse = translations[currentLanguage][botResponseKey] || botResponseKey;
            appendMessage(botResponse, 'bot');
        }, 1000);
    };

    function appendMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', type);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    }

    // Emergency Modal
    const emergencyModal = document.getElementById('emergencyModal');
    const confirmEmergencyButton = document.getElementById('confirmEmergencyButton');
    let currentEmergencyType = null;

    window.showEmergencyModal = () => {
        emergencyModal.classList.add('active');
    };

    window.closeEmergencyModal = () => {
        emergencyModal.classList.remove('active');
        currentEmergencyType = null;
    };

    window.handleEmergency = (type) => {
        currentEmergencyType = type;
        // Update modal text if needed, or just show general confirmation
        showEmergencyModal();
    };

    confirmEmergencyButton.addEventListener('click', () => {
        if (currentEmergencyType) {
            // Simulate API call and notification
            const titleKey = '紧急服务已通知';
            const descriptionKey = '救援人员正在赶来，请保持冷静';
            alert(
                (translations[currentLanguage][titleKey] || titleKey) + '\n' + 
                (translations[currentLanguage][descriptionKey] || descriptionKey) + 
                ` (${currentEmergencyType})`
            );
            closeEmergencyModal();
        }
    });

    // Initial UI setup if any
    // For example, setting the placeholder text for chat input initially
    if (chatInput) {
         const placeholderKey = '输入您的问题...';
         chatInput.placeholder = translations[currentLanguage][placeholderKey] || placeholderKey;
    }
});

// Make setLanguage globally available if not already from translations.js
if (typeof setLanguage === 'undefined') {
    window.setLanguage = function(lang) {
        console.warn('setLanguage function was not found in translations.js, using fallback.');
        if (window.translations && window.translations[lang]) {
            window.currentLanguage = lang;
            // Basic re-render for placeholders or elements not covered by data-translate-key
            // This part would need to be more robust in a real app
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                const placeholderKey = '输入您的问题...';
                chatInput.placeholder = window.translations[window.currentLanguage][placeholderKey] || placeholderKey;
            }
        } else {
            console.warn(`Language "${lang}" not supported.`);
        }
    };
} 