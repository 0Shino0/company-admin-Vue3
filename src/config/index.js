/**
 * 环境变量配置 
 */
const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
    development: {
        baseApi: '/backend/',
        // baseApi: 'https://company-admin-server-production.up.railway.app/api',
        // baseApi: 'https://manager-server.yyshino.top/api/',
        mockApi: 'https://www.fastmock.site/mock/bdc39fe45bc0f9e22ae8dec88aeff8fe/api'
    },
    test: {
        baseApi: '//test.futurefe.com/api',
        mockApi: 'https://www.fastmock.site/mock/bdc39fe45bc0f9e22ae8dec88aeff8fe/api'
    },
    prod: {
        baseApi: '/backend/',
        // baseApi: 'https://manager-server.yyshino.top/api/',
        mockApi: 'https://www.fastmock.site/mock/bdc39fe45bc0f9e22ae8dec88aeff8fe/api'
    }
}

export default {
    env,
    mock: false,
    namespace: 'manager',
    ...EnvConfig[env]
}