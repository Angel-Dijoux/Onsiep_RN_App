let cachedAccessToken: string | null = null;

export const setCachedAccessToken = (accessToken: string) => {
    cachedAccessToken = accessToken;
};

export const getCachedAccessToken = () => {
    return cachedAccessToken;
};
