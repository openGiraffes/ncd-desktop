export default {
    kaistores:{
        "kaistore": {
            code: "kaistore",
            desc: "KaiStore",
            fulldesc: "Official KaiStore (KaiStone backend | not support)",
            url: "",
            type: "request"
        },
        "bh_store": {
            code: "bh_store",
            desc: "BananaHackers Store (Static)",
            fulldesc: "BananaHackers Store (Third-party | Static backend)",
            url: "https://fastly.jsdelivr.net/gh/bananahackers/store-db@gh-pages/data.json",
            type: "static"
        },
        "giraffe_store_static": {
            code: "giraffe_store_static",
            desc: "openGiraffes Store (Static)",
            fulldesc: "openGiraffes Store (第三方，中国常用软件 | 静态数据后端)",
            url: "https://fastly.jsdelivr.net/gh/openGiraffes/openGiraffes-store-db@gh-pages/data.json",
            type: "static"
        },
        "giraffe_store_ncd": {
            code: "giraffe_store_ncd",
            desc: "openGiraffes Store (NCD)",
            fulldesc: "openGiraffes Store (第三方，中国常用软件 | NCD 后端)",
            url: "",
            type: "request"
        }
    }
}