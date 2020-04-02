{{if catagories && catagories.length > 0}}
  <div class="super-recommond-goods">
    <div class="title"></div>
    <dl class="tab-wrap">
      <dt class="tab-menu">
        {{each catagories item index}}
      		<a href="javascript:;" class="{{index == 0 ? 'selected' : ''}}" name="wbffhy_sy_tj_{{item.id}}">{{item.categoryName}}</a>
        {{/each}}
      </dt>
      <dd class="tab-con"></dd>
    </dl>
  </div>
{{/if}}
