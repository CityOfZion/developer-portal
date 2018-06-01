const alertUser = (userId, title, message) => {
    UserAlerts.insert({
        title: title,
        content: message,
        userId: userId,
        alertedOn: new Date(),
        read: false
    });
};

export {
    alertUser
}