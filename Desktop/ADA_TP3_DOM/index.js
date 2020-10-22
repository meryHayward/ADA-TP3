const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePhone = (phone) => {
    const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    return re.test(String(phone).toLowerCase());
}

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

    document.getElementById('btn-add').addEventListener('click', () => {
        let isValid = true;
        const newName = document.querySelector("#name").value;
        // si newName.length > 50 alert "che la cagaste, es muy largo tu name"
        if (!newName || newName.length > 50) {
            alert("Name no valido");
            isValid = false;
        }
        const newEmail = document.querySelector("#email").value;
        if (!validateEmail(newEmail)) {
            alert("Email no valido");
            isValid = false;
        }
        const newAddress = document.querySelector("#address").value;
        if (!newAddress || newAddress.length > 60) {
            alert("Address no valido");
            isValid = false;
        }
        const newPhone = document.querySelector("#phone").value;
        if (!validatePhone(newPhone)) {
            alert("Phone no valido");
            isValid = false;
        }
        const newUser = {
            phone: newPhone,
            email: newEmail,
            address: newAddress,
            fullname: newName,
        }
        if (isValid) {
            createUser(newUser); 
            backgroundModal.style.display = "none";
            modal.style.top = "-1000px";
            modal.style.right = "50";
        }
    });
    
    ///// EMPEZAMOS CON TABLA//////

    getUsers();
    //editUsers(newUser); no hace falta llamar a edit user cuando cargamos la pagina
}

const getUsers = async () => {
    try {
        const res = await axios.get(`https://5f7c70d600bd74001690ac5e.mockapi.io/users`);
        const users = res.data;
        console.log(res.data)
        createTable(users);
    } catch (err) {
        console.error(err, `que pasa`);
    }
}

const editUsers = async (newUser, id) => { // newUser se podria llamar editedUser y pasar solo id del usuario a modificar
    try {
        const res = await axios.put(`https://5f7c70d600bd74001690ac5e.mockapi.io/users/${id}`, newUser)
        const users = getUsers(); // aca lo que necesitamos es llamar a los usuarios nuevamente (a todos, no solo al que edite)
        console.log(res.data)
        createTable(users);
    } catch (err) {
        console.log(err, `edito?`);
    }
}

const createUser = async (newUser) => {
    try {
        const res = await axios.post(`https://5f7c70d600bd74001690ac5e.mockapi.io/users`, newUser);
        const users = getUsers();
        createTable(users);
    } catch (err) {
        console.log(err); 
    }
}

const createTable = (users) => {
    const tbody = document.querySelector("#table-body");
    tbody.innerHTML = ''; // para que cada vez que se llame a createTable el tbody este vacio y evitar que se dupliquen los datos
    // let id = 01; no es necesario porque la api ya me trae el id
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

        row.innerText = user.id; // usar el id del usuario!
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
                    //id: id no es necesario porque ya viene con el spread operator 
                }
                editUsers(newUser, user.id);
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
