import chat_img from "/images/AskGPT-icon.png";

export default function Userresponse(uniqueID) {
  return `
    <div class="response-container">
        <img
          class="chat-icon"
          src=${chat_img}
          alt="response_image"
        />
        <div id=${uniqueID}>
        </div>
      </div>
    `;
}
