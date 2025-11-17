import { useFetch } from '#app';
import { createError } from '#app';
import type { IApiResponse, IHttpOptions } from '~/types';
import { $fetch } from 'ofetch';
import { getToken } from '~/utils/auth';
// import { useUserStore } from '~/store';
const SUCCESS_CODES = [0,200]
const baseURL = import.meta.env.VITE_API_BASE;
//获取鉴权信息
function getAuthorization() {
  try {
    // 只在客户端环境中访问 localStorage，这里在服务端渲染时，有问题
    if (typeof window !== 'undefined') {
      const token = getToken();
      return `Bearer ${token}`;
    }
    return ''; // 服务端返回空字符串
  } catch (e) {
    console.log(e);
    return '';
  }
}

//基于useFetch
async function http<T = any>(options: IHttpOptions): Promise<IApiResponse<T>> {
  const { url, method, params, data, cacheKey = '' } = options;
  const { $toast } = useNuxtApp();
  let config = {};
  const token = getAuthorization();
  Object.assign(config, {
    headers: {
      Authorization: token,
    },
  });

  const { data: result }: any = await useFetch(baseURL + url, {
    method: method,
    key: cacheKey,
    onRequest: ({ options }) => {
      options.body = data;
      options.query = params;
      options.timeout = 10000;
      Object.assign(options, config);
    },
    onResponse: async ({ response }) => {
      const res = response._data as IApiResponse<T>;
      const code = Number(res.code);
      if (!SUCCESS_CODES.includes(code)) {
        const expiredCodes = [1001];
        const logoutCodes = [1000];
        if (expiredCodes.includes(code)) {
          // const flag = await handleRefreshToken();
          // if (flag) {
          //   response._data = await http(options);
          // } else {
          //   useUserStore().logout();
          // }
        } else if (logoutCodes.includes(code)) {
          // useUserStore().logout();
          ElMessage.error('登录状态已过期，请重新登录');
        } else {
          ElMessage.error(res.message || '请求失败');
          throw createError({
            statusCode: res.code,
            statusMessage: res.message,
          });
        }
      }
    },
    onRequestError({ request, options, error }) {
      // 处理请求错误
      ElMessage.error(error.message || '请求失败');
      throw createError({ statusMessage: error.message });
    },
    onResponseError({ request, response, options }) {
      // 处理响应错误
      ElMessage.error(response.statusText || '请求失败');
      throw createError({ statusCode: response.status, statusMessage: response.statusText });
    },
  });
  return result.value;
}

//基于$fetch
async function $http<T = any>(options: IHttpOptions): Promise<IApiResponse<T>> {
  const { url, method, params, data } = options;
  const { $toast } = useNuxtApp();
  let config = {};
  const token = getAuthorization();
  Object.assign(config, {
    headers: {
      Authorization: token,
    },
  });

  const res = await $fetch(baseURL + url, {
    method: method,
    onRequest: ({ options }) => {
      options.body = data;
      options.query = params;
      options.timeout = 10000;
      Object.assign(options, config);
    },
    onResponse: async ({ response }) => {
      const res = response._data as IApiResponse<T>;
      const code = Number(res.code);
      if (!SUCCESS_CODES.includes(code)) {
        const expiredCodes = [1001];
        const logoutCodes = [1000];
        if (expiredCodes.includes(code)) {
          // const flag = await handleRefreshToken();
          // if (flag) {
          //   response._data = await $http(options);
          // } else {
          //   removeToken();
          //   useUserStore().logout();
          // }
        } else if (logoutCodes.includes(code)) {
          removeToken();
          // useUserStore().logout();
          ElMessage.error('登录状态已过期，请重新登录');
        } else {
          ElMessage.error(res.message || '请求失败');
          throw createError({
            statusCode: res.code,
            statusMessage: res.message,
          });
        }
      }
    },
    onRequestError: ({ request, options, error }) => {
      ElMessage.error(error.message || '请求失败');
      throw createError({ statusMessage: error.message });
    },
    onResponseError: ({ request, response, options }) => {
      ElMessage.error(response.statusText || '请求失败');
      throw createError({ statusCode: response.status, statusMessage: response.statusText });
    }
  });

  return res;
}

export { http, $http };
