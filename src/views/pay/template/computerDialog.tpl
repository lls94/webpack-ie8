<div class="computer-dialog">
  <div class="computer">
      <div class="newbg">
    <a class="close" href="javascript:;"></a>
    <div class="avater">
      <img src="{{bigHeadPic}}" />
      <div class="avater-bg"></div>
    </div>
    <p class="name ellipsis">
      {{neckName}}
    </p>
    <p class="description ellipsis">
      {{if vipType==1}}
        SUPER会员期间已节省<em>&yen;{{money}}</em>元
      {{else}}
        成为SUPER会员平均可省<em>&yen;{{money}}</em> /年
      {{/if}}
    </p>
    <p class="des">
      {{if vipType==1}}
        根据用户累计消费数据计算
      {{else}}
        根据易购用户平均年消费数据计算
      {{/if}}
    </p>
    </div>
    <ul class="privilege-list">
      {{if amount}}
      <li class="first">
        <span class="title">至高20倍返利</span>
        <span class="des">{{vipType==1 ? '以云钻体现，云钻购物可抵现':'以云钻形式体现，可额外获得'}}</span>
        <span class="price">&yen;&nbsp;{{amount}}</span>
      </li>
      {{/if}}
      {{if superDiscount}}
      <li class="second">
        <span class="title">SUPER专享券</span>
        <span class="des">{{vipType==1 ?'已使用SUPER会员专属的优惠券':'SUPER会员专属的优惠券预计可节省'}}</span>
        <span class="price">&yen;&nbsp;{{superDiscount}}</span>
      </li>
      {{/if}}
      {{if postageFee}}
      <li class="third">
        <span class="title">可省运费</span>
        <span class="des">{{vipType==1 ?'已使用运费券总价值':'全年24张自营运费券+12张海外购运费券'}}</span>
        <span class="price">&yen;&nbsp;{{postageFee}}</span>
      </li>
      {{/if}}
      {{if pptvMember}}
      <li class="fourth">
        <span class="title">PP影视会员</span>
        <span class="des">PP视频影视会员372天</span>
        <span class="price">&yen;&nbsp;{{pptvMember}}</span>
      </li>
      {{/if}}
      {{if privilege}}
        <li class="five">
            <span class="title">会员专属优惠</span>
            <span class="des">专享会员价商品优惠</span>
            <span class="price">&yen;&nbsp;{{privilege}}</span>
        </li>
      {{/if}}
      {{if pptyMember}}
      <li class="six">
        <span class="title">PP体育会员</span>
        <span class="des">{{vipType==1 ? '已获得31天足球通会员+3张观赛券':'31天足球通会员+3张观赛券'}}</span>
        <span class="price">&yen;&nbsp;{{pptyMember}}</span>
      </li>
      {{/if}}
      {{if  miguDiscount}}
        <li class="eight">
            <span class="title">咪咕音乐会员</span>
            <span class="des">已获得咪咕音乐白金会员年卡</span>
            <span class="price">&yen;&nbsp;{{miguDiscount}}</span>
        </li>
      {{/if}}
      {{if superGoodsDiscount}}
        <li class="extraPay">
            <span class="title">会员专属优惠</span>
            <span class="des">会员价商品优惠</span>
            <span class="price">&yen;&nbsp;{{superGoodsDiscount}}</span>
        </li>
      {{/if}}
      {{if TencentVideo}}
        <li class="extraPay">
            <span class="title">腾讯视频VIP会员</span>
            <span class="des">已获得腾讯视频VIP会员年卡</span>
            <span class="price">&yen;&nbsp;{{TencentVideo}}</span>
        </li>
      {{/if}}
      {{if YoukuVideo}}
        <li class="extraPay">
            <span class="title">优酷视频VIP会员</span>
            <span class="des">已获得优酷视频VIP会员年卡</span>
            <span class="price">&yen;&nbsp;{{YoukuVideo}}</span>
        </li>
      {{/if}}
      {{if IqiyiVideo}}
        <li class="extraPay">
            <span class="title">爱奇艺黄金VIP</span>
            <span class="des">已获得爱奇艺黄金视频会员年卡</span>
            <span class="price">&yen;&nbsp;{{IqiyiVideo}}</span>
        </li>
      {{/if}}
    </ul>
    <div class="btn-list {{vipType === '0' && tryFlag === '1' ? '' : 'has-try'}}">
      <a class="free-use btn {{memberLevel < canTryUseLevel ? 'outLevel' : ''}}" href="javascript:;" name="wbffhy_sy_sqjsq_mfsy">免费试用</a>
      <a class="now-buy btn {{vipType === '1' ? 'has-open' : ''}}" href="javascript:;" name="{{vipType === '1' ? '' : 'wbffhy_sy_sqjsq_ljkt'}}">{{vipType === '1' ? '我知道了' : '立即购买'}}</a>
    </div>
  </div>
  <div class="layer"></div>
</div>
