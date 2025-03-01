import { starWarsApi } from '@redux/slices/starWarsApi';
import { wrapper } from 'src/redux/store';

import MainPage from '../components/main/Main';

export default function Main() {
  return <MainPage />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(starWarsApi.endpoints.getAllPeople.initiate(1));

    return {
      props: {},
    };
  }
);
