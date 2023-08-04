type PropsButton = {
  children?: React.ReactNode | React.ReactNode[] | string;
};

export const Button = ({ children }: PropsButton) => {
  return <button>{children}</button>;
};
