export const pageUrl = 'gas-station-theta.vercel.app';


export const sendText = (data, newData, selectOption) =>
  data.id !== '10001'
    ? `🎂 김기범 생일 기념 질문 🎂
  Q.${newData?.text || data?.text}
  - 당신의 선택 : ${selectOption[0]?.text}
  - ${parseFloat(
    ((selectOption[0]?.count / newData?.count || 0) * 100).toFixed(2)
  )}%의 릴프릭이 같은 선택을 하였습니다.
  
  투표하기 및 결과보러가기 ->
`
    : `🎂 김기범 생일 기념 질문 🎂
Q.${newData?.text || data?.text}
- 당신의 선택 : ${selectOption?.map(({ text }) => text)}

투표하기 및 결과보러가기 ->
`;


export const taeminText = (data, newData, selectOption) => `💎 2023 TAEMIN IS BACK 💎
Q. ${newData?.text || data?.text}
- ${selectOption?.map(({ text }) => ` ${text}\n`).join('-')}

투표하기 및 결과보러가기 ->
`;

export const shineeText = (data, newData, selectOption) => `💎 2023 SHINee IS BACK 💎
Q.${newData?.text || data?.text}
  - 당신의 선택 : ${selectOption[0]?.text}
  - ${parseFloat(
    ((selectOption[0]?.count / newData?.count || 0) * 100).toFixed(2)
  )}%의 샤월이 같은 선택을 하였습니다.

투표하기 및 결과보러가기 ->
`;
