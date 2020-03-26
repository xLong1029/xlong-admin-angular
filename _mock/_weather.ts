import { MockRequest } from '@delon/mock';
export const Weather = {
    // 打点资源
    '/weather': (req: MockRequest) => {
        return {
            code: 200,
            msg: 'ok',
            data: {
                aqi: {
                    city: {
                        co: "333",
                        o3: "54",
                        so2: "6",
                        no2: "15",
                        pm25: "22",
                        pm10: "43",
                        qlty: "优"
                    }
                },
                now: {
                    fl: "27",
                    hum: "87",
                    pcpn: "0.0",
                    pres: "985",
                    tmp: "26",
                    vis: "16",
                    wind: {
                        deg: "160",
                        dir: "东南风",
                        sc: "3",
                        spd: "17"
                    }
                }
            }
        };
    }
};
