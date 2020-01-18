{{ if vipType === '1' }}
  {{if serviceUrl}}
    <a class="service-btn index-sprite" href="{{serviceUrl}}" name="wbffhy_sy_tb_zxkf" target="_blank"></a>
  {{/if}}
{{ else }}
  {{if suggestUrl}}
    <a class="suggest-btn index-sprite" href="{{suggestUrl}}" name="wbffhy_sy_fc_yjfk" target="_blank"></a>
  {{/if}}
{{ /if }}
<a class="to-top-btn index-sprite" id="toTop" href="javascript:;" name="wbffhy_sy_fc_ymzd"></a>