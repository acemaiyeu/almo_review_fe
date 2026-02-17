import { Link } from 'react-router-dom';
import '../../style/MenuAdmin.scss'
import { useSelector } from 'react-redux';

const MenuAdmin = () => {

    const profile = useSelector((state) => state.profile);
    return (
        <div className="menu-admin-container">
            {profile.email !== '' &&
                <>
                <div className="menu-user-container">
                    <div className="menu-user-form">
                         <div className='menu-user-avatar'>
                                    <img className="avatar" alt='avatar' src={'https://i.pinimg.com/736x/27/56/6e/27566e92e158a7d2c175948a0a7321b0.jpg'} loading='lazy'/>
                                </div>
                                <div className='menu-user-title'>
                                    <Link to={"/admin/"}>{profile.name}</Link>
                                </div>
                    </div>
                    <div className="menu-user-fucntions">
                         <Link to={'/admin/logout'}><p>Đăng xuất</p></Link>
                    </div>
                </div>
                <div className="menu-item">
                        <div className="menu-item-icon">
                            <i class="bi bi-device-ssd"></i>
                        </div>
                        <div className="menu-item-title">
                            <Link to="/admin/manage-products">Quản lý sản phẩm</Link></div>
                </div>
                <div className="menu-item">
                        <div className="menu-item-icon">
                            <i class="bi bi-device-ssd"></i>
                        </div>
                        <div className="menu-item-title">
                            <Link to="/admin/manage-categories">Quản lý loại sản phẩm</Link></div>
                </div>
                <div className="menu-item">
                        <div className="menu-item-icon">
                            <i class="bi bi-device-ssd"></i>
                        </div>
                        <div className="menu-item-title">
                            <Link to="/admin/manage-promotions">Quản lý chương trình khuyến mãi</Link>
                        </div>
                </div>
                 <div className="menu-item">
                        <div className="menu-item-icon">
                            <i class="bi bi-file-person"></i>
                        </div>
                        <div className="menu-item-title"><Link to="/admin/manage-users">Quản lý tài khoản</Link></div>
                </div>
                </>
                }
        </div>
    )
}
export default MenuAdmin;