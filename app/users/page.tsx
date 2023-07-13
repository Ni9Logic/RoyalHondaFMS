import Navbar from './Navbar';
import Footer from './Footer';
import UserMenu from './UserMenu';


export default async function page() {

    return (
        <>
            <Navbar />
            <UserMenu />
            <Footer />
        </>
    )
}
