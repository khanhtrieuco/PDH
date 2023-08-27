import moment from "moment"
var tvkd = require('tieng-viet-khong-dau');

export default {
    data() {
        return {
        }
    },
    filters: {
        dateFilter(date) {
            return moment(date).format("DD/MM/YYYY") // HH:mm:ss
        },
        dateTimeFilter(date) {
            return moment(date).format("HH:mm:ss DD/MM/YYYY") // HH:mm:ss
        },
        timeFilter(date) {
            return moment(date).format("HH:mm") // HH:mm:ss
        },
        dateTimeFilterText(date) {
            return `${moment(date).format("DD/MM/YYYY")} lúc ${moment(date).format("HH:mm")}` // HH:mm:ss
        },
        dateTimeFilterTextPost(date) {
            return `${moment(date).format("HH:mm")} ngày ${moment(date).format("DD/MM/YYYY")}` // HH:mm:ss
        },
        numberWithCommas(x) {
            return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : x
        },
        numberFormat(x) {
            return x ? parseFloat(Math.round(x * 100) / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".") : x
        },
        formatPhoneNumber(phoneNumberString) {
            var cleaned = ('' + phoneNumberString).replace(/\D/g, '').replace('0', '')
            var match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/)
            if (match) {
                return '+84 ' + match[1] + ' ' + match[2] + ' ' + match[3]
            }
            return null
        },
        workTypeFilter(state) {
            let stringState = state
            switch (state) {
                case 'featured':
                    stringState = 'Featured'
                    break
                case 'category':
                    stringState = 'By Category'
                    break
                case 'categories':
                    stringState = 'By Category'
                    break
                case 'year':
                    stringState = 'By Year'
                    break
                case 'locations':
                    stringState = 'By Location'
                    break
                case 'location':
                    stringState = 'By Location'
                    break
                case 'all':
                    stringState = 'All'
                    break
                default:
                    break
            }
            return stringState
        },
        workTypeVNFilter(state) {
            let stringState = state
            switch (state) {
                case 'featured':
                    stringState = 'Nổi bật'
                    break
                case 'category':
                    stringState = 'Theo Chuyên Mục'
                    break
                case 'categories':
                    stringState = 'Theo Chuyên Mục'
                    break
                case 'year':
                    stringState = 'Theo Năm'
                    break
                case 'locations':
                    stringState = 'Theo Vị Trí'
                    break
                case 'location':
                    stringState = 'Theo Vị Trí'
                    break
                case 'all':
                    stringState = 'Tất Cả'
                    break
                default:
                    break
            }
            return stringState
        },
        locationFilter(state) {
            if (state === 'Phnôm Pênh_Campuchia') {
                return 'Phnompenh_Cambodia'
            } else {
                let stringState = tvkd.c(state)
                return stringState
            }
            // switch (state) {
            //     case 'HOCHIMINH':
            //         stringState = 'HO CHI MINH'
            //         break
            //     case 'HANOI':
            //         stringState = 'HA NOI'
            //         break
            //     case 'HAIPHONG':
            //         stringState = 'HAI PHONG'
            //         break
            //     case 'HALONG':
            //         stringState = 'HA LONG'
            //         break
            //     case 'DANANG':
            //         stringState = 'DA NANG'
            //         break
            //     case 'BINHDUONG':
            //         stringState = 'BINH DUONG'
            //         break
            //     case 'NHATRANG':
            //         stringState = 'NHA TRANG'
            //         break
            //     case 'BENTRE':
            //         stringState = 'BEN TRE'
            //         break
            //     case 'MYTHO':
            //         stringState = 'MY THO'
            //         break
            //     case 'PHNOMPENH_CAMBODIA':
            //         stringState = 'PHNOMPENH (CAMBODIA)'
            //         break
            //     default:
            //         break
            // }
        }
    },
    methods: {
        getClubCategory(text, lang = 'vn') {
            if (lang === 'vn') {
                let rs = text
                switch (text) {
                    case 'skincare':
                        rs = 'Chăm sóc da'
                        break;
                    case 'knowledge':
                        rs = 'Kiến thức'
                        break;
                    case 'news':
                        rs = 'Tin tức'
                        break;
                    default:
                        break;
                }
                return rs
            } else {
                let rs = text
                switch (text) {
                    case 'skincare':
                        rs = 'Skin care'
                        break;
                    case 'knowledge':
                        rs = 'Knowledge'
                        break;
                    case 'news':
                        rs = 'News'
                        break;
                    default:
                        break;
                }
                return rs
            }
        },
        checkAllowCancelOrder(state) {
            let rs = true
            switch (state) {
                case 'new':
                    rs = true
                    break
                case 'confirm':
                    rs = true
                    break
                case 'payment':
                    rs = true
                    break
                case 'pickitem':
                    rs = true
                    break
                case 'delivery':
                    rs = false
                    break
                case 'complete':
                    rs = false
                    break
                case 'rate':
                    rs = false
                    break
                case 'cancel':
                    rs = false
                    break
                case 'usercancel':
                    rs = false
                    break
                default:
                    rs = false
                    break
            }
            return rs
        },
        getStateOrderUser(state) {
            let stringState = state
            switch (state) {
                case 'new':
                    stringState = 'Đang chờ xác nhận'
                    break
                case 'confirm':
                    stringState = 'Chờ thanh toán'
                    break
                case 'payment':
                    stringState = 'Đã thanh toán'
                    break
                case 'pickitem':
                    stringState = 'Đang đóng gói'
                    break
                case 'delivery':
                    stringState = 'Đang vận chuyển'
                    break
                case 'complete':
                    stringState = 'Giao hàng thành công'
                    break
                case 'rate':
                    stringState = 'Đã đánh giá'
                    break
                case 'cancel':
                    stringState = 'Hủy bở hệ thống'
                    break
                case 'usercancel':
                    stringState = 'Người dùng hủy đơn'
                    break
                default:
                    break
            }
            return stringState
        },
        getStateOrderUserEn(state) {
            let stringState = state
            switch (state) {
                case 'new':
                    stringState = 'Order is pending confirmation'
                    break
                case 'confirm':
                    stringState = 'Orders waiting for payment'
                    break
                case 'payment':
                    stringState = 'Order has been paid'
                    break
                case 'pickitem':
                    stringState = 'Orders are being packed'
                    break
                case 'delivery':
                    stringState = 'Orders are shipping'
                    break
                case 'complete':
                    stringState = 'Order has been delivered successfully'
                    break
                case 'rate':
                    stringState = 'Rated'
                    break
                case 'cancel':
                    stringState = 'System cancel'
                    break
                case 'usercancel':
                    stringState = 'User cancel'
                    break
                default:
                    break
            }
            return stringState
        },
        getStateOrder(state) {
            let stringState = state
            switch (state) {
                case 'new':
                    stringState = 'Chờ xác nhận'
                    break
                case 'confirm':
                    stringState = 'Chờ thanh toán'
                    break
                case 'payment':
                    stringState = 'Đã thanh toán'
                    break
                case 'pickitem':
                    stringState = 'Đang đóng gói'
                    break
                case 'delivery':
                    stringState = 'Đang vận chuyển'
                    break
                case 'complete':
                    stringState = 'Đã giao'
                    break
                case 'rate':
                    stringState = 'Đã đánh giá'
                    break
                case 'cancel':
                    stringState = 'Hủy'
                    break
                case 'usercancel':
                    stringState = 'Người dùng hủy'
                    break
                default:
                    break
            }
            return stringState
        },
        getStateOrderColor(state) {
            let stringState = state
            switch (state) {
                case 'new':
                    stringState = ''
                    break
                case 'confirm':
                    stringState = 'blue'
                    break
                case 'payment':
                    stringState = 'pink'
                    break
                case 'pickitem':
                    stringState = 'purple'
                    break
                case 'delivery':
                    stringState = 'green'
                    break
                case 'complete':
                    stringState = 'cyan'
                    break
                case 'rate':
                    stringState = 'orange'
                    break
                case 'cancel':
                    stringState = 'red'
                    break
                case 'usercancel':
                    stringState = 'red'
                    break
                default:
                    break
            }
            return stringState
        },
        showHtmlText(textHtml) {
            let rs = textHtml
            if (!textHtml) return ''
            if (rs.includes('<p>') || rs.includes('<img') || rs.includes('<div>') || rs.includes('<h')) {
                rs = textHtml
            } else {
                rs = this.$md.render(textHtml)
            }
            return rs
        },
        makeString(length) {
            let result = ''
            const characters =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            const charactersLength = characters.length
            for (let i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                )
            }
            return result
        },
        getSlug(str) {
            str = str.replace(/^\s+|\s+$/g, ''); // trim
            str = str.toLowerCase();

            str = this.clearAlias(str)
            str = str.replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-'); // collapse dashes

            return str;
        },

        clearAlias(text) {
            if (!text) {
                return text;
            }
            return text
                .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
                .replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A')
                .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
                .replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E')
                .replace(/[ìíịỉĩ]/g, 'i')
                .replace(/[ÌÍỊỈĨ]/g, 'I')
                .replace(/[òóọỏõôồốộổỗơờớợởỡọ]/g, 'o')
                .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠỌ]/g, 'O')
                .replace(/[ùúụủũưừứựửữ]/g, 'u')
                .replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U')
                .replace(/[ỳýỵỷỹ]/g, 'y')
                .replace(/[ỲÝỴỶỸ]/g, 'Y')
                .replace(/đ/g, 'd')
                .replace(/Đ/g, 'D')
                .replace(/[^\sa-zA-Z0-9_]/g, '').toLowerCase();

        },
        get_excerpt(value, maxLength) {
            if (value && value.length > maxLength)
                return `${value.substr(0, maxLength)}...`
            return value
        },
        formatPrice(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        getAtlImgFormTitle(text) {
            if (text) {
                return text
                    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
                    .replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A')
                    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
                    .replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E')
                    .replace(/[ìíịỉĩ]/g, 'i')
                    .replace(/[ÌÍỊỈĨ]/g, 'I')
                    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
                    .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O')
                    .replace(/[ùúụủũưừứựửữ]/g, 'u')
                    .replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U')
                    .replace(/[ỳýỵỷỹ]/g, 'y')
                    .replace(/[ỲÝỴỶỸ]/g, 'Y')
                    .replace(/đ/g, 'd')
                    .replace(/Đ/g, 'D').toLowerCase()
            }
            return text
        },
        showNotification(type, message) {
            this.$bvToast.toast(message, {
                title: 'Thông báo',
                variant: type,
                solid: true
            })
        },
        validateEmail(email) {
            return String(email)
                .toLowerCase()
                .match(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                );
        },
        validatePhone(phone) {
            return String(phone)
                .toLowerCase()
                .match(
                    /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
                );
        },
        toDateAdd(date) {
            let now = moment().add(date, 'days')
            return now.format('DD/MM/YYYY')
        }
    }
}