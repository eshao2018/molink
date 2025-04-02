<template>
  <div class="use-cases">
    <h2 class="section-title">经典使用场景</h2>
    <div class="case-grid">
      <!-- 网络杠精反击 -->
      <div class="case-card">
        <div class="case-icon">🎯</div>
        <h3>网络杠精反击</h3>
        <div class="case-content">
          <div class="case-input">
            <span class="label">道德绑架：</span>
            <p>"不转不是中国人"</p>
          </div>
          <div class="case-output">
            <span class="label">智能生成：</span>
            <p>
              "哎呀~现在连爱国都要靠转发来证明了？看来我的身份证得靠朋友圈点赞数来续费了呢🇨🇳"
            </p>
          </div>
        </div>
      </div>

      <div class="case-card">
        <div class="case-icon">✋</div>
        <h3>反PUA</h3>
        <div class="case-content">
          <div class="case-input">
            <span class="label">领导说：</span>
            <p>"年轻人不要总想着赚钱"</p>
          </div>
          <div class="case-output">
            <span class="label">智能生成：</span>
            <p>
              "钱不钱的无所谓，主要是想为公司燃烧生命（战术后仰）"
            </p>
          </div>
        </div>
      </div>

      <!-- 朋友圈高赞回复 -->
      <div class="case-card">
        <div class="case-icon">👏</div>
        <h3>社交媒体互动</h3>
        <div class="case-content">
          <div class="case-input">
            <span class="label">晒照配文：</span>
            <p>"运气而已"</p>
          </div>
          <div class="case-output">
            <span class="label">智能生成：</span>
            <p>
              "凡尔赛文学新教材有了！建议书名《从入门到精通：如何优雅地炫耀》😂"
            </p>
          </div>
        </div>
      </div>

      <!-- 相亲破冰对话 -->
      <div class="case-card">
        <div class="case-icon">💝</div>
        <h3>相亲破冰对话</h3>
        <div class="case-content">
          <div class="case-input">
            <span class="label">对方说：</span>
            <p>"我平时喜欢读书和健身"</p>
          </div>
          <div class="case-output">
            <span class="label">智能生成：</span>
            <p>
              "读书和健身！让我想起了《肌肉男与书呆子》这本不存在的畅销书...等等，你该不会就是传说中的『举铁时在kindle上看陀思妥耶夫斯基』的稀有物种？💪"
            </p>
          </div>
        </div>
      </div>

      <!-- 家庭沟通危机 -->
      <div class="case-card">
        <div class="case-icon">👨‍👩‍👧‍👦</div>
        <h3>家庭沟通危机</h3>
        <div class="case-content">
          <div class="case-input">
            <span class="label">父母说：</span>
            <p>"看看别人家孩子都结婚了"</p>
          </div>
          <div class="case-output">
            <span class="label">智能生成：</span>
            <p>
              "哎哟妈，您看今天的天气多适合种土豆啊~要不说老祖宗的二十四节气就是准呢"
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.use-cases {
  position: relative;
  margin: 24px 0;
  margin-bottom: 60px;

  .section-title {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
    background: linear-gradient(45deg, #ff9800, #ff5722);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
  }

  .case-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .case-card {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);

    .case-icon {
      font-size: 28px;
      margin-bottom: 12px;
    }

    h3 {
      margin: 0 0 16px;
      color: #2c3e50;
      font-size: 18px;
    }

    .case-content {

      .case-input,
      .case-output {
        margin-bottom: 12px;

        .label {
          color: #666;
          font-size: 14px;
          margin-bottom: 4px;
          display: block;
        }

        p {
          margin: 0;
          padding: 8px 12px;
          background: #f8f9fa50;
          border-radius: 6px;
          color: #2c3e50;
          font-size: 14px;
          line-height: 1.5;
        }
      }

      .case-output p {
        background: #fff5e680;
        color: #ff6b35;
      }
    }
  }
}

@media (max-width: 768px) {
  .use-cases .case-grid {
    grid-template-columns: 1fr;
  }
}
</style>
