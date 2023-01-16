import { TailSpin } from 'react-loader-spinner';
import styled from '@emotion/styled';

export const Loader = () => {
  return (
    <LoaderWraper>
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        loading={true}
      />
      ;
    </LoaderWraper>
  );
};




//////////style////////////////

const LoaderWraper = styled.div`
  display: flex;
  justify-content: center;
`;
