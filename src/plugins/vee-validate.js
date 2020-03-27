// import { required, confirmed, length, email } from "vee-validate/dist/rules";
import { required } from "vee-validate/dist/rules";
// import { extend } from "vee-validate";
import { extend } from 'vee-validate';

extend("required", {
    ...required,
    message: "{_field_} bắt buộc nhập!"
});

extend('password',{
params: ['target'],
validate(value, {target}) {
    return value === target;
},
message: 'Mật khẩu không trùng khớp!'
});
// extend("email", {
//     ...email,
//     message: "This field must be a valid email"
// });

// extend("confirmed", {
//     ...confirmed,
//     message: "{_field_} không trùng khớp!"
// });

// extend("length", {
//     ...length,
//     message: "This field must have 2 options"
// });

extend('email', value => {

    const reg = /^(([^<>()/[\]\\.,;:\s@"]+(\.[^<>()/[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    if (reg.test(value)) {
        return true;
    }

    return 'Email không hợp lệ!';
});