<div class="alert-box-common">
  {{if type == 'success'}}
    <i class="success-icon"></i>
  {{if successContent}}
    <p class="success-content">{{successContent}}</p>
  {{/if}}
  {{else if type == 'error'}}
    <i class="error-icon"></i>
    {{if errorContent}}
      <p class="error-content">{{errorContent}}</p>
    {{/if}}
  {{else if type == 'zqt'}}
    <i class="zqt-icon"></i>
    {{if errorContent}}
      <p class="error-content">{{errorContent}}</p>
    {{/if}}
  {{else if type == 'expire'}}
    <i class="expire-icon"></i>
    {{if successContent}}
      <p class="success-content">{{successContent}}</p>
    {{/if}}

  {{else if type == 'outLevel'}}
    <i class="out-level-icon"></i>
    {{if successContent}}
      <p class="success-content">{{successContent}}</p>
    {{/if}}
  {{else if type == 'level0'}}
    <i class="level0-icon"></i>
    {{if successContent}}
      <p class="success-content">{{successContent}}</p>
    {{/if}}
  {{else if type == 'creditScore'}}
    <div class='info'>
        <em>{{content.split('@')[0]}}</em>
        <div class='info-status {{content.split('@')[1] == '0' ? 'low' : (content.split('@')[1] == '2' ? 'good': (content.split('@')[1] == '3' ? 'excellent':''))}}'>
            <i></i><span class='info-tips'>{{content.split('@')[1] == '0' ? '信誉一般' : (content.split('@')[1] == '1' ? '信誉良好': (content.split('@')[1] == '2' ? '信誉优秀':'信誉极好'))}}</span>
        </div>
    </div>
    <div class='tips'>{{content.split('@')[2] ? content.split('@')[2] : ''}}</div>
    <div class="title">什么是阳光分</div>
    <div class="main-content">
      <div class='content'>{{content.split('@')[3]}}</div>
    </div>
  {{/if}}

  {{if content && type !== 'creditScore'}}
    <div class="common-content">{{content}}</div>
  {{/if}}
</div>