const getMatchedUserInfo = (userLoggedIn, users) => {
    const newUsers = { ...users };


    const [id, user] = Object.entries(newUsers).flat();

    return { id, ...user };
}

export default getMatchedUserInfo;