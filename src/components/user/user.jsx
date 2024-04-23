import './user.scss'
import axios from '../../services/axios';
import { setAlert } from "../../store/slices/alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function User() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let user = useSelector(state => state.user);
    let [state, setState] = useState({ userImg: `${process.env.REACT_APP_SERVER_URL}/profileImages/${user?.profileImgURL}` });
    function logout(e) {
        axios.get(`/user/logout`).then(res => {
            dispatch(setAlert({ data: res.data.msg, type: res.data.success ? "success" : "danger" }));
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }).catch(err => {
            dispatch(setAlert({ data: 'some error occurred', type: "danger" }));
        });
    };
    function update(e) {
        e.preventDefault();
        let form = e.target;
        if (form[0].value == "" && form[1].value == "" && form[2].value == "" && form[4].value == "") return dispatch(setAlert({ data: "Please change atleast one field", type: "danger" }));
        let formData = new FormData();
        formData.append('fullName', form[1].value);
        formData.append('email', form[2].value);
        formData.append('password', form[3].value);
        formData.append('newPassword', form[4].value);
        formData.append('profileImg', form[0].files[0]);
        axios.patch(`/user`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        }).then(res => {
            dispatch(setAlert({ data: res.data.msg, type: res.data.success ? "success" : "danger" }));
            navigate('/user');
        }).catch(err => {
            dispatch(setAlert({ data: 'some error occurred', type: "danger" }));
        });
    }
    function updateImg(e) {
        if (e.target.files[0].size > 1024 * 512) {
            dispatch(setAlert({ data: "Image size should be less than 512kb", type: "danger" }));
            return e.target.value = "";
        } else {
            setState({ userImg: URL.createObjectURL(e.target.files[0]) });
        }
    }
    function handleActiveTab(e, i) {
        let tabs = document.querySelectorAll('.bottom button');
        tabs.forEach(tab => tab.classList.remove('active'));
        tabs[i].classList.add('active');
        i == 1 && document.querySelector('.top').classList.add('active');
        i == 0 && document.querySelector('.top').classList.remove('active');
    }
    return (
        <section className="user">
            <main>
                <div className="top">
                    <div className="profile">
                        <img className="banner" src="https://png.pngtree.com/background/20220714/original/pngtree-cute-pastel-background-aesthetic-picture-image_1603835.jpg" alt="" />
                        <img className="profileImg" src={`${process.env.REACT_APP_SERVER_URL}/profileImages/${user?.profileImgURL}`} alt="" />
                        <h3>{user?.fullName}</h3>
                        <p>{user?.email}</p>
                        <h4 onClick={() => navigate('/orders')}>Track Your Orders</h4>
                        <button onClick={logout}>Log Out</button>
                    </div>
                    <div className="update">
                        <form onSubmit={update}>
                            <label htmlFor="file">
                                <img src={state.userImg} alt="" />
                            </label>
                            <input type="file" id="file" name="profileImg" onChange={updateImg} accept=".jpg,.jpeg,.png" />
                            <label>Full Name</label>
                            <input type="text" name="name" minLength={3} maxLength={10} />
                            <label>Email</label>
                            <input type="email" name="email" maxLength={20} />
                            <label>Old Password</label>
                            <input type="password" name="password" required />
                            <label>New Password</label>
                            <input type="password" name="newPassword" minLength={4} maxLength={8} />
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </div>
                <div className="bottom">
                    <button className="active" onClick={(e) => handleActiveTab(e, 0)}>Profile</button>
                    <button onClick={(e) => handleActiveTab(e, 1)}>Update</button>
                </div>
            </main>
        </section>
    );
}