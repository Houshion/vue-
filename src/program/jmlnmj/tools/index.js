import axios from "@/tools/axios"
import {
    oHideLoading
} from "@/components/oceans/oToast"
class tool {

    static set loginType(val) {
        window.localStorage.setItem("loginType", val);
    }
    static get loginType() {
        return window.localStorage.getItem("loginType");
    }

    static set opToken(val) {
        window.localStorage.setItem("opToken", val);
    }
    static get opToken() {
        return window.localStorage.getItem("opToken");
    }

    static set agToken(val) {
        window.localStorage.setItem("agToken", val);
    }
    static get agToken() {
        return window.localStorage.getItem("agToken");
    }

    static set keyString(val) {
        window.localStorage.setItem("keyString", val);
    }
    static get keyString() {
        return window.localStorage.getItem("keyString");
    }

    static get getToken() {
        let type = window.localStorage.getItem("loginType");
        if (type == 1) {
            return window.localStorage.getItem("agToken");
        } else {
            return window.localStorage.getItem("opToken");
        }
    }
}

export default tool