const env = import.meta.env.MODE || 'prod';
const envConfig = {
    development: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/c96e8c1edfb69640fdc154836213613d/api'
    },
    test: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/c96e8c1edfb69640fdc154836213613d/api'
    },
    prod: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/c96e8c1edfb69640fdc154836213613d/api'
    }
}

export default {
    env,
    mock: true,
    namespace: 'manager',
    ...envConfig[env]
}