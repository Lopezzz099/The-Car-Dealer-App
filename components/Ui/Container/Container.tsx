import React from 'react';

const Container = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="max-w-screen-lg w-full mx-auto h-screen text-white py-10 flex flex-col gap-10 justify-center px-5">
      {children}
    </div>
  );
};

export default Container;
