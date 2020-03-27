<template>
    <div>
        <b-navbar toggleable="lg" type="light" variant="light" sticky>
            <b-navbar-brand to="">Titi Bank</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item right>Xin chào, Lê Tuấn Anh</b-nav-item>
                    <b-nav-item class="notification" to="#" right>
                        <b-icon icon="bell"></b-icon>
                        <span class="badge">30</span>
                    </b-nav-item>
                    <b-nav-item right>
                        <b-icon icon="power"></b-icon>Đăng xuất
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>