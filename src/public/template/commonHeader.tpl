<div class="common-header-wrap {{tapsNotDisplay ? 'bg-header-grey' : ''}}">
  <div class="common-header super-member-common-main">
    <a class="super-member-icon" href="{{pageUrl.index}}" name="wbffhy_sy_dh_pd"></a>
    <ul class="super-member-t">
      <li class="super-member-t-i {{pageType == 'index' ? 'active' : ''}}">
        <a class="super-member-t-i-c" href="{{pageUrl.index}}" name="wbffhy_sy_dh_tab1">{{tapsNotDisplay ? '' : 'SUPER首页'}}</a>
      </li>
      <li class="super-member-t-i {{pageType == 'myAllPriv' ? 'active' : ''}}">
        <a class="super-member-t-i-c" href="{{pageUrl.myPrivPage}}{{quanYiShowType?'?showType='+quanYiShowType:''}}" name="wbffhy_sy_dh_tab2">{{tapsNotDisplay?'' : 'SUPER权益'}}</a>
      </li>
    </ul>
  </div>
</div>