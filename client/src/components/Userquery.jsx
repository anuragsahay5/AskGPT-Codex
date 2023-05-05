import chat_img from "/images/AskGPT-icon.png";

export default function Userquery(content) {
  return `
      <div class="query-container">
        <img
          class="chat-icon"
          src=${chat_img}
          alt="query_image"
        />
        <div>${content}</div>
      </div>
    `;
}
