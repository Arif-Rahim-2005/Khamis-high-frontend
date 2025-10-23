import AdminHeader from "../components/AdminHeader.jsx";

const SecurityPage = () => {
  return (
    <>
      <AdminHeader />
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
        <h1 className="text-[200px] font-extrabold leading-none text-green-700">
          404
        </h1>
        <p className="mt-4 text-2xl text-green-700 font-semibold">
          You are not authorized to access this page.
        </p>
      </section>
    </>
  );
};

export default SecurityPage;
