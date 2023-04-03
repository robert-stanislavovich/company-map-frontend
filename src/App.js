import { UIView } from '@uirouter/react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import './App.css';
import Header from './component/Header';
import { messages } from './i18n/messages';
import { mainState } from './mobx/mainState';

import Fade from 'react-reveal/Fade';
import { Spinner } from 'react-bootstrap';

const App = observer((props) => {
  useEffect(() => {
    console.log(mainState.token);
  }, []);

  return (
    <IntlProvider
      messages={messages[mainState.locales]}
      locale={mainState.locales}
      defaultLocale={mainState.locales}
    >
      <div className="App">
        <header className="App-header">
          <Header />

          <Fade big>
            <UIView></UIView>
          </Fade>
        </header>
      </div>
    </IntlProvider>
  );
});

export default App;
