export type GAEventCategory = "view" | "action" | "interaction";

export type GAEventLabel = "button-click" | "sign-in" | "sign-up" | "purchase" | "page-view";

export type GAPredefinedPathname = {};

export interface GAEventDetailValue {}

export interface GAEventGAProps {
  /** 이벤트 명 */
  actionName: string;
  /** 이벤트 타입 */
  eventCategory: GAEventCategory;
  /** 이벤트 타입 상세 */
  eventLabel: GAEventLabel;
  /** 필요한 경우 구조분해 할당으로 재정의 */
  value: string | object;
  /** 비상호작용 이벤트 */
  nonInteraction?: boolean;
}

export interface GAEventNameByPath {}
