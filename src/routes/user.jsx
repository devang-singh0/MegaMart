import Register from "../components/register/register.jsx";
import { useSelector } from "react-redux";
import Profile from "../components/user/user.jsx";
export default function User() {
    let user = useSelector(state => state.user);
    return (
        user?.fullName ? <Profile /> : <Register />
    )
}