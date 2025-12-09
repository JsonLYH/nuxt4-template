import { http,$http } from '@/utils/request'

export interface ILeaveMessageType {
    isRead?: number;
    id?: string;
    title?: string;
    updateTimestamp?: string;
    content?: string;
    email?: string;
    createTimestamp?: string;
}

/**
 * POST请求(服务端渲染)
 * @param data
 */
export const postDemoByServer = (data: ILeaveMessageType) => {
    return http({
        method: 'POST',
        url: `/api/v1/leaveMessage/addLeaveMessage`,
        data,
        cacheKey:'postDemoByServer',
    })
}
/**
 * GET请求(服务端渲染)
 * @param data
 */
export const getDemoByServer = (data: ILeaveMessageType) => {
    return http({
        method: 'GET',
        url: `/api/v1/leaveMessage/getLeaveMessage`,
        params:data,
        cacheKey:'postDemoByServer',
    })
}

/**
 * POST请求(客户端渲染)
 * @param data
 */
export const postDemoByClient = (data: ILeaveMessageType) => {
    return $http({
        method: 'POST',
        url: `/api/v1/leaveMessage/addLeaveMessage`,
        data,
    })
}
/**
 * GET请求(客户端渲染)
 * @param data
 */
export const getDemoByServerByClient = (data: ILeaveMessageType) => {
    return $http({
        method: 'GET',
        url: `/api/v1/leaveMessage/getLeaveMessage`,
        params:data,
    })
}