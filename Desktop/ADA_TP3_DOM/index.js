const load = () => {
    const modal = document.querySelector('.modal');

    const backgroundModal = document.querySelector('.background-modal')
    const btnModalClose = document.querySelector('#btn-modal-close')

    document.getElementById('btn-modal').addEventListener('click', () => {
        backgroundModal.style.display = "block";
        modal.style.top = "0";
        modal.style.right = "50";
    });

    document.getElementById('btn-modal-close').addEventListener('click', () => {
        backgroundModal.style.display = "none";
        modal.style.top = "-1000px";
        modal.style.right = "50";
    });
    document.getElementById('btn-cancel').addEventListener('click', () => {
        backgroundModal.style.display = "none";
        modal.style.top = "-1000px";
        modal.style.right = "50";
    });





    ///// EMPEZAMOS CON TABLA//////

    getUsers();
    editUsers(newUser);

}

const getUsers = async () => {
    try {
        const res = await axios.get(`https://5f7c70d600bd74001690ac5e.mockapi.io/users`)
        const users = res.data;
        console.log(res.data)
        createTable(users);
    } catch (err) {
        console.error(err, `que pasa`);
    }
}

const editUsers = async (newUser, user) => {
    try {
        const res = await axios.put(`https://5f7c70d600bd74001690ac5e.mockapi.io/users/${user.id}`, newUser)
        const users = res.data;
        console.log(res.data)
        createTable(users);
    } catch (err) {
        console.log(err, `edito?`);
    }
}

const createTable = (users) => {
    const tbody = document.querySelector("#table-body");
    let id = 01;
    users.forEach(user => {
        const row = document.createElement("tr");
        row.classList.add("table")
        const tdCheck = document.createElement("td");
        tdCheck.classList.add("check");
        const check = document.createElement("input");
        check.type = "checkbox";
        const tdName = document.createElement("td");
        tdName.classList.add("table-content");
        const tdEmail = document.createElement("td");
        tdEmail.classList.add("table-content");
        const tdAddress = document.createElement("td");
        tdAddress.classList.add("table-content");
        const tdPhone = document.createElement("td");
        tdPhone.classList.add("table-content");
        const tdActions = document.createElement("td");
        tdActions.classList.add("table-content");
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn");
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("btn");

        row.innerText = id++;
        console.log("ver si funciona el id", row.innerText)
        tdName.innerText = user.fullname;
        /* console.log(`ver que onda`, user.fullname) */
        tdEmail.innerText = user.email;
        /*  console.log(`ver que onda`, user.email) */
        tdAddress.innerText = user.address;
        tdPhone.innerText = user.phone;
        btnEdit.innerText = "EDIT";
        btnDelete.innerText = "DELETE";

        row.appendChild(tdCheck);
        check.appendChild(tdCheck);
        row.appendChild(tdName);
        row.appendChild(tdEmail);
        row.appendChild(tdAddress);
        row.appendChild(tdPhone);
        row.appendChild(tdActions);
        tdActions.appendChild(btnEdit);
        tdActions.appendChild(btnDelete);
        tbody.appendChild(row);
        console.log(tbody)

        const editar = user => {
            const modal = document.querySelector('#edit-modal');
            backgroundModal.style.display = "block";
            modal.style.top = "0";
            modal.style.right = "50";
            document.querySelector("#name2").value = user.fullname;
            document.querySelector("#email2").value = user.email;
            document.querySelector("#address2").value = user.address;
            document.querySelector("#phone2").value = user.phone;
            document.querySelector(".btn-edit").addEventListener('click', () => {
                const newName = document.querySelector("#name2").value;
                const newEmail = document.querySelector("#email2").value;
                const newAddress = document.querySelector("#address2").value;
                const newPhone = document.querySelector("#phone2").value;
                console.log(`NVO VALUE`, newName, newEmail, newPhone, newAddress)
                const newUser = {
                    ...user,
                    phone: newPhone,
                    email: newEmail,
                    address: newAddress,
                    fullname: newName,
                    id: id
                }
                editUsers(newUser, user);
                backgroundModal.style.display = "none";
                modal2.style.top = "-1000px";
                modal2.style.right = "50";
            });
        }
        btnEdit.addEventListener("click", () => editar(user));
    })

    const modal2 = document.querySelector('#edit-modal');
    const backgroundModal = document.querySelector('.background-modal')
    document.querySelector('#btn-modal-close2').addEventListener('click', () => {
        backgroundModal.style.display = "none";
        modal2.style.top = "-1000px";
        modal2.style.right = "50";
    });
    document.querySelector('#btn-cancel2').addEventListener('click', () => {
        backgroundModal.style.display = "none";
        modal2.style.top = "-1000px";
        modal2.style.right = "50";
    });

}
