<div class="rights {{rightClassName}}">
  <div class="top-bg"></div>
  <div class="center">
    <p class="tips" name="wbffhy_sy_tb_sqjsq"></p>
    <div class="rights-content">
      <div class="title">
        <p class="retrench-money">&yen;<em class="money"></em></p>
      </div>
      <ul class="rights-list clearfix">
        {{each privItems item index}}
          {{if item.activeFlag}}
            <li>
              <a href="{{myPrivPage}}?showType={{quanYiShowType}}#superPrivType={{item.privNum}}" target="_blank" name="wbffhy_sy_tb_icon{{item.privNum}}">
                <i class="icon icon-{{item.privNum}}"></i>
                <p class="right ellipsis">{{item.privShortIntro}}</p>
                <p class="text ellipsis {{item.privNum == 3 ? 'font-14' : ''}}">{{(allPriv[item.privNum] && allPriv[item.privNum].privContent) ? (item.privNum == 9 ? '免费电子书' : allPriv[item.privNum].privContent) : ''}}</p>
              </a>
            </li>
          {{/if}}
        {{/each}}
      </ul>

      <div class="try-content clearfix">
        <div class="user left">
          <div class="user-avater left">
              <img src="{{bigHeadPic}}"/>
              <div class="avater-bg"></div>
          </div>
          <div class="user-info left">
            <p class="user-name">
              <span class="name">{{neckName}}</span>{{if vipType == 2}}<span class="tag">试用</span>{{else}}<span class="crown"></span>{{/if}}
            </p>
            <div class="expire">
              {{ if vipType !== '0' && (expireTime === '1' || expireTime === '2' || expireTime === '3') }}
                还有<em>{{expireTime}}</em>天{{vipType == 2 ? '试用' : ''}}到期
              {{ else if vipType !== '0' && expireTime === '0'}}
                {{vipType == 2 ? '试用期' : ''}}<em>今天</em>到期
              {{ else if vipType === '0' && froozenCloud && froozenCloud !== '0' }}
                试用已到期
              {{ else }}
                <span class="normal">{{expireTime}} {{vipType == 2 ? '试用' : ''}}到期</span>
              {{ /if }}
            </div>
            <a href="{{myPrivPage}}?showType={{quanYiShowType}}" class="all-right-link" target="_blank" name="wbffhy_sy_tb_wdqy">查看全部权益></a>
            {{if vipType == "1" && isRePay == "1" && dateSpan <= limitToVipDay}}
                {{if miguSuperFlag==1}}
                    <a href="{{payPage}}" target="_blank"><div class="renew">续费 &yen; {{payPrice199.price}} </div></a>
                {{else}}
                    <a href="{{payPage}}&select=0" target="_blank"><div class="renew">续费 &yen; {{payPrice149.price}} </div></a>
                {{/if}}
            {{/if}}
          </div>
        </div>
        <div class="line left"></div>
        <ul class="has-rights left">
          <li class="left">
            <i class="icon icon-1-light left"></i>
            <div class="right left">
              <p class="right-text">{{vipType == 1 ? '' : '待返'}}云钻 <em>{{vipType == 1 ? cloudValue : froozenCloud}}</em></p>
              <p class="right-description">
                购买SUPER会员后立即到账
              </p>
              <a href="{{vipType == 1 ? (vipDomain + '/ams-web/member/exchangeDetail.htm') : (myPrivPage+ '?showType='+ quanYiShowType + '#superPrivType=1')}}" target="_blank" class="all-right-link" name="{{vipType == 1 ? 'wbffhy_sy_tb_ckljyz' : 'wbffhy_sy_tb_ckmx'}}">查看详情></a>
            </div>
          </li>
          <li class="left">
            <i class="icon icon-3-light left"></i>
            <div class="right left">
              <p class="right-text">可用运费券 <em>{{remainFreePostageCouponNum >=0 ? remainFreePostageCouponNum : "1"}}</em> 张 {{if vipType == 1}}<span class="postage-text">3张 / 月</span> {{/if}}</p>
              <p class="right-description">
                正式会员每年36张
              </p>
              <a href="{{myPrivPage}}?showType={{quanYiShowType}}#superPrivType=3" target="_blank" class="all-right-link" name="{{ vipType == 1 ? 'wbffhy_sy_tb_ckyfq2' : 'wbffhy_sy_tb_ckyfq1'}}">查看详情></a>
            </div>
          </li>
          {{if vipType == 1}}
            <li class="left">
              <i class="icon icon-6-light left"></i>
              <div class="right left">
                <p class="right-text">PP影视会员 <em>372</em> 天</p>
                <a href="{{myPrivPage}}?showType={{quanYiShowType}}#superPrivType=6" target="_blank" class="all-right-link" name="wbffhy_sy_tb_ckpptv">查看详情></a>
              </div>
            </li>
            <li class="left">
              <i class="icon icon-8-light left"></i>
              <div class="right left zqt-priv">
                <a href="{{myPrivPage}}?showType={{quanYiShowType}}#superPrivType=8" name="wbffhy_sy_tb_cktygsq" class="{{G200_ZQT === '0' ? 'pptv-sup-icon' : ''}}"></a>
                <p class="right-text">PP体育优享年卡</p>
                <a href="{{myPrivPage}}?showType={{quanYiShowType}}#superPrivType=8" target="_blank" class="all-right-link" name="wbffhy_sy_tb_cktygsq">查看详情></a>
              </div>
            </li>
          {{/if}}
        </ul>
      </div>
      <ul class="options-list">
        <li class="try">
          <a href="javascript:;" class="free-try {{memberLevel < canTryUseLevel ? 'outLevel' : ''}}" name="wbffhy_sy_tb_mfsy">免费试用30天</a>
          <div class="textwarp1">
            <p class="text">V1及以上立即获得一张运费券</p>
          </div>
        </li>
        <li class="buy">

          {{if (payPrice149.type=='level')}}
              <a href="{{payPage}}&select=0" target="_blank" name="{{vipType == 2 ? 'wbffhy_sy_tb_ljkt2' : 'wbffhy_sy_tb_ljkt1'}}">立即购买 <em>&yen;</em><span class="pay">{{payPrice149.price}}</span>/年</a>
              <del class="text">原价 &yen;299/年</del>
              <i class="icon icon-level">
                {{memberLevel==0?'新人':'V'+memberLevel}}限时</i>
          {{else if (payPrice149.type=='ecology')}}
              <a href="{{payPage}}&select=0" target="_blank" name="{{vipType == 2 ? 'wbffhy_sy_tb_ljkt2' : 'wbffhy_sy_tb_ljkt1'}}">限时优惠 <em>&yen;</em><span class="pay">{{payPrice149.price}}</span>/年</a>
              <!--<p class="text">2%返利+36张运费券</p>-->
              <div class="textwarp">
                <p class="text st">根据您的生态值享限时折扣</p>
                <del class="text">原价 &yen;299/年</del>
              </div>
          {{else if (payPrice149.type=='customerGroup')}}
                <a href="{{payPage}}&select=0" target="_blank" name="{{vipType == 2 ? 'wbffhy_sy_tb_ljkt2' : 'wbffhy_sy_tb_ljkt1'}}">专属优惠价<em>&yen;</em><span class="pay">{{payPrice149.price}}</span>/年</a>
                <del class="text">原价 &yen;299/年</del>
          {{else}}
              <a href="{{payPage}}&select=0" target="_blank" name="{{vipType == 2 ? 'wbffhy_sy_tb_ljkt2' : 'wbffhy_sy_tb_ljkt1'}}">立即购买</a>
              <i class="icon icon-level">
                {{memberLevel==0?'新人':'V'+memberLevel}}限时</i>
              <del class="text">原价 &yen;299/年</del>
          {{/if}}
        </li>
      </ul>
    </div>
  </div>
</div>
