
const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

    const authLayout = (
        <>
          {children}
        </>
    )

    return authLayout;
}

export default AuthLayout;