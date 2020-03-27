<template>
    <div>
        <b-row class="pcenter m-0 mt-5">
            <b-card no-body class="overflow-hidden border-0 rounded-0">
                <b-row no-gutters>
                    <b-col md="6">
                        <b-card-img
                            :src="require('@/assets/images/opportunity_1.webp')"
                            class="rounded"
                        ></b-card-img>
                    </b-col>
                    <b-col md="6">
                        <b-card-body title="Nhận thông báo về những nơi đã đến thăm của trẻ">
                            <b-card-text>
                                Nhận thông báo khi trẻ về nhà, đến trường hoặc đến nơi nào đó.
                                Đừng lo lắng về bé và đừng làm phiền trẻ bằng các cuộc gọi thường xuyên
                            </b-card-text>
                        </b-card-body>
                    </b-col>
                </b-row>
            </b-card>
        </b-row>

        <b-row class="pcenter m-0 mt-5">
            <b-card no-body class="overflow-hidden border-0 rounded-0">
                <b-row no-gutters>
                    <b-col md="6">
                        <b-card-body title="Theo dõi lịch di chuyển của trẻ">
                            <b-card-text>Xem lịch sử chính xác của các hoạt động trong ngày để biết trẻ đi những đâu</b-card-text>
                        </b-card-body>
                    </b-col>
                    <b-col md="6">
                        <b-card-img
                            :src="require('@/assets/images/opportunity_2.webp')"
                            class="rounded"
                        ></b-card-img>
                    </b-col>
                </b-row>
            </b-card>
        </b-row>

        <b-row class="m-0 mt-5">
            <h1
                class="react-reveal-1 mx-auto"
                style="text-align:center;"
            >Cách bắt đầu sử dụng ứng dụng</h1>
        </b-row>
        <b-row class="m-0">
            <h2
                class="react-reveal-2 mx-auto"
                style="text-align:center;"
            >Bạn sẽ chỉ cần 3-5 phút, điện thoại của trẻ em</h2>
        </b-row>

        <b-card-group deck class="pcenter m-0 mt-5">
            <b-card align="center" class="border-0 rounded-0">
                <b-card-img
                    :src="require('@/assets/images/step_download.svg')"
                    class="rounded-0"
                    width="350px"
                    height="350px"
                ></b-card-img>
                <b-card-text>Tải xuống ứng dụng trên điện thoại của bạn</b-card-text>
            </b-card>
            <b-card align="center" class="border-0 rounded-0">
                <b-card-img
                    :src="require('@/assets/images/step_start.svg')"
                    class="rounded-0"
                    width="350px"
                    height="350px"
                ></b-card-img>
                <b-card-text>Tải xuống ứng dụng «Trò chuyện với cha mẹ» trên App Store hoặc Google Play trên điện thoại của con bạn</b-card-text>
            </b-card>
            <b-card align="center" class="border-0 rounded-0">
                <b-card-img
                    :src="require('@/assets/images/step_chat_watch.svg')"
                    class="rounded-0"
                    width="350px"
                    height="350px"
                ></b-card-img>
                <b-card-text>Xác nhận quyền truy cập vào thiết bị của con bạn và sử dụng tất cả các tính năng của dịch vụ</b-card-text>
            </b-card>
        </b-card-group>

        <b-row class="m-0 mt-5">
            <h1
                class="react-reveal-1 mx-auto"
                style="text-align:center;"
            >Hàng triệu phụ huynh đã sử dụng «Find My Kids»</h1>
        </b-row>
        <b-row class="m-0">
            <h2
                class="react-reveal-2 mx-auto"
                style="text-align:center;"
            >Tải xuống ứng dụng miễn phí cho con bạn</h2>
        </b-row>

        <b-card-img
            :src="require('@/assets/images/download_googleplay.svg')"
            class="rounded-0"
            width="200px"
            height="64px"
        ></b-card-img>
    </div>
</template>

<script>
export default {};
</script>

<style>
.pcenter {
    padding-left: 15%;
    padding-right: 15%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 0;
}

.react-reveal-1 {
    color: #3d444d;
    font-size: 31px;
    line-height: 1.4;
    font-weight: 600;
    letter-spacing: 0.2px;
    margin: 30px 0;
}

.react-reveal-2 {
    color: #3d444d;
    font-size: 18px;
    line-height: 1.5;
    font-weight: 400;
    letter-spacing: 0.2px;
    margin-bottom: 20px;
}
</style>