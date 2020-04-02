{{if superGoods && superGoods.length}}
<div class="conlist">
  <ul>
    {{each superGoods item key}}
    <li>
        <a class="goods" href="{{item | formatProductHref}}" target="_blank" data-product-id="{{item.partNumber}}" data-shop-id="{{item.sellerNo}}" name="wbffhy_sy_tj_lm{{tabIndex}}sp{{key + 1}}">
          {{ if item.illegalFlag == "1"}}
              <img lazy-src='{{item.pictureUrl}}_400w_400h_4e' />
          {{else}}
              <img />
          {{/if}}
          <p class="name">{{item.partName}}</p>
          <p class="super-price"></p>
          <p class="yg-price"></p>
          <i class="over-icon"></i>
        </a>
    </li>
    {{/each}}
  </ul>
</div>
{{/if}}
