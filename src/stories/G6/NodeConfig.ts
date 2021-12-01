import { ShapeStyle, ILabelConfig, ModelConfig } from '@antv/g6'

enum NodeType {
  company = 'company',
  companyInner = 'companyInner',
  companyOuter = 'companyOuter',
  group = 'group',
  person = 'person',
  phone = 'phone',
}
/**
 * 通过配置 icon，可以在圆上显示小图标。
 * https://g6.antv.vision/zh/docs/manual/middle/elements/nodes/built-in/ellipse/#%E5%9B%BE%E6%A0%87-icon
 */
export interface G6IconType {
  show?: boolean;
  img?: string;
  text?: string;
  width?: number;
  height?: number;
  offset?: number;
}

// 图标宽高
const G6IconConfigMap = {
  [NodeType.company]: { width: 48, height: 48 },
  [NodeType.companyInner]: { width: 48, height: 48 },
  [NodeType.companyOuter]: { width: 48, height: 48 },
  [NodeType.group]: { width: 64, height: 64 },
  [NodeType.person]: { width: 32, height: 32 },
  [NodeType.phone]: { width: 32, height: 32 },
} as { [key in NodeType]?: G6IconType };

// 图标地址
const LogoSrcMap = {
  [NodeType.company]: require('../../assets/g6/company.svg'),
  [NodeType.companyInner]: require('../../assets/g6/company_inner.svg'),
  [NodeType.companyOuter]: require('../../assets/g6/company_outer.svg'),
  [NodeType.group]: require('../../assets/g6/group.svg'),
  [NodeType.person]: require('../../assets/g6/person.svg'),
  [NodeType.phone]: require('../../assets/g6/phone.svg'),
};

// 自定义图标
export function createG6IconConfig (type?: NodeType, text?: string): G6IconType | undefined {
  if (!type) return undefined
  return {
    ...G6IconConfigMap[type],
    img: LogoSrcMap[type],
  }
}


export function createNode(type?: NodeType): ModelConfig{
  if (!type) return {};
  const icon = createG6IconConfig(type);
  return {
    type: 'image',
    img: LogoSrcMap[type],
    size: [icon?.width || 0, icon?.height || 0],
    style: {
      opacity: 1
    },
    clipCfg: {
      show: true,
      type: 'circle',
      ...icon,
    },
    labelCfg: {
      position: 'top',
      offset: 10,
      style: {
        fill: '#333',
      },
    },
    stateStyles: {
      highlight: {
        opacity: 1,
        labelCfg: {
          style: {
            fill: '#333',
          },
        }
      },
      dark: {
        opacity: 0.2,
        labelCfg: {
          style: {
            fill: '#999',
          },
        }
      },
    }
  };
}


