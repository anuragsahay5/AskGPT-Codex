export default function Userquery(content) {
  return `
      <div class="query-container">
        <img
          class="chat-icon"
          src="/images/AskGPT-icon.png"
          alt="query_image"
        />
        <div>${content}</div>
      </div>
    `;
}
