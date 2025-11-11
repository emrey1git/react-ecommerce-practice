import "./App.css";
import PageContainer from "./container/pageContainer";
import Header from "./components/Header";
import RouterConfig from "./config/RouterConfig.jsx";
import Loading from "./components/Loading.jsx";

function App() {
  return (
    <>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
      </PageContainer>
    </>
  );
}

export default App;
