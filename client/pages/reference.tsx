import PageBlock from "../components/pages";

export default function HelloWorld() {
  return (
    <main>
      <div id="Ref">
        <h1>Here,  About page.</h1>
        <p>このページは<a href="https://chat.openai.com/chat">ChatGPT</a>にアドバイスを受けて作成しました。<br />またCopilotの協力も当然に受けています。</p>
        <hr />
        <PageBlock />
      </div>
    </main>
  );
};
