import GlobalState from './global/GlobalState';
import Router from './routes/Router';
import { GlobalStyle, Body } from './styles';
import Header from './components/Header';

const App = () => {
    return (
    <>
        <GlobalState>
            <GlobalStyle />
            <Header/>
            <Body>
            <Router />
            </Body>
        </GlobalState>

    </>
    )
}

export default App;
