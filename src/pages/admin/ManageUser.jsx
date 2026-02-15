import { useEffect, useState } from 'react';
import WordEditor from '../../app/ComponentSupport/WordEditor';
import '../../style/ManagerProduct.scss'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../../app/ComponentSupport/functions';
import ExportExcelButton from '../../app/ComponentSupport/ExportButton';
import { getCategoryALl } from '../../services/CategoryService';
import axiosAdmin from '../../services/axiosAdmin';
import { blockUser, getUserALl, unBlockUser } from '../../services/UserService';
const  ManageUser = () => {
    const dispatch = useDispatch();
    const [listUsers, setlistUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [useParams, setUseParams] = useState({
        product_name: ''
    });
    const [loadding, setLoadding] = useState(false);
    const [limit, setLimit] = useState(7);
    const [product, setProduct] = useState({
        id: undefined,
        code: "",
        name: "",
        slug: 'Tạo tự động',
        property: "",
        thumbnail: "",
        rate_descriptions: "",
        affilate_tiktok_link: "",
        affilate_shopee_link: "",
        affilate_lazada_link: "",
    });
    const [listCategories, setListCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    const getDataWordToThumnail = (content) => {
       product.thumbnail = content;
       setProduct(product)
    }
    const getDataWordToProperty = (content) => {
       product.property = content;
       setProduct(product)
    }
    const getDataWordToRate = (content) => {
       product.rate_descriptions = content;
       setProduct(product)
    }
    const [dataExport, setDataExport] = useState([])
    const setUserDefault = () => {
        setProduct({
            id: undefined,
            code: "",
            name: "",
            property: "",
            thumbnail: "",
            slug: 'Tạo tự động',
            rate_descriptions: "",
            affilate_tiktok_link: "",
            affilate_shopee_link: "",
            affilate_lazada_link: "",
        })
    }
    const handleEdit = (product) => {
        setProduct({
            ...product
        })
        setShowModal(true)
        setUpdateModal(true)
    }
    const getUsers = async () => {
        setLoadding(true)
        const products = await getUserALl(useParams,page, limit); 
        
        if(products){
            setlistUsers(products.data)
            setTotalPage(products.meta.pagination.total_pages)
        }
        setLoadding(false)
    }
     const getCategory = async () => {
        setLoadding(true)
        const categories = await getCategoryALl([],page, limit); 
        
        if(categories){
            setListCategories(categories.data)
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


    //Create, Update, Delete
   
    const updateBlockUser = async (user_id) => {
       const re = await blockUser(dispatch, user_id);
            // getUsers()
    }
    const updateUnBlockUser = async (user_id) => {
       await unBlockUser(dispatch, user_id);
            // getUsers()
    }
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
                                        <th>ID</th>
                                        <th>Tên tài khoản</th>
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
                                                    <td>{index_item + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <div className="btn-table-item" onClick={() => handleEdit(item)}> <i class="bi bi-pencil-square"></i> </div>
                                                        <div className="btn-table-item" onClick={() => deleteById(item.id)}><i class="bi bi-x-circle"></i></div>
                                                        <div className="btn-table-item" onClick={() => updateBlockUser(item.id)}>Chặn</div>
                                                        <div className="btn-table-item" onClick={() => updateUnBlockUser(item.id)}>Mở chặn</div>
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
                                            Slug:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input className="manage-box-modal-body-control-body-input" type="text" value={product.slug} disabled/>
                                        </div>
                                    </div>

                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Tên sản phẩm:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input className="manage-box-modal-body-control-body-input" type="text" value={product.name} onChange={(e) => {
                                                setProduct({
                                                    ...product,
                                                    name: e.target.value
                                                })
                                            }}/>
                                        </div>
                                    </div>
                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Loại sản phẩm:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <select className="manage-box-modal-body-control-body-input" onChange={(e) => {
                                                setProduct({
                                                    ...product,
                                                    category_code: e.target.value
                                                }) 
                                            }}>
                                                <option>Loại sản phẩm</option>
                                                {listCategories && listCategories.length > 0 && listCategories.map((item) => {
                                                    return (<option selected={product.category?.code === item.code} value={item.code}>{item.name}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Link review:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input className="manage-box-modal-body-control-body-input" type="text" value={product.review_link} onChange={(e) => {
                                                setProduct({
                                                    ...product,
                                                    review_link: e.target.value
                                                })
                                            }}/>
                                        </div>
                                    </div>
                                     <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Loại link review:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <select className="manage-box-modal-body-control-body-input" onChange={(e) => {
                                                setProduct({
                                                    ...product,
                                                    type_review_link: e.target.value
                                                }) 
                                            }}>
                                                <option>Chọn loại link review</option>
                                                    <option selected={product.type_review_link === "youtube"} value="youtube">Youtube</option>
                                                    <option selected={product.type_review_link === "tiktok"} value="tiktok">Tiktok</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Link review 2:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input className="manage-box-modal-body-control-body-input" type="text" value={product.review_link2} onChange={(e) => {
                                                setProduct({
                                                    ...product,
                                                    review_link2: e.target.value
                                                })
                                            }}/>
                                        </div>
                                    </div>
                                     <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Loại link review 2:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <select className="manage-box-modal-body-control-body-input" onChange={(e) => {
                                                setProduct({
                                                    ...product,
                                                    type_review_link2: e.target.value
                                                }) 
                                            }}>
                                                <option>Chọn loại link review</option>
                                                    <option selected={product.type_review_link2 === "youtube"} value="youtube">Youtube</option>
                                                    <option selected={product.type_review_link2 === "tiktok"} value="tiktok">Tiktok</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Thumnail:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            {/* <input type='file' onChange={(e) => handleUploadThumbail(e)}/> */}
                                            <input className="manage-box-modal-body-control-body-input" type="text" value={product.thumbnail} onChange={(e) => {
                                                setProduct({
                                                    ...product,
                                                    thumbnail: e.target.value
                                                })
                                            }}/>
                                        </div>
                                    </div>
                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Đánh giá nhanh:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <WordEditor content={product.property} getDataWord={getDataWordToRate}/>
                                        </div>
                                    </div>
                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Thuộc tính:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <WordEditor content={product.rate_descriptions} getDataWord={getDataWordToProperty}/>
                                        </div>
                                    </div>
                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                           Shoppee Link:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input className="manage-box-modal-body-control-body-input" type="text" value={product.affilate_shopee_link} onChange={(e) => {
                                                setProduct({
                                                    ...product,
                                                    affilate_shopee_link: e.target.value
                                                })
                                            }}/>
                                        </div>
                                    </div>
                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                           Lazada Link:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input className="manage-box-modal-body-control-body-input" type="text" value={product.affilate_lazada_link} onChange={(e) => {
                                                setProduct({
                                                    ...product,
                                                    affilate_lazada_link: e.target.value
                                                })
                                            }}/>
                                        </div>
                                    </div>
                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Tiktok Link:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input className="manage-box-modal-body-control-body-input" type="text" value={product.affilate_tiktok_link} onChange={(e) => {
                                                setProduct({
                                                    ...product,
                                                    affilate_tiktok_link: e.target.value
                                                })
                                            }}/>
                                        </div>
                                    </div>
                                    <div className="manage-box-modal-body-control">
                                        <div className={`manage-box-modal-btn ${product.id ? 'disabled' : ''}`} onClick={() => create()}>Tạo mới</div>
                                        <div className={`manage-box-modal-btn ${updateModal ? '' : 'disabled'}`} onClick={() => update()}>Cập nhật</div>
                                        <div className="manage-box-modal-btn" onClick={() => deleteById(product.id)}>Xóa</div>
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