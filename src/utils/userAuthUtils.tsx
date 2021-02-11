enum localStorageData {
  TOKEN = 'localeStorageToken',
  USERNAME = 'localeStorageUsername',
}

export function getUserAuthToken() {
  const maybeToken = localStorage.getItem(localStorageData.TOKEN);
  if (!maybeToken) {
    return null;
  } 
  return maybeToken;
}

export function getUserAuthUsername() {
  const maybeUsername = localStorage.getItem(localStorageData.USERNAME);
  if (!maybeUsername) {
    return null;
  } 
  return maybeUsername;
}

export function setUserAuthToken(userId: string, username: string) {
  localStorage.setItem(localStorageData.TOKEN, userId);
  localStorage.setItem(localStorageData.USERNAME, username);
}

export function isUserSignedIn() {
  return getUserAuthToken() !== null;
}

export function clearLocalStorage() {
  localStorage.clear();
}