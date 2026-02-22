import { useEffect, useState } from 'react';
import WordEditor from '../../app/ComponentSupport/WordEditor';
import '../../style/ManagerProduct.scss'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../../app/ComponentSupport/functions';
import ExportExcelButton from '../../app/ComponentSupport/ExportButton';
import { getCategoryALl } from '../../services/CategoryService';
import axiosAdmin from '../../services/axiosAdmin';
import { blockUser, createUser, deleteUser, getUserALl, unBlockUser, updateUser } from '../../services/UserService';
import { getRoleALl } from '../../services/RoleService';
const  ManageUser = () => {
    const dispatch = useDispatch();
    const [listUsers, setlistUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [useParams, setUseParams] = useState({
        product_name: ''
    });
    const [listRole, setListRole] = useState([]);
    const [loadding, setLoadding] = useState(false);
    const [limit, setLimit] = useState(7);
    const [user, setUser] = useState({
        id: undefined,
        email: "",
        name: "",
        phone: "",
        role_id: "",
        block: false,
    });
    const [listCategories, setListCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    const getDataWordToThumnail = (content) => {
       user.thumbnail = content;
       setUser(user)
    }
    const getDataWordToProperty = (content) => {
       user.property = content;
       setUser(user)
    }
    const getDataWordToRate = (content) => {
       user.rate_descriptions = content;
       setUser(user)
    }
    const [dataExport, setDataExport] = useState([])
    const setUserDefault = () => {
        setUser({
            id: undefined,
            email: "",
            name: "",
            phone: "",
            role_id: "",
            block: false,
        })
    }
    const handleEdit = (user) => {
        setUser({
            ...user
        })
        setShowModal(true)
        setUpdateModal(true)
    }
    const getUsers = async () => {
        setLoadding(true)
        const users = await getUserALl(useParams,page, limit); 
        
        if(users){
            setlistUsers(users.data)
            setTotalPage(users.meta.pagination.total_pages)
        }
        setLoadding(false)
    }
    const nextPage = () => {
        if(page >= totalPage){
            toast.error("Bạn đã ở trang cuối cùng!")
            return;
        }
        setPage(page + 1)
    }
    const prevPage = () => {
        if(page <= 1){
            toast.error("Bạn đã ở trang đầu tiên!")
            return;
        }
        setPage(page - 1)
    }
    const firstPage = () => {
        setPage(1)
    }
    const lastPage = () => {
        setPage(totalPage)
    }


    useEffect(() => {
        getUsers()
    }, [listUsers?.length, page])

    const changeTextEmail = (email) => {
    if (!email || !email.includes('@')) return email;

    // Tách email thành 2 phần: username và domain
    const [username, domain] = email.split('@');

    // Nếu username quá ngắn (dưới 3 ký tự), chỉ ẩn một phần hoặc hiện hết
    if (username.length <= 2) {
        return `${username[0]}***@${domain}`;
    }

    // Giữ lại 3 ký tự đầu và 2 ký tự cuối (giống ví dụ của bạn)
    const firstPart = username.substring(0, 3);
    const lastPart = username.substring(username.length - 2);
    
    // Tạo chuỗi sao ở giữa (độ dài tùy ý, ở đây mình để 8 dấu *)
    const maskedUsername = `${firstPart}********${lastPart}`;

    return `${maskedUsername}@${domain}`;
};
     const getRoles = async () => {
        if(listRole.length <= 0){
            const roles = await getRoleALl([],1, 1000); 
        
            if(roles){
                setListRole(roles.data)
            }
        }
       
    }

    //Create, Update, Delete
        const create = async () => {
            if(user.id){
                toast.error("Chức năng không thể sử dụng")
                return;
            }
            const data = await createUser(dispatch, user);

                setShowModal(false)
                getUsers()
                setUserDefault()
        }
        const update = async () => {
            if(!updateModal){
                toast.error("Chức năng không thể sử dụng")
                return;
            }
            const data = await updateUser(dispatch, user);
                setShowModal(false)
                getUsers()
                setUserDefault()
        }
        const deleteById = async (id) => {
            await deleteUser(dispatch, id);
                setShowModal(false)
                getUsers()
        }
   
    // const updateBlockUser = async (user_id) => {
    //    const re = await blockUser(dispatch, user_id);
    //         // getUsers()
    // }
    // const updateUnBlockUser = async (user_id) => {
    //    await unBlockUser(dispatch, user_id);
    //         // getUsers()
    // }
    return (
        <div className="manage-box">
            <div className="manage-box-title">QUẢN LÝ TÀI KHOẢN</div>
                <div className="manage-box-filter">
                    <div className="manage-box-filter-control">
                       
                        <div className="manage-box-filter-control-item">
                            <div className="manage-box-filter-control-item-title">
                                ID:
                            </div>
                            <div className="manage-box-filter-control-item-input">
                                <input type="text" placeholder='Vui lòng nhập id cần tìm' value={useParams.id} onChange={(e) => { setUseParams({ ...useParams, id: e.target.value}) }}/>
                            </div>
                        </div>
                         <div className="manage-box-filter-control-item">
                            <div className="manage-box-filter-control-item-title">
                                Tên:
                            </div>
                            <div className="manage-box-filter-control-item-input">
                                <input type="text" placeholder='Vui lòng nhập tên tài khoản cần tìm' value={useParams.name} onChange={(e) => { setUseParams({ ...useParams, name: e.target.value}) }}/>
                            </div>
                        </div>
                        <div className="manage-box-filter-control-item">
                            <div className="manage-box-filter-control-item-title">
                                Email:
                            </div>
                            <div className="manage-box-filter-control-item-input">
                                <input type="text" placeholder='Vui lòng nhập email sản phẩm cần tìm' value={useParams.email} onChange={(e) => { setUseParams({ ...useParams, email: e.target.value}) }}/>
                            </div>
                        </div>
                        <div className="manage-box-filter-control-item">
                            <div className="manage-box-filter-control-item-title">  
                                Số điện thoại:
                            </div>
                            <div className="manage-box-filter-control-item-input">
                                <input type="text" placeholder='Vui lòng nhập SĐT sản phẩm cần tìm' value={useParams.phone} onChange={(e) => { setUseParams({ ...useParams, phone: e.target.value}) }}/>
                            </div>
                        </div>
                        <div className="manage-box-filter-control-item">
                            <input className="btn-submit" type='submit' value={"Tìm kiếm"} onClick={() => getUsers()}/>
                        </div>
                    </div>
                </div>
                <div className="manage-box-content">
                        <div className="manage-box-title">Dữ liệu</div>
                        <div className="manage-box-content-modal">
                            <div className="manage-box-content-modal-item" onClick={() => {
                                           setUserDefault()
                                            setUpdateModal(false)
                                            setShowModal(true)
                                        }}>
                                Thêm
                            </div>
                            <div className="manage-box-content-modal-item" onClick={() => getUsers()}>
                                Cập nhật lại dữ liệu
                            </div>
                            
                            <div className="manage-box-content-modal-item">
                                <select>
                                    <option>10</option>
                                    <option>100</option>
                                    <option>1000</option>
                                </select>
                            </div>
                        </div>
                        <div className="manage-box-body">
                            <table className="table table-bordered">
                                 <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tên tài khoản</th>
                                        <th>Email</th>
                                        <th>Loại tài khoản</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        {loadding && 
                                            <tr>
                                                <td>
                                                    <button class="btn-spinner" type="button" disabled>
                                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                         &nbsp; Đang tải ...
                                                    </button>
                                                </td>
                                            </tr>
                                        }   
                                        {listUsers && listUsers.length > 0 && listUsers.map((item, index_item) => {
                                            return (
                                                <tr>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{changeTextEmail(item.email)}</td>
                                                    <td>{item.role_name}</td>
                                                    <td>
                                                        <div className="btn-table-item" onClick={() => handleEdit(item)}> <i class="bi bi-pencil-square"></i> </div>
                                                        <div className="btn-table-item" onClick={() => deleteById(item.id)}><i class="bi bi-x-circle"></i></div>
                                                      
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        {listUsers.length === 0 && 
                                            <div>Không tìm thấy tài khoản</div>
                                        }
                                    </tbody>
                            </table>
                        </div>

                        {/* Modal */}
                        {showModal &&
                            <div className="manage-box-modal">
                                <div className="manage-box-modal-closed" onClick={() => {
                                    setShowModal(false)
                                }}>
                                    <p>x</p>
                                </div>
                                <div className="manage-box-modal-title">CHỈNH SỬA TÀI KHOẢN</div>
                                <div className="manage-box-modal-body">
                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            ID:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input className="manage-box-modal-body-control-body-input" type="text" value={user.id} disabled/>
                                        </div>
                                    </div>

                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Tên khách hàng:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input disabled={updateModal} className="manage-box-modal-body-control-body-input" type="text" value={user.name} onChange={(e) => {
                                                setUser({
                                                    ...user,
                                                    name: e.target.value
                                                })
                                            }}/>
                                        </div>
                                    </div>

                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Email:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input disabled={updateModal} className="manage-box-modal-body-control-body-input" type="text" value={changeTextEmail(user.email)}/>
                                        </div>
                                    </div>
                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Số điện thoại:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input disabled={updateModal} className="manage-box-modal-body-control-body-input" type="text" value={user.phone}/>
                                        </div>
                                    </div>
                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Mật khẩu:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input disabled={updateModal} className="manage-box-modal-body-control-body-input" type="password" value={updateModal ? "Đã ẩn password" : user.password} 
                                            onChange={(e) => setUser({
                                                ...user,
                                                password: e.target.value
                                            })}
                                            />
                                        </div>
                                    </div>
                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Loại tài khoản:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <select className="manage-box-modal-body-control-body-input" onChange={(e) => {
                                                setUser({
                                                    ...user,
                                                    role_id: e.target.value
                                                }) 
                                            }}
                                            onClick={() => getRoles()}
                                            >
                                                <option>Loại tài khoản</option>
                                                {listRole && listRole.length > 0 && listRole.map((item) => {
                                                    return (<option selected={user.role_code === item.code} value={item.id}>{item.name}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Chặn tài khoản:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input className="manage-box-modal-body-control-body-input" type="checkbox" checked={user.block === true} 
                                            onChange={(e) => setUser({
                                                ...user,
                                                block: !user.is_block
                                            })}
                                            />
                                        </div>
                                    </div>
                                   
                                     <div className="manage-box-modal-body-control">
                                        <div className={`manage-box-modal-btn ${user.id ? 'disabled' : ''}`} onClick={() => create()}>Tạo mới</div>
                                        <div className={`manage-box-modal-btn ${updateModal ? '' : 'disabled'}`} onClick={() => update()}>Cập nhật</div>
                                        <div className="manage-box-modal-btn" onClick={() => deleteById(user.id)}>Xóa</div>
                                        <div className="manage-box-modal-btn">Làm mới</div>
                                    </div>

                                </div>
                            </div>
                        }
                </div>
                <div className="manage-box-paging">
                    <div className={`manage-box-paging-item ${page == 1 ? 'disabled' : ''}`}  onClick={() => firstPage()}>
                        Trang đầu
                    </div>
                    <div className={`manage-box-paging-item ${page == 1 ? 'disabled' : ''}`}  onClick={() => prevPage()}>
                        Trang trước
                    </div>
                    <div className={`manage-box-paging-item`}>
                        {page} / {totalPage}
                    </div>
                     <div className={`manage-box-paging-item ${page == totalPage ? 'disabled' : ''}`}  onClick={() => nextPage()}>
                        Trang tiếp theo
                    </div>
                     <div className={`manage-box-paging-item ${page == totalPage ? 'disabled' : ''}`} onClick={() => lastPage()}>
                        Trang cuối
                    </div>
                </div>
        </div>
    )
}
export default ManageUser;