import '../style/LocalPage.scss'

const InspectionPolicy = () => {

    return (
        <div className="almo-container">
                <div className="almo-container-header">Chính sách Kiểm hàng, Đổi trả & Bảo hành (Dành cho máy Review)</div>
                <div className="almo-container-content">
                    <div className="almo-container-content-body">
                        <ul>
                            <li>
                                <b>Tình trạng sản phẩm: </b> Là máy đã qua sử dụng để Review, tình trạng ngoại hình và hiệu năng được mô tả đúng trong Video/Bài viết.
                            </li>
                            <li>
                                <b>Chế độ bảo hành: </b>Chúng tôi sẽ chịu trách nhiệm trong vòng 7 ngày cho phép trả hàng và hoàn 90% tiền.
                            </li>
                            <li>
                                <b>Hình thức thanh toán & Giao hàng: </b> Đối với hình thức thanh toán sẽ nhận tiền COD và phí ship là khách hàng chịu
                            </li>
                        </ul>
                    </div>
                </div>
        </div>
    )
}

export default InspectionPolicy;