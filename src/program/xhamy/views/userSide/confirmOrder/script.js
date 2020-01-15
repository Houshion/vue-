

export let payWay = {
    way: [
        {
            name: "微信支付",
            icon: require("@/program/xhamy/img/i_wxpay.png"),
            status: true
        },
        {
            name: "余额支付",
            icon: require("@/program/xhamy/img/i_yuepay.png"),
            status: false
        }
    ],
    icon: {
        normal: require("@/program/xhamy/img/unpick.png"),
        active: require("@/program/xhamy/img/pick.png")
    },
}

export function a() {
    console.log(this);
}