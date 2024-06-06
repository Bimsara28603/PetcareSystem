
//icons
import { CgProfile } from "react-icons/cg";
import { LuDog } from "react-icons/lu";

const DasboardNavBar = ({loggedIn, username, title}) => {
    return ( 
        <>
            { loggedIn && (
                <div className="navBar">
                    <div className="navBarLogo"><LuDog /></div>
                    <div className="navBarName"><h2>{title}</h2></div>
                    <div className="navBarProfile">
                        <div className="navBarProfileIcon"><CgProfile /></div>
                        <div className="navBarProfileName">{username}</div>
                    </div>
                </div>
            )}
        </>
     );
}
 
export default DasboardNavBar;