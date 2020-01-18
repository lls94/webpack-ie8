//webpack 停止运行此脚本吗? 此页面上的脚本造成 Web 浏览器运行速度减慢。
import _ from 'lodash'
import '../../public/tplFilter.ts'

import superMemberCommon from '@public/js/common'

const commonHeaderTpl = require('@public/template/commonHeader.tpl')
const alertBoxCommonTpl = require('@public/template/alertBoxCommon.tpl')

const miguFloorTpl = require('./template/miguFloor.tpl')
const computerDialogTpl = require('./template/computerDialog.tpl')
const rightListFloorTpl = require('./template/rightListFloor.tpl')
const adListFloorTpl = require('./template/adListFloor.tpl')
const rightsBannerFloorTpl = require('./template/rightsBannerFloor.tpl')
const superRecommondGoodsFloorTpl = require('./template/superRecommondGoodsFloor.tpl')
const goodsListTpl = require('./template/goodsList.tpl')

import './main.scss'

var superMemberIndex = {
    pageData: {},
    init: function() {
        this.pageData = $.extend(
            {
                queryMyAllPrivAjax: false,
                queryMyAllPrivAjaxError: false,
                allPriv: superMemberCommon.allpriv,
                pageType: 'index',
                pageUrl: superMemberCommon.pageUrl,
                suggestUrl: superMemberCommon.suggestUrl,
                serviceUrl: superMemberCommon.serviceUrl,
                userIcon: superMemberCommon.userIcon,
                toMyDiamondsUrl:
                    superMemberCommon.pageUrl.myPrivPage + '#superPrivType=2',
                postageFee: 64, //  可省运费
                pptvMember: 198, // pp 影视会员
                pptyMember: 68, // pp 体育会员
                privilege: 99, //专属 购物 优惠
                superDiscount: 140,
                nowMemberType: this.getNowMemberType(
                    window.superMenberConfig.vipType || ''
                ),
                quanYiShowType: 0,
            },
            window.superMenberConfig || {},
            {
                expireTime: superMemberCommon.formatExpireTime(
                    window.superMenberConfig.expireTime,
                    window.superMenberConfig.currentTime
                ), //过期时间，试用会员3天内到期提醒
            }
        )

        if (this.pageData.miguSuperFlag == 1) {
            this.pageData.quanYiShowType = 1
        }

        this.$pageLoading = $('.page-loading')
        this.$supeMemberIndex = $('.super-member-index')

        this.$headerFloor = this.$supeMemberIndex.find('.header-floor')
        this.$rightsListFloor = this.$supeMemberIndex.find('.rights-list-floor')
        this.$rightsBannerFloor = this.$supeMemberIndex.find(
            '.rights-banner-floor'
        )
        this.$superRecommondGoodsFloor = this.$supeMemberIndex.find(
            '.super-recommond-goods-floor'
        )
        this.$adListFloor = this.$supeMemberIndex.find('.ad-list-floor')
        this.$computerDialog = $('.computer-dialog-wrap')

        this.headerFloor() //页面头部
        this.rightListFloor.init() //权益用户信息

        this.$pageLoading.hide()

        if (this.pageData.vipType === '1') {
            this.adListFloor() //广告列表
        } else {
            this.rightsBannerFloor() //权益六张图
        }

        if (this.pageData.vipType !== '0') {
            // 当不是普通会员的时候出现
            this.superRecommondGoodsFloor.init() //推荐商品
        }
    },
    headerFloor: function() {
        let { pageType, pageUrl } = superMemberIndex.pageData
        superMemberIndex.$headerFloor.html(
            commonHeaderTpl({
                pageType,
                pageUrl,
                quanYiShowType: this.pageData.quanYiShowType,
            })
        )
    },
    rightListFloor: {
        amount: 300, // 2%  返利
        money: '',
        init: function() {
            this.queryMyAllPriv() //查询权益信息
            this.eventInit()
        },
        queryMyAllPriv: function() {
            let _this = this
            superMemberCommon.json(
                superMemberCommon.urlConstant.queryMyAllPriv,
                {},
                function(res) {
                    if (res.successFlag) {
                        let temp = []
                        let len = res.privItems.length
                        for (let i = 0; i < len; i++) {
                            let item = res.privItems[i]

                            if (item.privNum < 10) {
                                temp.push(item)
                            }
                        }

                        res.privItems = temp
                        superMemberIndex.pageData = $.extend(
                            superMemberIndex.pageData,
                            {
                                myAllPriv: {
                                    privItems: superMemberCommon.allPrivDeal(
                                        res.privItems
                                    ),
                                },
                            }
                        )

                        _this.render()

                        _this.calc()
                    }
                },
                function() {}
            )
        },
        calc: function() {
            let _this = this,
                pageData = superMemberIndex.pageData,
                isInDB = false

            if (pageData.nowMemberType == 'isPay') {
                //正式会员 计算器 接口
                superMemberCommon.json(
                    superMemberCommon.urlConstant.calculatorPay0113,
                    {},
                    function(res) {
                        if (
                            res &&
                            res.responseCode === '0' &&
                            res.responseObject
                        ) {
                            var responseObject = res.responseObject
                            pageData.count =
                                (responseObject.total_discount &&
                                    Number(responseObject.total_discount)) ||
                                0
                            _this.amount =
                                (responseObject.batch_Chg_Discount_total &&
                                    Number(
                                        responseObject.batch_Chg_Discount_total
                                    )) ||
                                0 //2%
                            pageData.postageFee =
                                (responseObject.freight_discount &&
                                    Number(responseObject.freight_discount)) ||
                                0 //运费
                            pageData.pptvMember =
                                (responseObject.pptv_vip_year &&
                                    Number(responseObject.pptv_vip_year)) ||
                                0 //pp影视
                            pageData.pptyMember =
                                (responseObject.ppsport_vip_year &&
                                    Number(responseObject.ppsport_vip_year)) ||
                                0 //pp体育
                            pageData.superDiscount =
                                (responseObject.super_discount &&
                                    Number(responseObject.super_discount)) ||
                                0 //SUPER专属优惠券
                            pageData.privilege =
                                (responseObject.commdty_discount &&
                                    Number(responseObject.commdty_discount)) ||
                                0 // 会员价商品优惠
                            pageData.miguDiscount =
                                (responseObject.migu_vip_year &&
                                    Number(responseObject.migu_vip_year)) ||
                                0 // 咪咕音乐
                            // 0113添加几个从接口取的数值
                            pageData.TencentVideo =
                                (responseObject.tencent_vip_year &&
                                    Number(responseObject.tencent_vip_year)) ||
                                0 // 腾讯视频VIP会员
                            pageData.YoukuVideo =
                                (responseObject.youku_vip_year &&
                                    Number(responseObject.youku_vip_year)) ||
                                0 // 优酷VIP会员
                            pageData.IqiyiVideo =
                                (responseObject.iqy_vip_year &&
                                    Number(responseObject.iqy_vip_year)) ||
                                0 // 爱奇艺黄金VIP
                        }
                        //   $('.third').html(1234)
                        insert2Dom(_this.amount, isInDB)
                    },
                    function() {
                        insert2Dom(_this.amount, isInDB)
                    }
                )
            } else {
                //非正式 会员 计算器   写死  不调用 接口
                insert2Dom(_this.amount, isInDB)
            }

            function insert2Dom(amount, isInDB) {
                let pageData = superMemberIndex.pageData

                if (pageData.nowMemberType == 'isPay') {
                    _this.money = pageData.count

                    if (pageData.miguSuperFlag == 1) {
                        _this.money =
                            _this.money - 0 + (pageData.miguDiscount - 0)
                        _this.money = _this.money - 0
                    }
                    var text = '自您成为SUPER以来，SUPER会员已为您累计节省'
                } else {
                    var text =
                        superMemberIndex.pageData.vipType == 1
                            ? isInDB
                                ? '根据您近一年的消费，预计一年可省'
                                : '根据易购会员近一年的消费，预计平均一年可省'
                            : isInDB
                            ? '根据您近一年的消费，开通预计一年可省'
                            : '根据易购会员近一年的消费，开通预计平均一年可省'

                    _this.money =
                        amount +
                        pageData.postageFee +
                        pageData.pptvMember +
                        pageData.privilege +
                        pageData.pptyMember +
                        pageData.superDiscount
                }

                superMemberIndex.$rightsListFloor
                    .find('.tips')
                    .html(
                        `<i class="compute"></i>${text}<em class="money">&yen;${_this.money}</em><i class="arrow"></i>`
                    )
                superMemberIndex.$rightsListFloor
                    .find('.rights-content .money')
                    .html(_this.money)
            }
        },
        render: function() {
            var pageData = superMemberIndex.pageData,
                rightClassName =
                    pageData.vipType === '2' ||
                    (pageData.vipType === '0' &&
                        pageData.froozenCloud &&
                        pageData.froozenCloud !== '0') //普通会员试用到期30天存在待返云钻首页和试用会员一样
                        ? 'has-try'
                        : pageData.vipType === '1'
                        ? 'has-open'
                        : pageData.tryFlag === '1'
                        ? 'general'
                        : 'general can-not-try'

            var data = {
                neckName: pageData.neckName,
                vipType: pageData.vipType,
                expireTime: pageData.expireTime,
                froozenCloud: pageData.froozenCloud,
                cloudValue: pageData.cloudValue,
                privItems: pageData.myAllPriv.privItems,
                allPriv: superMemberCommon.allPriv,
                rightClassName: rightClassName,
                memberLevel: pageData.memberLevel,
                canTryUseLevel: pageData.canTryUseLevel,
                bigHeadPic: pageData.bigHeadPic,
                expireFlag: pageData.expireFlag,
                G200_ZQT: window.superMenberConfig.G200_ZQT,
                remainFreePostageCouponNum: pageData.remainFreePostageCouponNum,
                payPage: pageData.pageUrl.payPage,
                tryPage: pageData.pageUrl.tryPage,
                myPrivPage: pageData.pageUrl.myPrivPage,
                vipDomain: superMemberCommon.vipDomain,
                isRePay: pageData.isRePay,
                limitToVipDay: pageData.limitToVipDay,
                dateSpan:
                    ((new Date(pageData.expireTime) - new Date()) /
                        (1000 * 60 * 60 * 24)) |
                    0,
                payPrice199: superMemberCommon.getPayPrice('migu', 199),
                payPrice149: superMemberCommon.getPayPrice('yigou', 149),
                miguSuperFlag: pageData.miguSuperFlag,
                pageUrl: superMemberIndex.pageData.pageUrl,
                quanYiShowType: superMemberIndex.pageData.quanYiShowType,
            }

            if (data.miguSuperFlag != 1) {
                $('.migu-floor').html(miguFloorTpl(data))
            }

            superMemberIndex.$rightsListFloor.html(rightListFloorTpl(data))

            superMemberIndex.$rightsListFloor.on(
                'click',
                '.free-try',
                function() {
                    window.open(data.tryPage)
                }
            )

            superMemberCommon.randerToolBtn({
                // 渲染返回顶部、意见反馈
                pageData: superMemberIndex.pageData,
            })
            this.alertBoxRemind()
        },
        alertBoxRemind: function() {
            if (
                superMemberIndex.pageData.vipType == '2' &&
                (superMemberIndex.pageData.expireTime === '0' ||
                    superMemberIndex.pageData.expireTime === '1' ||
                    superMemberIndex.pageData.expireTime === '2' ||
                    superMemberIndex.pageData.expireTime === '3')
            ) {
                //试用用户，且过期时间3天内弹框提醒

                let tips =
                    superMemberIndex.pageData.expireTime === '0'
                        ? 'SUPER会员试用<em>今天</em>就到期啦~'
                        : '还有<em>' +
                          superMemberIndex.pageData.expireTime +
                          '</em>天试用就到期啦~'
                superMemberCommon.json(
                    superMemberCommon.urlConstant.getTipInfo,
                    {},
                    function(res) {
                        if (
                            _.get(res, 'code') &&
                            _.get(res, 'data.tryExpiredTip')
                        ) {
                            superMemberCommon.alert_box({
                                content: alertBoxCommonTpl({
                                    type: 'expire',
                                    content: tips,
                                }),
                                okContent: '立即开通',
                                okFn: function() {
                                    window.location.href =
                                        superMemberIndex.pageData.pageUrl.payPage
                                    return
                                },
                                hasCancel: 0,
                            })

                            superMemberCommon.json(
                                superMemberCommon.urlConstant.setTryExpiredTip,
                                {},
                                function() {},
                                function() {}
                            )
                        }
                    },
                    function() {
                        superMemberCommon.alert_box({
                            content: alertBoxCommonTpl({
                                type: 'expire',
                                content: tips,
                            }),
                            okContent: '立即开通',
                            okFn: function() {
                                window.location.href =
                                    superMemberIndex.pageData.pageUrl.payPage
                                return
                            },
                            hasCancel: 0,
                        })
                        superMemberCommon.json(
                            superMemberCommon.urlConstant.setTryExpiredTip,
                            {},
                            function() {},
                            function() {}
                        )
                    }
                )
            } else if (
                superMemberIndex.pageData.vipType == '0' &&
                superMemberIndex.pageData.froozenCloud &&
                superMemberIndex.pageData.froozenCloud !== '0'
            ) {
                //普通用户，试用到期后30天内，如果有待返云钻，提醒

                var finalTime = superMemberCommon.addDate(
                    new Date(Number(superMenberConfig.expireTime)),
                    30
                )
                var tips =
                    '<span class="final-time">' +
                    finalTime +
                    '</span>前开通即可获得<div>价值<em>' +
                    superMemberIndex.pageData.froozenCloud / 100 +
                    '</em>元的待返云钻(' +
                    superMemberIndex.pageData.froozenCloud +
                    '个)'
                superMemberCommon.json(
                    superMemberCommon.urlConstant.getTipInfo,
                    {},
                    function(res) {
                        if (
                            res &&
                            res.code &&
                            res.data &&
                            res.data.froozenCloudTip
                        ) {
                            superMemberCommon.alert_box({
                                content: alertBoxCommonTpl({
                                    type: 'expire',
                                    content: tips,
                                }),
                                okContent: '立即开通',
                                okFn: function() {
                                    window.location.href =
                                        superMemberIndex.pageData.pageUrl.payPage
                                    return
                                },
                                hasCancel: 0,
                            })

                            superMemberCommon.json(
                                superMemberCommon.urlConstant
                                    .setFroozenCloudTip,
                                {},
                                function() {},
                                function() {}
                            )
                        }
                    },
                    function() {
                        superMemberCommon.alert_box({
                            content: alertBoxCommonTpl({
                                type: 'expire',
                                content: tips,
                            }),
                            okContent: '立即开通',
                            okFn: function() {
                                window.location.href =
                                    superMemberIndex.pageData.pageUrl.payPage
                                return
                            },
                            hasCancel: 0,
                        })
                        superMemberCommon.json(
                            superMemberCommon.urlConstant.setFroozenCloudTip,
                            {},
                            function() {},
                            function() {}
                        )
                    }
                )
            }
        },

        eventInit: function() {
            var _this = this

            superMemberIndex.$rightsListFloor.on('click', '.tips', function() {
                // 弹出 计算器
                var pageData = superMemberIndex.pageData
                console.log(pageData, 321)

                if (
                    !superMemberIndex.$computerDialog.find(
                        '.computer-dialog'
                    )[0]
                ) {
                    superMemberIndex.$computerDialog.html(
                        computerDialogTpl({
                            money: _this.money,
                            amount: _this.amount,
                            neckName: pageData.neckName,
                            vipType: pageData.vipType,
                            tryFlag: pageData.tryFlag,
                            canTryUseLevel: pageData.canTryUseLevel,
                            memberLevel: pageData.memberLevel,
                            postageFee: pageData.postageFee,
                            superDiscount: pageData.superDiscount,
                            pptvMember: pageData.pptvMember,
                            pptyMember: pageData.pptyMember,
                            privilege: pageData.privilege,
                            bigHeadPic: pageData.bigHeadPic,
                            nowMemberType: pageData.nowMemberType,
                            miguSuperFlag: pageData.miguSuperFlag,
                            miguDiscount: pageData.miguDiscount,
                            TencentVideo: pageData.TencentVideo,
                            IqiyiVideo: pageData.IqiyiVideo,
                            YoukuVideo: pageData.YoukuVideo,
                        })
                    )
                }

                superMemberIndex.$computerDialog.find('.computer-dialog').show()
                var newWindowHeight = document.documentElement.clientHeight
                var newBtnList = document.getElementsByClassName('btn-list')[0]

                if (newBtnList) {
                    if (newWindowHeight <= 640) {
                        $('.privilege-list').css({
                            height: '155px',
                            'overflow-y': 'auto',
                        })
                        $('.privilege-list > li').css({ height: '50px' })
                        $('.computer').css('min-height', '450px')
                    }
                    if (newWindowHeight > 640) {
                        var heightLi =
                            parseInt(
                                100 / $('.privilege-list li').length - 0.5
                            ) + '%'
                        $('.computer').css('min-height', '600px')
                        $('.privilege-list').css({
                            height: '50%',
                            'overflow-y': 'hidden',
                        })
                        $('.privilege-list > li').css({ height: heightLi })
                        var newLineHeight =
                            $('.privilege-list li').height() + 'px'
                        $(
                            '.privilege-list > li,.privilege-list > li .des'
                        ).css({ 'line-height': newLineHeight })
                    }
                    newBtnList.style.lineHeight =
                        newWindowHeight / 10 - 15 + 'px'
                }
            })

            superMemberIndex.$computerDialog.on('click', '.close', function() {
                superMemberIndex.$computerDialog.find('.computer-dialog').hide()
            })

            superMemberIndex.$computerDialog.on(
                'click',
                '.free-use',
                function() {
                    superMemberIndex.$computerDialog
                        .find('.close')
                        .trigger('click')
                    window.location.href =
                        superMemberIndex.pageData.pageUrl.tryPage
                }
            )

            superMemberIndex.$computerDialog.on(
                'click',
                '.now-buy',
                function() {
                    let $this = $(this)

                    superMemberIndex.$computerDialog
                        .find('.close')
                        .trigger('click')

                    if (!$this.hasClass('has-open')) {
                        location.href =
                            superMemberIndex.pageData.pageUrl.payPage
                    }
                }
            )
        },
    },
    adListFloor: function() {
        superMemberCommon.json(
            superMemberCommon.urlConstant.allInOne,
            {},
            function(res) {
                if (res.code == 1 && res.data) {
                    let data = res.data
                    data.pictureServerUrl =
                        superMemberIndex.pageData.pictureServerUrl
                    superMemberIndex.$adListFloor.html(adListFloorTpl(data))
                    lazyelem.listen()
                }
            },
            function() {}
        )
    },
    rightsBannerFloor: function() {
        superMemberIndex.$rightsBannerFloor.html(
            rightsBannerFloorTpl({
                snprimeBase:
                    superMemberIndex.pageData.snprimeBase + '/snprime/images/',
                myPrivPage: superMemberIndex.pageData.pageUrl.myPrivPage,
                resRoot: superMenberConfig.resRoot + '/images/',
            })
        )

        lazyelem.listen()
    },
    superRecommondGoodsFloor: {
        init: function() {
            this.querySuperGoods()
            this.eventInit()
        },
        querySuperGoods: function() {
            let _this = this

            superMemberCommon.json(
                superMemberCommon.urlConstant.querySuperGoods,
                {},
                function(res) {
                    if (res && res.catagories) {
                        let catagories = []

                        $.each(res.catagories, function(index, item) {
                            if (item.superGoods && item.superGoods.length > 4) {
                                catagories.push(item)
                            }
                        })

                        superMemberIndex.pageData.catagories = catagories

                        if (catagories && catagories.length > 0) {
                            superMemberIndex.$superRecommondGoodsFloor.html(
                                superRecommondGoodsFloorTpl({
                                    catagories: catagories,
                                })
                            )
                            _this.render(0)
                        }
                    }
                },
                function() {}
            )
        },
        render: function(index) {
            let html = '',
                pageData = superMemberIndex.pageData

            pageData.goodsListCache = pageData.goodsListCache || {}
            if (pageData.goodsListCache[index]) {
                html = pageData.goodsListCache[index]
            } else {
                let superGoodsFilter = []
                let superGoods = pageData.catagories[index].superGoods
                let superGoodsFilterLen = 18

                $.each(superGoods, function(index, item) {
                    if (item.partNumber.length <= superGoodsFilterLen) {
                        item.partNumber = (
                            Array(superGoodsFilterLen).join('0') +
                            item.partNumber
                        ).slice(-superGoodsFilterLen)
                        superGoodsFilter.push(item)
                    }
                })

                html = goodsListTpl({
                    superGoods: superGoodsFilter,
                    tabIndex: pageData.catagories[index].sortIndex,
                })
                pageData.goodsListCache[index] = html
            }

            superMemberIndex.$superRecommondGoodsFloor
                .find('.tab-con')
                .html(html)
            lazyelem.listen()
            this.getVipPrice(0)
        },
        eventInit: function() {
            let _this = this

            superMemberIndex.$superRecommondGoodsFloor.on(
                'click',
                '.tab-menu a',
                function() {
                    var $this = $(this)
                    var index = $this.index()
                    if ($this.hasClass('selected')) {
                        return
                    }

                    $this
                        .addClass('selected')
                        .siblings()
                        .removeClass('selected')
                    _this.render(index)
                }
            )
        },
        getVipPrice: function(i) {
            let _this = this

            var domList = superMemberIndex.$superRecommondGoodsFloor
                    .find('.conlist .goods')
                    .slice(20 * i, 20 * (i + 1)),
                partNumberArray = [],
                shopIdArray = [],
                cityId = superMemberCommon.cityId

            $(domList).each(function() {
                let $this = $(this)

                partNumberArray.push($this.attr('data-product-id'))
                shopIdArray.push($this.attr('data-shop-id'))
            })

            if (!$(domList).length) {
                return
            }

            $.ajax({
                url:
                    superMemberCommon.icpsDomain +
                    '/getVarnishAllPrice014/' +
                    partNumberArray.join(',') +
                    '_' +
                    cityId +
                    '__' +
                    shopIdArray.join(',') +
                    '_1_getPrice' +
                    i +
                    '.vhtm',
                dataType: 'jsonp',
                jsonpCallback: 'getPrice' + i,
                async: false,
            })
                .done(function(res) {
                    $(domList).each(function(index, item) {
                        var noSuperVipPrice = false
                        var superPriceContent = '',
                            priceContent = '',
                            productClass = ''
                        if (res[index].status == 1) {
                            //无货、暂不销售等不能卖的状态统一显示已售罄, n.status == 1，可售, n.invStatus == 1，有货
                            if (res[index].price) {
                                if (res[index].marketVipPriceType == '4-15') {
                                    //4-15 取marketVipPrice值

                                    if (res[index].marketVipPrice) {
                                        var chargePrice = Math.floor(
                                            (Number(res[index].price) * 100 -
                                                Number(
                                                    res[index].marketVipPrice
                                                ) *
                                                    100) /
                                                100
                                        )
                                        var vipPriceArr = (
                                            res[index].marketVipPrice + ''
                                        ).split('.')
                                        superPriceContent =
                                            '<em class="yuan">&yen;</em><span class="price">' +
                                            vipPriceArr[0] +
                                            '.' +
                                            (vipPriceArr[1]
                                                ? vipPriceArr[1]
                                                : '00') +
                                            '</span>' +
                                            (chargePrice
                                                ? '<span class="tag">省&yen;' +
                                                  chargePrice +
                                                  '</span>'
                                                : '')
                                    } else {
                                        superPriceContent = 'SUPER活动已结束'
                                        noSuperVipPrice = true
                                    }
                                } else {
                                    if (res[index].vipPrice) {
                                        var chargePrice = Math.floor(
                                            (Number(res[index].price) * 100 -
                                                Number(res[index].vipPrice) *
                                                    100) /
                                                100
                                        )
                                        var vipPriceArr = (
                                            res[index].vipPrice + ''
                                        ).split('.')
                                        superPriceContent =
                                            '<em class="yuan">&yen;</em><span class="price">' +
                                            vipPriceArr[0] +
                                            '.' +
                                            (vipPriceArr[1]
                                                ? vipPriceArr[1]
                                                : '00') +
                                            '</span>' +
                                            (chargePrice
                                                ? '<span class="tag">省&yen;' +
                                                  chargePrice +
                                                  '</span>'
                                                : '')
                                    } else {
                                        superPriceContent = 'SUPER活动已结束'
                                        noSuperVipPrice = true
                                    }
                                }

                                priceContent =
                                    '易购价: &yen;' + res[index].price
                            } else {
                                // 活动结束
                                superPriceContent = 'SUPER活动已结束'
                                noSuperVipPrice = true
                            }
                        } else {
                            productClass = 'product-over'
                            superPriceContent = '该商品已售罄'
                            noSuperVipPrice = true
                        }

                        if (productClass) {
                            $(this).addClass(productClass)
                        }

                        if (noSuperVipPrice) {
                            superMemberCommon.sendMsg(
                                'ffhy-pcIndex-getVipPrice',
                                $(item)[0].dataset,
                                'ffhy-pdsysp_pc-20001'
                            ) //无会员价
                        }

                        $(this)
                            .find('.super-price')
                            .html(superPriceContent)

                        if (priceContent) {
                            $(this)
                                .find('.yg-price')
                                .html(priceContent)
                        }
                    })
                })
                .fail(function() {})
            _this.getVipPrice(++i)
        },
    },
    getNowMemberType: function(vipType) {
        let config = {
            '0': 'isNotPay',
            '1': 'isPay',
            '2': 'isTry',
        }
        // 默认普通会员
        return config[vipType] || 'isNotPay'
    },
}

$(window).resize(function() {
    let $btnList = $('.btn-list')[0]
    var windowHeight = document.documentElement.clientHeight
    if ($btnList) {
        let $privilegeList = $('.privilege-list')
        let $privilegelistLI = $('.privilege-list > li')
        let $computer = $('.computer')

        if (windowHeight <= 640) {
            $privilegeList.css({ height: '155px', 'overflow-y': 'auto' })
            $privilegelistLI.css({ height: '50px' })
            $computer.css('min-height', '450px')
        }
        if (windowHeight > 640) {
            var newHeightLi =
                parseInt(100 / $('.privilege-list li').length - 0.5) + '%'
            var listLineHeight = $('.privilege-list li').height() + 'px'
            $computer.css('min-height', '600px')
            $privilegeList.css({ height: '50%', 'overflow-y': 'hidden' })
            $privilegelistLI.css({
                height: newHeightLi,
                'line-height': listLineHeight,
            })
        }
        $btnList.style.lineHeight = windowHeight / 10 - 15 + 'px'
    }
})

$(function() {
    try {
        sa.openAPI = sa.openAPI || {}
        sa.initTrackerConfig()
    } catch (error) {}
    superMemberIndex.init()
    superMemberCommon.analysis()
})
