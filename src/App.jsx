import ApologyApp from './ApologyApp';
import DateApp from './DateApp';

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const isDateApp = urlParams.get('app') === 'date';

  return isDateApp ? <DateApp /> : <ApologyApp />;
}