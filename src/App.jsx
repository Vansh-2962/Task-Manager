import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<TaskList />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
