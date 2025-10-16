import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminSystemsDropdown from "../components/AdminSystemdropdown";
import AdminDepartmentsDropdown from "../components/departmentsDropdown";
import SubjectsDropdown from "../components/SubjectsDropdown";
import TracksPage from "../components/TrackDropdown";
import AdminUsersPanel from "../components/AdminUserdropdown";
import ClubsDropdown from "../components/clubs";

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
          <ClubsDropdown />

          <Footer />
        </div>
      </>
    );
}
    
export default AdminPage