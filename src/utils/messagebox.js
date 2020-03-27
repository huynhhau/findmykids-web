export function msg_YN(bvModal, msg, rpl = false) {
    let message = `Bạn có muốn ${msg}?`

    if (rpl) {
        message = msg;
    }

    return bvModal.msgBoxConfirm(
        message,
        {
            title: "Xác nhận!",
            okVariant: "primary",
            okTitle: "Đồng ý",
            cancelTitle: "Đóng"
        }
    );
}

export function msg(bvModal, msg) {
    bvModal.msgBoxOk(
        msg,
        {
            title: "Thông báo lỗi!",
            okTitle: "Đóng",
            headerBgVariant: "danger"
        }
    );
}