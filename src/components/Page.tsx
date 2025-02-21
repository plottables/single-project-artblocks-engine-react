import Container from '@mui/material/Container';
import Header from 'components/Header';
import React from "react";


interface Props {
  children: React.ReactNode;
}

const Page = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>
        <Container sx={{
          paddingTop: 3,
        }}>
          { children }
        </Container>
      </main>
    </>
  );
}

export default Page;
