var userGenerator = (userName) => {
    return {
        userName,
        joinedAt: new Date().getTime()
    }
};