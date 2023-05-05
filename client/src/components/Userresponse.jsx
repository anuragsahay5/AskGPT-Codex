export default function Userresponse(uniqueID) {
  return `
    <div class="response-container">
        <img
          class="chat-icon"
          src="/images/AskGPT-icon.png"
          alt="response_image"
        />
        <div id=${uniqueID}>
        </div>
      </div>
    `;
}
