type Props = {
  children: React.ReactNode;
};

const PublicLayout = ({ children }: Props) => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-linear-(--color-background)">
      {children}
    </main>
  );
};

export default PublicLayout;
