// @ts-check
import Runtime from 'art-template/lib/runtime'
import superMemberCommon from '@public/js/common.ts'

Runtime.formatProductImg = function(data) {
    // 商品图片
    let sugGoodsCode = data.partNumber
    let vendorCode = data.sellerNo
    return (
        superMemberCommon.productImgDomain +
        '/uimg/b2c/newcatentries/' +
        superMemberCommon.formatVendorCode(vendorCode) +
        '-' +
        superMemberCommon.formatProCode(sugGoodsCode) +
        '_1_400x400.jpg'
    )
}

Runtime.formatBrandImg = function(brandCode) {
    if (brandCode) {
        return (
            superMemberCommon.productImgDomain +
            '/uimg/pcms/brandLogo/' +
            brandCode +
            '_140x35.jpg'
        )
    }
    return ''
}

Runtime.formatProductHref = function(data) {
    let partNumber = data.partNumber
    let vendorCode = data.sellerNo
    let domain = superMemberCommon.productDomain

    if (domain.substring(domain.length - 1) != '/') {
        domain = domain + '/'
    }
    if (vendorCode && vendorCode.length > 0) {
        return domain + vendorCode + '/' + partNumber + '.html'
    } else {
        return domain + partNumber + '.html'
    }
}

Runtime.formatDate = function(date) {
    date = new Date(+date)

    let year = date.getFullYear() //年
    let month = date.getMonth() + 1 //月
    let day = date.getDate() //日

    let clock = year + '/'

    if (month < 10) clock += '0'

    clock += month + '/'

    if (day < 10) clock += '0'

    clock += day

    return clock
}
