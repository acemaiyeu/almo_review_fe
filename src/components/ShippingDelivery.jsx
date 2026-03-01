import '../style/LocalPage.scss'

const ShippingDelivery = () => {

    return (
        <div className="almo-container">
                <div className="almo-container-header">Chính sách Vận chuyển - Trả hàng - Hoàn tiền</div>
                <div className="almo-container-content">
                    <div className="almo-container-content-body">
                       <div className="almo-container-content-title">1. Chính sách vận chuyển</div>
                                            <div className="almo-container-content-body">
                                                <ul>
                                                    <li>Hàng sẽ được gửi qua bên thứ 3 và tiền vận chuyển sẽ do bên khách hàng chi trả</li>
                                                </ul>
                                            </div>
                                            <div className="almo-container-content-title">2. Chính sách trả hàng và hoàn tiền</div>
                                            <div className="almo-container-content-body">
                                                <ul>
                                                    <li><b>Sản phẩm: </b> Do sản phẩm đã qua sử dụng tối thiểu 1 tháng nên sẽ nhận trả hàng khi ngoại hình khác với trước khi giao (Cần có video khui hàng)</li>

                                                    <li><b>Số tiền hoàn lại: </b>90% số tiền đã đã thanh toán (không tính tiền vận chuyển)</li>
                                                </ul>
                                            </div>
                    </div>
                </div>
        </div>
    )
}

export default ShippingDelivery;