import { useEffect, useState } from 'react';
import WordEditor from '../../app/ComponentSupport/WordEditor';
import '../../services/CategoryService.js'
import { createCategory, deleteCategory, getCategoryALl, updateCategory } from '../../services/CategoryService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../../app/ComponentSupport/functions';
import ExportExcelButton from '../../app/ComponentSupport/ExportButton';
const  ManageCategory = () => {
    const dispatch = useDispatch();
    const [listCategorys, setListCategorys] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [useParams, setUseParams] = useState({
        category_name: ''
    });
    const [loadding, setLoadding] = useState(false);
    const [limit, setLimit] = useState(10);
    const [category, setCategory] = useState({
        id: undefined,
        code: "",
        name: "",
        slug: 'Tạo tự động',
        property: "",
        thumbnail: "",
        rate_descriptions: "",
        affilate_tiktok_link: "",
        affilate_shoppee_link: "",
        affilate_lazada_link: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    const getDataWordToThumnail = (content) => {
       category.thumbnail = content;
       setCategory(category)
    }
    const getDataWordToProperty = (content) => {
       category.property = content;
       setCategory(category)
    }
    const getDataWordToRate = (content) => {
       category.rate_descriptions = content;
       setCategory(category)
    }
    const setCategoryDefault = () => {
        setCategory({
            code: "",
            name: "",
            property: "",
            thumbnail: "",
            slug: 'Tạo tự động',
            rate_descriptions: "",
            affilate_tiktok_link: "",
            affilate_shoppee_link: "",
            affilate_lazada_link: "",
        })
    }
    const handleEdit = (category) => {
        setCategory({
            ...category
        })
        setShowModal(true)
        setUpdateModal(true)
    }
    const getCategory = async () => {
        setLoadding(true)
        const data = await getCategoryALl([],page, limit); 
        
        if(data){
            setListCategorys(data.data)
            setTotalPage(data.meta.pagination.total_pages)
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
        if(page <= 0){
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
        getCategory()
    }, [listCategorys?.length, page])


    //Create, Update, Delete
    const create = async () => {
        if(category.code){
            toast.error("Chức năng không thể sử dụng")
            return;
        }
        const data_temp = await createCategory(dispatch, category);
        if(data_temp){
            setShowModal(false)
            getCategory()
            setCategoryDefault()
        }
       
    }
    const update = async () => {
        if(!updateModal){
            toast.error("Chức năng không thể sử dụng")
            return;
        }
        const data_temp = await updateCategory(dispatch, category);
        if(data_temp){
            setShowModal(false)
            setCategoryDefault()
            getCategory()
        } 
    }
    const deleteById = async (code) => {
        const data_temp = await deleteCategory(dispatch, code);
        if(data_temp){
            setCategoryDefault()
            
        } 
        getCategory()
    }

    const handleUploadThumbail = async (event) => {
        const url = uploadImage(dispatch ,event);
        if(url){
            category.thumbnail = url
            setCategory(category)
        }
    };
    return (
        <div className="manage-box">
            <div className="manage-box-title">QUẢN LÝ SẢN PHẨM</div>
                <div className="manage-box-filter">
                    <div className="manage-box-filter-control">
                       
                        <div className="manage-box-filter-control-item">
                            <div className="manage-box-filter-control-item-title">
                                Tên
                            </div>
                            <div className="manage-box-filter-control-item-input">
                                <input type="text" placeholder='Vui lòng nhập tên sản phẩm cần tìm' value={useParams.category_name} onChange={(e) => { setUseParams({ ...useParams, Category_name: e.target.value}) }}/>
                            </div>
                        </div>
                        <div className="manage-box-filter-control-item">
                            <input className="btn-submit" type='submit' value={"Tìm kiếm"}/>
                        </div>
                    </div>
                </div>
                <div className="manage-box-content">
                        <div className="manage-box-title">Dữ liệu</div>
                        <div className="manage-box-content-modal">
                            <div className="manage-box-content-modal-item" onClick={() => {
                                           setCategoryDefault()
                                            setUpdateModal(false)
                                            setShowModal(true)
                                        }}>
                                Thêm
                            </div>
                            <div className="manage-box-content-modal-item" onClick={() => getCategory()}>
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
                                        <th>Mã</th>
                                        <th>Tên</th>
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
                                        {listCategorys && listCategorys.length > 0 && listCategorys.map((item, index_item) => {
                                            return (
                                                <tr>
                                                    <td>{index_item + 1}</td>
                                                    <td>{item.code}</td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <div className="btn-table-item" onClick={() => handleEdit(item)}> <i class="bi bi-pencil-square"></i> </div>
                                                        <div className="btn-table-item" onClick={() => deleteById(item.code)}><i class="bi bi-x-circle"></i></div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
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
                                <div className="manage-box-modal-title">CHỈNH SỬA SẢN PHẨM</div>
                                <div className="manage-box-modal-body">
                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Mã:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input className="manage-box-modal-body-control-body-input" type="text" value={category.code} disabled={updateModal}  onChange={(e) => {
                                                if(!updateModal){
                                                    setCategory({
                                                        ...category,
                                                        code: e.target.value
                                                    })
                                                }  
                                            }}/>
                                        </div>
                                    </div>

                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Tên loại sản phẩm:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input className="manage-box-modal-body-control-body-input" type="text" value={category.name} onChange={(e) => {
                                                setCategory({
                                                    ...category,
                                                    name: e.target.value
                                                })
                                            }}/>
                                        </div>
                                    </div>

                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Thumnail:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            {/* <input type='file' onChange={(e) => handleUploadThumbail(e)}/> */}
                                            <input className="manage-box-modal-body-control-body-input" type="text" value={category.thumbnail} onChange={(e) => {
                                                setCategory({
                                                    ...category,
                                                    thumbnail: e.target.value
                                                })
                                            }}/>
                                        </div>
                                    </div>
                                    <div className="manage-box-modal-body-control">
                                        <div className={`manage-box-modal-btn ${category.id ? 'disabled' : ''}`} onClick={() => create()}>Tạo mới</div>
                                        <div className={`manage-box-modal-btn ${updateModal ? '' : 'disabled'}`} onClick={() => update()}>Cập nhật</div>
                                        <div className="manage-box-modal-btn" onClick={() => deleteById(category.id)}>Xóa</div>
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
export default ManageCategory;