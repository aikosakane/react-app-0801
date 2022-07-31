// 🔽 追加（App.jsx 内で使用するためにコンポーネントを呼び出す）
// 🔽 Link を追加
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Omikuji } from "./pages/Omikuji";
import { Janken } from "./pages/Janken";
// 🔽 追加
import { BookCreate } from "./pages/BookCreate";

const App = () => {
  return (
    <BrowserRouter basename="/">
      <h1>react app</h1>
      <ul>
        <li>
          <Link to="/omikuji">おみくじ</Link>
        </li>
        <li>
          <Link to="/janken">じゃんけん</Link>
        </li>
        {/* 🔽 追加 */}
        <li>
          <Link to="/book-create">投稿する</Link>
        </li>
      </ul>
      <hr />
      <Routes>
        <Route path="/omikuji" element={<Omikuji />} />
        <Route path="/janken" element={<Janken />} />
        {/* 🔽 追加 */}
        <Route path="/book-create" element={<BookCreate />} />

      </Routes>
    </BrowserRouter>
  );
};



export default App;