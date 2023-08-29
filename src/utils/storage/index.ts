export const storeStorageData = (key: string, value: any) => {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
}

export const getStorageData = (key: string) => {
  try {
    const value = localStorage.getItem(key)
    return value ? value : null
  } catch (e) {
    // error reading value
    return null
  }
}

export const clearStorage = () => {
  try {
    localStorage.clear()
  } catch (e) {
    // log the error
  }
}
