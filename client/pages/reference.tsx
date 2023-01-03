import PageBlock from "../components/pages";
import Layout from '../components/Layout';

export default function HelloWorld() {
  return (
    <Layout>
      <main>
        <div id="Ref">
          <h1>Here,  About page.</h1>
          <p>このページは<a href="https://chat.openai.com/chat">ChatGPT</a>にアドバイスを受けて作成しました。<br />またCopilotの協力も当然に受けています。</p>
          <hr />
          <PageBlock />
        </div>
      </main>
    </Layout>
  );
};
