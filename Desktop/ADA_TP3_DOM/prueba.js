const edit = () => {
    const newUser = {
        ...user,
        phone: phone,
        fullname: fullname,
        address: address,
        email: email
    }

    const editUsers = async () => {
        try {
            const res = await axios.put(`https://5f7c70d600bd74001690ac5e.mockapi.io/users/${newUser.id}`, newUser)
            const newUsers = res.data;
            console.log(res.data)
            let userIndex = newUsers.findIndex(u => u.id == user.id);
            if (userIndex == -1) {
                if (user) throw new Error("Error!!!! Horror!!!");
                userIndex = newUsers.length;
            }
            mewUsers[userIndex] = newUser;
            createTable(newUsers);
            close();/// tengo que poner la accion de cerrar
        } catch (err) {
            console.log(err, `edito?`);
        }
    }
}