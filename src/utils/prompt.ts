import type { PromptType, UserProfile } from '@/types';

const profileLine = (profile: UserProfile) =>
  [
    profile.currentStatus && `当前身份：${profile.currentStatus}`,
    profile.undergraduateSchool && `本科学校：${profile.undergraduateSchool}`,
    profile.undergraduateMajor && `本科专业：${profile.undergraduateMajor}`,
    profile.targetMajor && `目标专业：${profile.targetMajor}`,
    profile.targetRegion && `目标地区：${profile.targetRegion}`,
    profile.targetSchool && `目标院校：${profile.targetSchool}`,
    profile.dailyStudyHours && `每日可学习 ${profile.dailyStudyHours} 小时`,
    profile.progress && `当前进度：${profile.progress}`,
    profile.sleepSchedule && `作息：${profile.sleepSchedule}`,
  ]
    .filter(Boolean)
    .join('；');

const templates: Record<PromptType, string> = {
  chat:
    '你是考研备考助手。请结合用户信息回答问题，保持简洁、清晰、可执行，并提醒用户不要输入身份证号、手机号、住址等敏感信息。',
  schoolRecommend:
    '请根据用户考研信息推荐院校，按冲刺、稳妥、保底分类。每类给出推荐理由、风险提示和备考建议，并提醒以学校官网和研招网信息为准。',
  courseRecommend:
    '请根据用户基础推荐课程和资料，按政治、英语、数学、专业课分类，说明适合人群、推荐理由、使用阶段和使用方法。',
  studyPlan:
    '请生成考研学习计划，包含阶段目标、本周计划和每日任务，内容要可执行，避免复杂日历。',
  dailyTask:
    '请生成今天的学习任务，包含科目、内容、建议时长、重点任务和注意事项。',
  checkinReview:
    '请根据今日任务完成情况生成复盘建议，包含完成情况、问题、明日调整和鼓励语。',
  healthAdvice:
    '请给出健康作息建议，只作为普通生活建议。若出现严重焦虑或失眠，请提醒用户寻求专业帮助。',
};

export function buildPrompt(type: PromptType, profile: UserProfile, question = ''): string {
  const userContext = profileLine(profile) || '用户暂未填写完整考研信息';
  const task = templates[type];

  return [`${task}`, `用户信息：${userContext}`, question && `用户问题：${question}`]
    .filter(Boolean)
    .join('\n');
}
