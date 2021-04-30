import "./App.css";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "tailwindcss/tailwind.css";
import Navbar from "./components/Navbar";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content>Content</Content>
    </Layout>
  );
}

export default App;
