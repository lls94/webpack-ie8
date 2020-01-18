function IsPC() {
    let userAgentInfo = navigator.userAgent
    let Agents = new Array(
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod'
    )
    let flag = true
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false
            break
        }
    }
    return flag
}

function getEnvType() {
    // 返回 pc wap
    switch (true) {
        case IsPC():
            return 'PC'
        default:
            return 'WAP'
    }
}

function getCookie(e) {
    var c = document.cookie.match(new RegExp('(^| )' + e + '=([^;]*)(;|$)'))
    return c ? decodeURIComponent(c[2].replace(/\+/g, '%20')) : null
}

var superMemberCommon = {
    allPriv: [
        {
            privNum: 0,
            content: '',
        },
        {
            privNum: 1,
            content: '至高20倍', // 权益名称
            privContent: '云钻购物当钱花', // 首页权益小字
        },
        {
            privNum: 2,
            content: '会员日', // 权益名称
            privContent: '会员日', // 首页权益小字
        },
        {
            privNum: 3,
            content: '运费券', // 权益名称
            privContent: '自营+海外购运费券', // 首页权益小字
        },
        {
            privNum: 4,
            content: '专属客服', // 权益名称
            privContent: '专属客服', // 首页权益小字
        },
        {
            privNum: 5,
            content: '清洗保养折扣', // 权益名称
            privContent: '清洗保养', // 首页权益小字
        },
        {
            privNum: 6,
            content: 'PP影视会员', // 权益名称
            privContent: 'PP影视会员', // 首页权益小字
        },
        {
            privNum: 7,
            content: '退换无忧', // 权益名称
            privContent: '退换无忧', // 首页权益小字
        },
        {
            privNum: 8,
            content: 'PP体育会员', // 权益名称
            privContent: '足球通会员', // 首页权益小字
        },
        {
            privNum: 9,
            content: '悦享电子书', // 权益名称
            privContent: '悦享电子书', // 首页权益小字
        },
        {
            privNum: 10,
            content: '小店超级会员', // 权益名称
            privContent: '小店超级会员', // 首页权益小字
        },
        {
            privNum: 11,
            content: '咪咕音乐会员', // 权益名称
            privContent: '咪咕音乐会员', // 首页权益小字
        },
    ],
    userIcon: './images/userIcon.jpg',
    pageUrl: {
        index: window.superMenberConfig.snprimeBase + '/toIndex.do',
        myPrivPage: window.superMenberConfig.snprimeBase + '/toAllPriv.do',
        payPage: window.superMenberConfig.snprimeBase + '/pay/index.do',
        tryPage: window.superMenberConfig.snprimeBase + '/free/trial/index.do',
        agreement: window.superMenberConfig.snprimeBase + '/agreement.do',
        agreementTry:
            window.superMenberConfig.snprimeBase + '/agreementTry.htm',
        showLevel: 'http://vip.suning.com/memberlevel/showLevel.do',
        miGuMemQuanYi: window.superMenberConfig.snprimeBase + '/migu/index.do', // 咪咕承接页
    },
    getEnv: function() {
        var _hostName = document.location.hostname,
            envName
        // 一般生产环境的域名

        var _prexg_reg = /^(.*)(prexg)(.*)(\.cnsuning\.com)$/
        var _prd_reg = /(\W)*.suning.com$/
        // 一般pre环境的域名
        var _pre_reg = /(\W)*pre(.*)*.cnsuning.com$/
        // 一般sit环境的域名
        var _sit_reg = /(\W)*sit(.*)*.cnsuning.com$/

        if (_prexg_reg.test(_hostName)) {
            envName = 'XGPRE'
        } else if (_pre_reg.test(_hostName)) {
            envName = 'PRE'
        } else if (_sit_reg.test(_hostName)) {
            envName = 'SIT'
        } else if (_prd_reg.test(_hostName)) {
            envName = 'PRD'
        } else {
            envName = 'DEV'
        }
        return envName
    },
    urlConstant: {
        sms: window.superMenberConfig.snprimeBase + '/ajax/sms.do',
        signup: window.superMenberConfig.snprimeBase + '/ajax/vip/signup.do',
        querySuperGoods:
            window.superMenberConfig.snprimeBase + '/ajax/querySuperGoods_1.do',
        allInOne:
            window.superMenberConfig.snprimeBase + '/ajax/pc/all-in-one.do',
        calc: window.superMenberConfig.snprimeBase + '/ajax/calc.do',
        calculatorPay:
            window.superMenberConfig.snprimeBase +
            '/ajax/queryMoneySavingInfo.do',
        isInvited: window.superMenberConfig.snprimeBase + '/ajax/isInvited.do',
        queryMyAllPriv:
            window.superMenberConfig.snprimeBase + '/ajax/queryMyAllPriv.htm',
        acceptInvite:
            window.superMenberConfig.snprimeBase + '/ajax/acceptInvite.do',
        queryBannerAdvts:
            window.superMenberConfig.snprimeBase + '/ajax/queryBannerAdvts.htm',
        queryBrandGoods:
            window.superMenberConfig.snprimeBase + '/ajax/queryBrandGoods.htm',
        queryPrimeGoods:
            window.superMenberConfig.snprimeBase + '/ajax/queryPrimeGoods.htm',
        hasGetPPTVPkgFlag:
            window.superMenberConfig.snprimeBase + '/ajax/hasGetPPTVPkgFlag.do',
        acceptPPTVPkg:
            window.superMenberConfig.snprimeBase + '/ajax/acceptPPTVPkg.do',
        toCreatePPTVAccount:
            window.superMenberConfig.snprimeBase +
            '/ajax/toCreatePPTVAccount.do',
        queryMemberInfo:
            window.superMenberConfig.snprimeBase + '/ajax/queryMemberInfo.do',
        querySuperPay:
            window.superMenberConfig.snprimeBase + '/pay/redirect.do',
        queryInvoiceInformation:
            window.superMenberConfig.snprimeBase +
            '/ajax/queryInvoiceInformation.do',
        getCreditInfo:
            window.superMenberConfig.snprimeBase + '/ajax/getCreditInfo.do',
        getTipInfo:
            window.superMenberConfig.snprimeBase + '/ajax/index/getTip.do',
        setTryExpiredTip:
            window.superMenberConfig.snprimeBase +
            '/m/ajax/setTryExpiredTip.do',
        setFroozenCloudTip:
            window.superMenberConfig.snprimeBase +
            '/m/ajax/setFroozenCloudTip.do',
        receivePrivForZTQ:
            window.superMenberConfig.snprimeBase + '/ajax/receivePrivForZTQ.do',
        //0114省钱计算器取大数据
        calculatorPay0113:
            window.superMenberConfig.snprimeBase +
            '/m/ajax/queryMoneySavingInfo.do',
    },
    getUrlParams: function(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        let r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
    },
    getUrlParams2: function(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        let r = window.location.hash.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
    },
    getUrlParams3: function(name) {
        //处理中文
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        let r = window.location.search.substr(1).match(reg)
        if (r != null) return r[2]
        return null
    },
    passPort: function(cb1, cb2) {
        let _this = this
        probeAuthStatus(
            function() {
                cb1()
            },
            function() {
                cb2 ? cb2() : _this.goLogin()
            },
            superMenberConfig.passport_config
        )
    },
    goLogin: function() {
        location.href =
            superMemberCommon.idsauthServerUrl +
            '/ids/login?service=' +
            encodeURIComponent(
                superMemberCommon.idsauthUrl +
                    '?targetUrl=' +
                    encodeURIComponent(location.href)
            ) +
            '&loginTheme=b2c'
    },
    //json格式get请求接口
    json: function(url, data, successCb, errorCb) {
        $.ajax({
            type: 'GET',
            url: url,
            data: data,
            dataType: 'json',
            cache: false,
            timeout: 3000,
            success: successCb,
            error: errorCb ? errorCb : defError,
        })
    },

    //json格式post请求接口
    json2: function(url, data, successCb, errorCb) {
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'json',
            cache: false,
            timeout: 3000,
            success: successCb,
            error: errorCb ? errorCb : defError,
        })
    },
    allPrivDeal: function(data) {
        if (data && data.length > 0) {
            var newData = [],
                noActiveData = []

            data.sort(function(a, b) {
                return a.sortIndex - b.sortIndex
            })

            $(data).each(function(index, item) {
                if (item.activeFlag) {
                    newData.push(item)
                } else {
                    noActiveData.push(item)
                }
            })
            return newData.concat(noActiveData)
        } else {
            return []
        }
    },
    getCookie: function(e) {
        var c = document.cookie.match(new RegExp('(^| )' + e + '=([^;]*)(;|$)'))
        return c ? decodeURIComponent(c[2].replace(/\+/g, '%20')) : null
    },
    setCookie: function(name, value) {
        document.cookie = name + '=' + encodeURIComponent(value)
    },
    delCookie: function(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    },
    getNick: function() {
        var nick = this.getCookie('nick')
        nick ? (nick = String(nick).replace(/\./g, '')) : ''
        return nick
    },
    randerHeader: function(op) {
        $('.super-member-common .header-floor')[0].innerHTML = template(
            'common/commonHeader',
            op && op.pageData
        )
    },
    randerToolBtn: function(op) {
        var $superMemberToolBtnWrap = $('.super-member-tool-btn-wrap')

        $superMemberToolBtnWrap[0].innerHTML = template(
            'common/toolBtn',
            op && op.pageData
        )

        var $toTopBtn = $superMemberToolBtnWrap.find('.to-top-btn')

        $toTopBtn.click(function() {
            $(window).scrollTop(0)
        })

        $(window).scroll(function() {
            if ($(window).scrollTop() > 1000) {
                $toTopBtn.css({
                    display: 'block',
                })
            } else {
                $toTopBtn.css({
                    display: 'none',
                })
            }
        })
    },
    getPriceDomList: [],
    cityId: getCookie('SN_CITY') ? getCookie('SN_CITY').split('_')[1] : '025',
    getPriceLoading: false,
    getVipPrice: function() {
        //获取商品价格
        var _this = this
        if (_this.getPriceDomList.length <= 0 || _this.getPriceLoading) {
            return
        }

        _this.getPriceLoading = true

        var domList = _this.getPriceDomList.splice(
                0,
                _this.getPriceDomList.length >= 20
                    ? 20
                    : _this.getPriceDomList.length
            ),
            partNumberArray = [],
            shopIdArray = [],
            cityId = _this.cityId

        $(domList).each(function() {
            partNumberArray.push($(this).attr('data-product-id'))
            shopIdArray.push($(this).attr('data-shop-id'))
        })

        $.ajax({
            url:
                superMemberCommon.icpsDomain +
                '/getVarnishAllPrice014/' +
                partNumberArray.join(',') +
                '_' +
                cityId +
                '__' +
                shopIdArray.join(',') +
                '_1_getPrice.vhtm',
            dataType: 'jsonp',
            jsonpCallback: 'getPrice',
        }).done(function(res) {
            $(domList).each(function(index, item) {
                if ($(this).hasClass('price-done')) {
                    return
                }
                var noSuperVipPrice = false

                $(this).addClass('price-done')
                var $priceWrap = $(this).find('.price-wrap'),
                    superPriceContent = '',
                    priceContent = '',
                    productClass = ''

                if (res[index].status == 1) {
                    //无货、暂不销售等不能卖的状态统一显示已售罄, n.status == 1，可售, n.invStatus == 1，有货

                    if (res[index].price) {
                        if (res[index].marketVipPriceType == '4-15') {
                            //4-15 取marketVipPrice值
                            if (res[index].marketVipPrice) {
                                var vipPriceArr = (
                                    res[index].marketVipPrice + ''
                                ).split('.')
                                superPriceContent =
                                    '&yen; <span class="price">' +
                                    vipPriceArr[0] +
                                    '<i>.' +
                                    (vipPriceArr[1] ? vipPriceArr[1] : '00') +
                                    '</i></span>'
                            } else {
                                productClass = 'product-end'
                                superPriceContent = 'SUPER活动已结束'
                                noSuperVipPrice = true
                            }
                        } else {
                            if (res[index].vipPrice) {
                                var vipPriceArr = (
                                    res[index].vipPrice + ''
                                ).split('.')
                                superPriceContent =
                                    '&yen; <span class="price">' +
                                    vipPriceArr[0] +
                                    '<i>.' +
                                    (vipPriceArr[1] ? vipPriceArr[1] : '00') +
                                    '</i></span>'
                            } else {
                                productClass = 'product-end'
                                superPriceContent = 'SUPER活动已结束'
                                noSuperVipPrice = true
                            }
                        }

                        priceContent = '易购价：&yen;' + res[index].price
                    } else {
                        // 活动结束
                        productClass = 'product-end'
                        superPriceContent = 'SUPER活动已结束'
                        noSuperVipPrice = true
                    }
                } else {
                    productClass = 'product-over'
                    superPriceContent = '该商品已售罄'
                    noSuperVipPrice = true
                }

                if (
                    (res[index].status != 1 ||
                        (res[index].status == 1 &&
                            (!res[index].price ||
                                (res[index].price && !res[index].vipPrice)))) &&
                    $(this).hasClass('prime-goods-b-g')
                ) {
                    $(this).remove()
                } else {
                    if (productClass) {
                        $(this).addClass(productClass)
                    }

                    if (noSuperVipPrice) {
                        superMemberCommon.sendMsg(
                            'ffhy-pcCommon-getVipPrice',
                            $(item)[0].dataset,
                            'ffhy-pdsysp_pc-20001'
                        ) //无会员价
                    }

                    $priceWrap.find('.super-price').html(superPriceContent)

                    if (priceContent) {
                        $priceWrap.find('.original-price').html(priceContent)
                    }
                }
            })

            _this.getPriceLoading = false

            if (_this.getPriceDomList.length > 0) {
                _this.getVipPrice()
            }
        })
    },
    formatProCode: function(sugGoodsCode) {
        sugGoodsCode = sugGoodsCode + ''
        var zeros = ''
        if (sugGoodsCode) {
            if (sugGoodsCode.length <= 18) {
                //补0
                var x = 18 - sugGoodsCode.length
                for (var i = 0; i < x; i++) {
                    zeros += '0'
                }
            }
        }
        return zeros + sugGoodsCode
    },
    formatVendorCode: function(vendorCode) {
        if (!vendorCode || vendorCode == '0') {
            vendorCode = '0000000000'
        }
        return vendorCode
    },
    addDate: function(date, days) {
        var d = new Date(date)
        d.setDate(d.getDate() + days)
        var month = d.getMonth() + 1
        var day = d.getDate()
        var val = d.getFullYear() + '年' + month + '月' + day + '日'
        return val
    },
    formatExpireTime: function(expireTime, currentTime) {
        var ret = ''
        if (expireTime) {
            var offsetTime = Math.abs(expireTime - currentTime)
            var result = Math.ceil(offsetTime / (3600 * 24 * 1e3))
            if (result >= 0 && result <= 3) {
                ret = result + ''
            } else {
                var date = new Date(Number(expireTime))
                var day = date.getDate()
                var month = date.getMonth() + 1
                var year = date.getFullYear()

                day = day < 10 ? '0' + day : day
                month = month < 10 ? '0' + month : month

                ret = year + '/' + month + '/' + day
            }
        }
        return ret
    },
    alert_box: function(op) {
        var op = $.extend(
            {
                content: '',
                exClass: null, // 额外的class名
                okContent: '我知道了',
                cancelContent: '取消',
                title: null,
                okFn: null, // 默认为空,当为空的时候，点击按钮会隐藏弹窗
                cancelFn: null,
                closeFn: null,
                hasCancel: 1, // 是否有取消按钮
                hasOk: 1, // 是否有确认按钮
                hasClose: 1, // 是否有右上角关闭按钮
            },
            op
        )

        var tipbg = '<div class="alert-box-shadow"></div>'

        var alert_html = [
            '<div class="alert-box ' + (op.exClass ? op.exClass : '') + '">',
            '<div class="alert-title">' + (op.title ? op.title : '') + '</div>',
            op.hasClose ? '<i class="alert-close i-close"></i>' : '',
            '<div class="alert-content">' + op.content + '</div>',
            '<div class="alert-btn-wrap">',
            op.hasCancel
                ? '<a class="i-close cancel-btn alert-btn" href="javascript:;">' +
                  op.cancelContent +
                  '</a>'
                : '', // 取消按钮
            op.hasOk
                ? '<a class="i-close ok-btn alert-btn" href="javascript:;">' +
                  op.okContent +
                  '</a>'
                : '', // 确认按钮
            '</div>',
            '</div>',
        ].join('')

        $('.alert-box').remove()
        $('.alert-box-shadow').remove()

        $('body').append(tipbg)
        $('body').append(alert_html)

        var $alertBoxShadow = $('.alert-box-shadow')
        var $alertBox = $('.alert-box')
        var $iClose = $alertBox.find('.i-close')
        var iCloseLen = $iClose.length

        $alertBox.css({
            'margin-left': -($alertBox.width() / 2),
        })

        if (iCloseLen) {
            $iClose.click(function() {
                closeFn()
                op.closeFn && op.closeFn()
            })
        }

        if (op.hasOk) {
            $alertBox.find('.ok-btn').click(function() {
                op.okFn && op.okFn()
            })
        }

        if (op.hasCancel) {
            $alertBox.find('.cancel-btn').click(function() {
                op.cancelFn && op.cancelFn()
            })
        }

        function closeFn() {
            if (iCloseLen) {
                $iClose.off()
            }

            if (op.hasCancel) {
                $alertBox.find('.cancel-btn').off()
            }

            if (op.hasOk) {
                $alertBox.find('.ok-btn').off()
            }

            $alertBoxShadow.remove()
            $alertBox.remove()
        }
    },
    analysis: function() {
        $(document).on('click', '[name^=wbffhy_]', function() {
            if (sa && sa.click && sa.click.sendDatasIndex) {
                sa.click.sendDatasIndex(this)
            }
        })
    },
    // getPayPrice: function (levelPrice, ecologyPrice, defaultPrice) { //3.20
    //     if (levelPrice > 0 && ecologyPrice > 0) {
    //         return (levelPrice < ecologyPrice ? {
    //             type: "level",
    //             price: levelPrice
    //         } : {
    //             type: "ecology",
    //             price: ecologyPrice
    //         });
    //     } else if (levelPrice > 0) {
    //         return {
    //             type: "level",
    //             price: levelPrice
    //         };
    //     } else if (ecologyPrice > 0) {
    //         return {
    //             type: "ecology",
    //             price: ecologyPrice
    //         };
    //     } else {
    //         return {
    //             type: "level",
    //             price: defaultPrice || 149
    //         };
    //     }
    // },
    getPayPrice: function(type, defaultPrice) {
        //3.20
        var priceList = superMenberConfig.priceList
        var priceObj = {}
        switch (type) {
            case 'yigou':
                priceObj = this.get149YearCardPriceObj(priceList)
                break
            case 'migu':
                priceObj = this.getMiguPriceObj(priceList)
                break
            default:
                priceObj = this.get149YearCardPriceObj(priceList)
                break
        }
        priceObj.type = ['level', 'ecology', 'customerGroup'][
            priceObj.priceType
        ]
        if (!(priceObj.price > 0)) {
            priceObj.price = defaultPrice
        }
        return priceObj
    },

    getMiguPriceObj: function(priceList) {
        return this.getMemPriceConfigUseGoodNo(priceList, 'SUPERMIGU199001')
    },

    get149YearCardPriceObj: function(priceList) {
        return this.getMemPriceConfigUseGoodNo(priceList, 'DA9221520581469')
    },

    getMemPriceConfigUseGoodNo: function(priceList, goodsNo) {
        goodsNo = goodsNo || 'DA9221520581469'
        var priceObj = {}
        priceList.forEach(function(value) {
            if (value.goodsNo === goodsNo) {
                priceObj.priceType = value.priceType // priceType 0 等级 1 生态值 2 客群
                priceObj.price = value.price // priceType 0 等级 1 生态值 2 客群
            }
        })
        return priceObj
    },

    slideDown: function($el, time) {
        var elHeight = $el.height()
        $el.show()
        $el.height(0)
        var height = 0

        $el[0].timer = setInterval(function() {
            // console.log((elHeight / time / 10), 497);

            height += elHeight / (time / 16)
            $el.height(height)
            if (height >= elHeight) {
                clearInterval($el[0].timer)
            }
        }, 16)
    },
    getEnvName: function() {
        var flag = ''
        var hostname = document.location.hostname
        var PRDReg = /(\W)*.suning.com$/
        var preReg = /(\W)*pre(.*)*.cnsuning.com$/
        var xgpreReg = /(\W)*xgpre(.*)*.cnsuning.com$/
        var prexgReg = /(\W)*prexg(.*)*.cnsuning.com$/
        var sitReg = /(\W)*sit(.*)*.cnsuning.com$/

        return (
            (flag = preReg.test(hostname)
                ? xgpreReg.test(hostname) || prexgReg.test(hostname)
                    ? 'XGPRE'
                    : 'PRE'
                : sitReg.test(hostname)
                ? 'SIT'
                : PRDReg.test(hostname)
                ? 'PRD'
                : 'DEV'),
            this.getUrlParams('ABtest') && (flag = 'PRD'),
            flag
        )
    },
    sendMsg: function(bid, info, error_code, type_name) {
        //页面异常埋点
        //参数设置方法
        try {
            if (typeof info == 'object') {
                info = JSON.stringify(info)
            }
        } catch (error) {}
        var param = {
            //必传参数
            bid: bid, //产品线标识,建议传产品线英文首字母简称、如需细分则以"-"分隔，最多两级  bizid
            //建议传的参数
            error_type: '2', //错误类型，0为“系统异常”、1为“业务异常”、2为“页面检查错误  errtype
            error_code: error_code == undefined ? 2 : error_code, //错误代码  errcode
            status: '', //调用对应业务接口之后，对应请求响应的情况的状态码, 0：成功，1: 异常
            //非必传参数
            type_name: type_name || '', //接口名称   typname
            error_detail: info, //报错详情，建议传报错内容英文首字母简称、如传中文则会默认urlencode编码   errdetail
            member_id: this.getCookie('custno'), //会员编码，如易购网站需要、则从cookie里取、变量名为custno               mbrid
            member_level: this.getCookie('custLevel'), //会员等级，如易购网站需要、则从cookie里取、变量名为custLevel            mbrlevel
            region: this.getCookie('SN_CITY'), //区域，如易购网站需要、则从cookie里取、变量名为SN_CITY              region
        }
        //传参方法
        try {
            sa.openAPI.sendMsgV2(param)
        } catch (error) {}
    },
    orderLog: function(orderId, orderInfo) {
        try {
            if (SAUP && typeof SAUP.sendLogData == 'function') {
                SAUP.sendLogData('order', {
                    orderId: orderId,
                    orderInfo: orderInfo || orderId,
                })
            }
            SAUP.sendLogData('order', {
                orderId: orderId,
                orderInfo: orderInfo || orderId,
            })
        } catch (error) {}
    },
}

