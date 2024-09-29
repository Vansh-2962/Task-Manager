const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-gradient-to-b from-black via-slate-950 to-black md:h-screen w-full text-white">
        <header className="w-full py-3 text-4xl text-center uppercase font-bold text-cyan-900 font-sans ">
          ---Taskify---
        </header>
        <main className="w-3/4 mx-auto min-h-[86.95vh] md:min-h-[83vh] p-4">{children}</main>
        <footer className="text-center text-cyan-900 ">Made with ❤</footer>
      </div>
    </>
  );
};
export default Layout;
