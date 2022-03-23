import Axios from "axios"

export default {
    data() {
        return {

        }
    },
    methods: {
        async callApi(method, url, dataObj) {
            try {
                return await Axios({
                    method: method,
                    url: url,
                    data: dataObj
                });
            } catch (e) {
                return e.response
            }
        },
        s(desc, title = "Perfect!") {
            this.$Notice.success({
                title: title,
                desc: desc
            });
        },
        w(desc, title = "Oups!") {
            this.$Notice.warning({
                title: title,
                desc: desc
            });
        },
    },


}