var tempPar = getEnvType()
superMemberCommon.pageUrl.payPage +=
    '?orderChannel=' +
    tempPar +
    (superMenberConfig.miguSuperFlag == 1 ? '&showType=1' : '')
superMemberCommon.pageUrl.tryPage += '?orderChannel=' + tempPar
superMemberCommon.urlConstant.querySuperPay += '?orderChannel=' + tempPar
superMemberCommon.urlConstant.signup += '?orderChannel=' + tempPar

//根据环境获取域名
switch (superMemberCommon.getEnv()) {
    case 'XGPRE':
        superMemberCommon.vipDomain = '//vipprexg.cnsuning.com'
        superMemberCommon.aqDomain = '//aqprexg.cnsuning.com'
        superMemberCommon.detectDomain = '//dtprexg.cnsuning.com'
        superMemberCommon.idsauthServerUrl =
            'https://passportprexg.cnsuning.com'
        superMemberCommon.idsauthUrl = 'https://aqprexg.cnsuning.com/asc/auth'
        superMemberCommon.suggestUrl =
            'http://ueipsit.cnsuning.com/addproblem.htm'
        superMemberCommon.productImgDomain = '//uimgpre.cnsuning.com'
        superMemberCommon.productDomain = '//productpre.cnsuning.com'
        superMemberCommon.icpsDomain = '//icpsprexg.cnsuning.com/icps-web'
        superMemberCommon.cmsDomain = '//cprexg.m.cnsuning.com'
        superMemberCommon.ascUrl = 'https://aqprexg.cnsuning.com/asc/'
        superMemberCommon.serviceUrl =
            '//talk8pre.cnsuning.com/index.htm?channelId=58924'
        break
    case 'PRE':
        superMemberCommon.vipDomain = '//vippre.cnsuning.com'
        superMemberCommon.aqDomain = '//aqpre.cnsuning.com'
        superMemberCommon.detectDomain = '//dtpre.cnsuning.com'
        superMemberCommon.idsauthServerUrl = 'https://passportpre.cnsuning.com'
        superMemberCommon.idsauthUrl = 'https://aqpre.cnsuning.com/asc/auth'
        superMemberCommon.suggestUrl =
            'http://ueipsit.cnsuning.com/pc/addproblem.htm'
        superMemberCommon.productImgDomain = '//uimgpre.cnsuning.com'
        superMemberCommon.productDomain = '//productpre.cnsuning.com'
        superMemberCommon.icpsDomain = '//icpspre.cnsuning.com/icps-web'
        superMemberCommon.cmsDomain = '//cpre.m.cnsuning.com'
        superMemberCommon.ascUrl = 'https://aqpre.cnsuning.com/asc/'
        superMemberCommon.serviceUrl =
            '//talk8pre.cnsuning.com/index.htm?channelId=58924'
        break
    case 'SIT':
        superMemberCommon.vipDomain = '//vipsit.cnsuning.com'
        superMemberCommon.aqDomain = '//aqsit.cnsuning.com'
        superMemberCommon.detectDomain = '//dtsit.cnsuning.com'
        superMemberCommon.idsauthServerUrl = 'https://passportsit.cnsuning.com'
        superMemberCommon.idsauthUrl = 'https://aqsit.cnsuning.com/asc/auth'
        superMemberCommon.suggestUrl =
            'http://ueipsit.cnsuning.com/pc/addproblem.htm'
        superMemberCommon.productImgDomain = '//sitimage.suning.cn'
        superMemberCommon.productDomain = '//product.msit.cnsuning.com'
        superMemberCommon.icpsDomain = '//icpssit.cnsuning.com/icps-web'
        superMemberCommon.cmsDomain = '//csit.m.cnsuning.com'
        superMemberCommon.ascUrl = 'https://aqsit.cnsuning.com/asc/'
        superMemberCommon.serviceUrl =
            '//talk8pre.cnsuning.com/index.htm?channelId=58924'
        break
    case 'PRD':
        superMemberCommon.vipDomain = '//vip.suning.com'
        superMemberCommon.aqDomain = '//aq.suning.com'
        superMemberCommon.detectDomain = '//dt.suning.com'
        superMemberCommon.idsauthServerUrl = 'https://passport.suning.com'
        superMemberCommon.idsauthUrl = 'https://aq.suning.com/asc/auth'
        superMemberCommon.suggestUrl =
            'https://ueip.suning.com/pc/addproblem.htm'
        superMemberCommon.productImgDomain = '//image.suning.cn'
        superMemberCommon.productDomain = '//product.suning.com'
        superMemberCommon.icpsDomain = '//icps.suning.com/icps-web'
        superMemberCommon.cmsDomain = '//c.m.suning.com'
        superMemberCommon.ascUrl = 'https://aq.suning.com/asc/'
        superMemberCommon.serviceUrl =
            '//talk8.suning.com/index.htm?channelId=473640'
        break
    case 'DEV':
        superMemberCommon.vipDomain = '//vippre.cnsuning.com'
        superMemberCommon.aqDomain = '//aqpre.cnsuning.com'
        superMemberCommon.detectDomain = '//dtpre.cnsuning.com'
        superMemberCommon.idsauthServerUrl = 'https://passportpre.cnsuning.com'
        superMemberCommon.idsauthUrl = 'https://aqpre.cnsuning.com/asc/auth'
        superMemberCommon.suggestUrl =
            'http://ueipsit.cnsuning.com/pc/addproblem.htm'
        superMemberCommon.productImgDomain = '//uimgpre.cnsuning.com'
        superMemberCommon.productDomain = '//productpre.cnsuning.com'
        superMemberCommon.icpsDomain = '//icpspre.cnsuning.com/icps-web'
        superMemberCommon.cmsDomain = '//cpre.m.cnsuning.com'
        superMemberCommon.ascUrl = 'https://aqpre.cnsuning.com/asc/'
        superMemberCommon.serviceUrl =
            '//talk8pre.cnsuning.com/index.htm?channelId=58924'
        break
}

$.extend(superMemberCommon, {
    bindPhoneURL: superMemberCommon.ascUrl + 'mobile/check.do', // 手机绑定URL
    certificationURL:
        superMemberCommon.cmsDomain +
        '/smpc.htm?source=52&terminal=31&targetUrl=' +
        encodeURIComponent(location.href), // 购买 实名认证URL
    certificationURL2:
        superMemberCommon.cmsDomain +
        '/smpc.htm?source=86&terminal=31&targetUrl=' +
        encodeURIComponent(location.href), // 试用 实名认证URL
})
export default superMemberCommon
