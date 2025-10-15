import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminSystemsDropdown from "../components/AdminSystemdropdown";
import AdminDepartmentsDropdown from "../components/departmentsDropdown";
import SubjectsDropdown from "../components/SubjectsDropdown";
import TracksPage from "../components/TrackDropdown";
import AdminUsersPanel from "../components/AdminUserdropdown";

const AdminPage = () => {
    return (
      <>
        <div className="bg-gradient-to-b from-white to-gray-200">
          <Header />
          <AdminUsersPanel />
          <AdminSystemsDropdown />
          <AdminDepartmentsDropdown />
          <TracksPage />
          <SubjectsDropdown />

          <Footer />
        </div>
      </>
    );
}
    
export default AdminPage