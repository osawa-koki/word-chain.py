import PageBlock from "../components/pages";

export default function HelloWorld() {
  return (
    <main>
      <div id="Ref">
        <h1>Here,  About page.</h1>
        <p>学習には以下のサイトをオススメします。</p>
        <ul>
          <li><a href="https://nextjs.org/learn/basics/create-nextjs-app">Next.js公式チュートリアル</a></li>
          <li><a href="https://react-bootstrap.github.io/">React Bootstrap公式ドキュメント</a></li>
          <li><a href="https://www.typescriptlang.org/docs/">TypeScript公式ドキュメント</a></li>
          <li><a href="https://typescriptbook.jp/">サバイバルTypeScript</a></li>
        </ul>
        <hr />
        <PageBlock />
      </div>
    </main>
  );
};
