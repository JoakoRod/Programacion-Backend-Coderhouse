const users = [
    {
        username: 'admin',
        password: 'admin',
        admin: true,
    },
    {
        username: 'usuario',
        password: 'usuario',
        admin: false,
    }
]

export function login(username: string, password: string, req: Request | any) {
    const index = users.findIndex((aUser) => aUser.username === username && aUser.password === password);

    if (index < 0)
        return false
    else {
        const user = users[index];
        req.session.info = {
            loggedIn: true,
            contador: 1,
            username: user.username,
            admin: user.admin,
        };
        return true
    }
}