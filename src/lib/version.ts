// Version configuration
export const APP_VERSION = {
  major: 1,
  minor: 0,
  patch: 0,
  buildDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
  buildTime: new Date().toISOString(),
};

export const getVersionString = () => {
  return `v${APP_VERSION.major}.${APP_VERSION.minor}.${APP_VERSION.patch}`;
};

export const getFullVersionString = () => {
  return `${getVersionString()} (${APP_VERSION.buildDate})`;
};

export const getBuildInfo = () => {
  return {
    version: getVersionString(),
    buildDate: APP_VERSION.buildDate,
    buildTime: APP_VERSION.buildTime,
    fullVersion: getFullVersionString(),
  };
};