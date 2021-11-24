import { InputNumber } from 'antd';

export default function onChange() {
  return <InputNumber min={1} max={10} defaultValue={0} onChange={onChange} />;
}
