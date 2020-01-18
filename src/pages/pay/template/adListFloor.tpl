<div class="ad-list">
  {{if middleAdvt && middleAdvt.length}}
  <a href="{{middleAdvt[0].targetUrl ? middleAdvt[0].targetUrl : 'javasceipt:;'}}" target="_blank" name="wbffhy_sy_tlgg_dt">
    <img class="single-ad" lazy-src="{{pictureServerUrl + middleAdvt[0].imageUrl}}"/>
  </a>
  {{/if}}
  {{if memberActivities && memberActivities.length > 2}}
  <ul class="list">
    {{each memberActivities item index}}
    {{if index < 3}}
    <li>
      <a href="{{item.targetUrl ? item.targetUrl : 'javascript:;'}}" target="_blank" name="wbffhy_sy_hd_hd{{index + 1}}">
        <img lazy-src="{{pictureServerUrl + item.imageUrl}}"/>
      </a>
    </li>
    {{/if}}
    {{/each}}
  </ul>
  {{/if}}
</div>
