import { useState } from 'react';
import WordEditor from '../../app/ComponentSupport/WordEditor';
import '../../style/ManagerProduct.scss'
import { useFetch } from '../../services/useFetch';
const  ManageProduct = () => {

    const [listProducts, setListProducts] = useState([]);
    const [product, setProduct] = useState({
        id: undefined,
        code: "",
        name: "",
        property: "",
        affilate_tiktok_link: "",
        affilate_shoppee_link: "",
        affilate_lazada_link: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    const getDataWord = (content) => {
       product.property = content;
       setProduct(product)
    }
    const handleEdit = (product) => {
        setProduct({
            id: product.id,
            code: product.code,
            name: product.name,
            property: product.property
        })
        setShowModal(true)
        setUpdateModal(true)
    }
    return (
        <div className="manage-box">
            <div className="manage-box-title">QUẢN LÝ SẢN PHẨM</div>
                <div className="manage-box-filter">
                    <div className="manage-box-filter-control">
                        <div className="manage-box-filter-control-item">
                            <div className="manage-box-filter-control-item-title">
                                Mã sản phẩm:
                            </div>
                            <div className="manage-box-filter-control-item-input">
                                <input type="text" placeholder='Vui lòng nhập mã sản phẩm cần tìm' />
                            </div>
                        </div>
                        <div className="manage-box-filter-control-item">
                            <div className="manage-box-filter-control-item-title">
                                Tên sản phẩm:
                            </div>
                            <div className="manage-box-filter-control-item-input">
                                <input type="text" placeholder='Vui lòng nhập tên sản phẩm cần tìm' />
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
                                            setProduct({
                                                id: undefined,
                                                code: "",
                                                name: "",
                                                property: ""
                                            })
                                            setUpdateModal(false)
                                            setShowModal(true)
                                        }}>
                                Thêm
                            </div>
                             <div className="manage-box-content-modal-item">
                                Cập nhật lại dữ liệu
                            </div>
                        </div>
                        <div className="manage-box-body">
                            <table className="table table-bordered">
                                 <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Mã sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>ALRV-IP15PM128</td>
                                            <td>IPHONE 15 PROMAX 128GB</td>
                                            <td>
                                                <div className="btn-table-item" onClick={() => handleEdit({
                                                    id: 1,
                                                    code: "ALRV-IP15PM128",
                                                    name: "IPHONE 15 PROMAX 128GB",
                                                    property: "Màn hình"
                                                })}>Chỉnh sửa</div>
                                                <div className="btn-table-item">Xóa</div>
                                            </td>
                                        </tr>
                                        
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
                                            Mã sản phẩm:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input className="manage-box-modal-body-control-body-input" type="text" value={product.code} onChange={(e) => {
                                                setProduct({
                                                    ...product,
                                                    code: e.target.value
                                                })
                                            }}/>
                                        </div>
                                    </div>

                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                            Têm sản phẩm:
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
                                            Thumnail:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <WordEditor content={product.property} getDataWord={getDataWord}/>
                                        </div>
                                    </div>
                                    <div className="manage-box-modal-body-control">
                                        <div className="manage-box-modal-body-control-title">
                                           Shoppee Link:
                                        </div>
                                        <div className="manage-box-modal-body-control-body">
                                            <input className="manage-box-modal-body-control-body-input" type="text" value={product.affilate_shoppee_link} onChange={(e) => {
                                                setProduct({
                                                    ...product,
                                                    affilate_shoppee_link: e.target.value
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
                                        <div className="manage-box-modal-btn" >Tạo mới</div>
                                        <div className={`manage-box-modal-btn ${updateModal ? '' : 'disabled'}`}>Cập nhật</div>
                                        <div className="manage-box-modal-btn">Xóa</div>
                                        <div className="manage-box-modal-btn">Làm mới</div>
                                    </div>

                                </div>
                            </div>
                        }
                </div>
                <div className="manage-box-paging">
                    <div className="manage-box-paging-item">
                        Trang đầu
                    </div>
                    <div className="manage-box-paging-item">
                        Trang trước
                    </div>
                    <div className="manage-box-paging-item">
                        1 / 2
                    </div>
                     <div className="manage-box-paging-item">
                        Trang tiếp theo
                    </div>
                     <div className="manage-box-paging-item">
                        Trang cuối
                    </div>
                </div>
        </div>
    )
}
export default ManageProduct;