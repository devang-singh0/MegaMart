import '../register/register.scss'
import axios from '../../services/axios';
import { setAlert } from "../../store/slices/alert";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



export default function NewUser() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    function signup(e) {
        e.preventDefault();
        axios.post(`/user`, {
            fullName: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value,
        }).then((res) => {
            dispatch(setAlert({ data: res.data?.msg, type: res.data?.success ? 'success' : 'danger' }));
            res.data.success && navigate('/');
        }).catch((err) => {
            dispatch(setAlert({ data: 'Some error happened', type: 'danger' }));
            console.log(err);
        })
    }
    function signin(e) {
        e.preventDefault();
        axios.post(`/user/login`, {
            email: e.target[0].value,
            password: e.target[1].value,
        }).then((res) => {
            dispatch(setAlert({ data: res.data?.msg, type: res.data.success ? 'success' : 'danger' }));
            res.data.success && navigate('/');
        }).catch((err) => {
            dispatch(setAlert({ data: 'Some error happened', type: 'danger' }));
            console.log(err);
        })
    }
    function handleActiveTab(e, i) {
        let tabs = document.querySelectorAll('.bottom button');
        tabs.forEach(tab => tab.classList.remove('active'));
        tabs[i].classList.add('active');
        i == 1 && document.querySelector('.top').classList.add('active');
        i == 0 && document.querySelector('.top').classList.remove('active');
    }
    return (
        <section className="register">
            <main>
                <div className="top">
                    <div className="signup">
                        <form onSubmit={signup}>
                            <label>Full Name</label>
                            <input type="text" placeholder="Full Name" required />
                            <label>Email</label>
                            <input type="email" placeholder="Email" required />
                            <label>Password</label>
                            <input type="password" placeholder="Password" required />
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                    <div className="login">
                        <form onSubmit={signin}>
                            <label htmlFor="">Email</label>
                            <input type="email" placeholder="Email" required/>
                            <label htmlFor="">Password</label>
                            <input type="password" placeholder="Password" required/>
                            <button type='submit'>Log In</button>
                        </form>
                    </div>
                </div>
                <div className="bottom">
                    <button className="active" onClick={(e) => handleActiveTab(e, 0)}>Sign Up</button>
                    <button onClick={(e) => handleActiveTab(e, 1)}>Log In</button>
                </div>
            </main>
        </section>
    )
}