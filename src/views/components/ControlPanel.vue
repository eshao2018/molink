<template>
  <div class="control-panel">

    <!-- 幽默值拨盘 -->
    <div class="control-item">
      <div class="label">幽默值</div>
      <el-radio-group v-model="options.humor" @change="v => options.humor = v">
        <el-radio label="关闭" border>关闭</el-radio>
        <el-radio label="偶尔玩梗" border>偶尔玩梗</el-radio>
        <el-radio label="段子手" border>段子手</el-radio>
        <el-radio label="疯狂玩梗" border>疯狂玩梗</el-radio>
      </el-radio-group>
    </div>

    <!-- 风格胶囊按钮 -->
    <div class="control-item">
      <div class="label">语言风格</div>
      <el-button-group>
        <el-button
          v-for="style in ['🙂平平淡淡', '😏阴阳怪气', '🤡毒舌嘲讽', '🔨硬核怼人', '🍭稚气未脱', '😴敷衍摆烂', '💣暴力拆解', '🌀意识流', '🔍有理有据', '🌪️顾左右而言他']"
          :key="style" :type="options.style === style ? 'primary' : 'default'" @click="options.style = style">
          {{ style }}
        </el-button>
      </el-button-group>
    </div>

    <!-- <div class="control-item">
      <div class="label">破防策略</div>
      <el-select v-model="options.breakdown_strategy" style="width: 100%;max-width: 500px;">
        <el-option v-for="item in ['无', '凡尔赛对比', '假装关心', '价值解构', '数据挑刺', '流程漏洞放大', '冷读术', '归谬法', '降维打击']" :key="item"
          :label="item" :value="item"></el-option>
      </el-select>
    </div> -->
  </div>
</template>

<script setup>
import { options } from '../store'

</script>

<style scoped lang="less">
.control-panel {
  padding: 24px;
  border-radius: 12px;
  background-color: #fff;
  transition: all 0.3s ease;

  .control-item {
    margin-bottom: 28px;
    transition: opacity 0.3s ease;

    &:last-child {
      margin-bottom: 0;
    }

    .label {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #2c3e50;
      letter-spacing: 0.5px;
    }
  }

  .el-slider {
    :deep(.el-slider__runway) {
      height: 6px;
      background-color: #e8f0fe;
    }

    :deep(.el-slider__bar) {
      transition: width 0.3s ease;
    }

    :deep(.el-slider__button) {
      width: 18px;
      height: 18px;
      background-color: #fff;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.1);
      }
    }

    :deep(.el-slider__marks-text) {
      color: #606266;
      font-size: 13px;
      margin-top: 8px;
    }
  }

  .el-radio-group {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;

    .el-radio {
      margin-right: 0;
      transition: all 0.3s ease;

      :deep(.el-radio__input) {
        .el-radio__inner {
          border-color: #dcdfe6;
          transition: all 0.3s ease;

        }
      }

      :deep(.el-radio__label) {
        color: #606266;
        font-size: 14px;
        padding-left: 8px;
      }
    }
  }

  .el-button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    &::before {
      display: none;
    }

    .el-button {
      margin: 0;
      border-radius: 20px;
      padding: 8px 20px;
      transition: all 0.3s ease;
      border-color: #dcdfe6;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>