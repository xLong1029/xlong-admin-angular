/**
* 监控类型枚举
*/
export enum MonitorTypeEnum {
    /**
     * 环境监测
     */
    meteorologicalEnv = 0,
    /**
     * 单灯控制
     */
    lampControl = 1,
    /**
     * LED监控
     */
    adScreen = 2,
    /**
     * 辐射环评
     */
    radiationEnv = 3,
    /**
     * 无线电监控
     */
    wirelessMonitor = 4,
    /**
     * 应急广播
     */
    broadcast = 65,
    /**
     * 智慧物流
     */
    logistics = 6
}