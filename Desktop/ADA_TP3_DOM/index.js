// Validar Inputs
const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePhone = (phone) => {
    const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    return re.test(String(phone).toLowerCase());
}

const checkAll = () => {
    const checks = document.querySelectorAll("#checkBoxId");
    checks.forEach(check => check.checked = !check.checked);
}

const load = () => {
    // Add New Employee
    document.querySelector('#btn-add').addEventListener('click', () => {
        let isValid = true;
        const newName = document.querySelector("#name").value;
        if (!newName || newName.length > 50) {
            alert("Name: Not valid.");
            isValid = false;
        }
        const newEmail = document.querySelector("#email").value;
        if (!validateEmail(newEmail)) {
            alert("Email: Not valid.");
            isValid = false;
        }
        const newAddress = document.querySelector("#address").value;
        if (!newAddress || newAddress.length > 60) {
            alert("Address: Not valid.");
            isValid = false;
        }
        const newPhone = document.querySelector("#phone").value;
        if (!validatePhone(newPhone)) {
            alert("Phone: Not valid.");
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
            document.querySelector("#name").value = '';
            document.querySelector("#email").value = '';
            document.querySelector("#address").value = '';
            document.querySelector("#phone").value = '';

            // Cerrar modal
            closebox('cerrarbox'); // no recuerdo si hay otra forma de pasar un parametro statico
        }
    });

    document.querySelector("#table-checkbox").addEventListener("click", () => { checkAll(); });

    // Cargar datos
    getUsers();
}

let users;

const getUsers = async () => {
    await axios.get("https://5f7c70d600bd74001690ac5e.mockapi.io/users")
        .then(res => {
            users = res.data;
            createTable(users);
            filter(users);
        })
        .catch(err => alert("Hubo un error"));
}

const editUsers = async (editUser, id) => { // newUser se podria llamar editedUser y pasar solo id del usuario a modificar
    try {
        await axios.put(`https://5f7c70d600bd74001690ac5e.mockapi.io/users/${id}`, editUser);
        getUsers();
    } catch (err) {
        console.log(err, `edito?`);
    }
}

const createUser = async (newUser) => {
    try {
        await axios.post(`https://5f7c70d600bd74001690ac5e.mockapi.io/users`, newUser);
        getUsers();
    } catch (err) {
        console.log(err);
    }
}


const createTable = (users) => {

    const tbody = document.querySelector("#table-body");

    tbody.innerHTML = ''

    users.forEach(user => {
        const row = document.createElement("tr");
        row.classList.add("tablerow");
        row.setAttribute("id", `empID-${user.id}`);
        const tdCheck = document.createElement("td");
        tdCheck.classList.add("check");
        const check = document.createElement("input");
        check.type = "checkbox";
        check.id = "checkBoxId";
        check.checked = false;
        const tdName = document.createElement("td");
        tdName.classList.add("modal-footer");
        const tdEmail = document.createElement("td");
        tdEmail.classList.add("modal-footer");
        const tdAddress = document.createElement("td");
        tdAddress.classList.add("modal-footer");
        const tdPhone = document.createElement("td");
        tdPhone.classList.add("modal-footer");
        const tdActions = document.createElement("td");
        tdActions.classList.add("modal-footer");
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("edit");
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("delete");

        tdName.innerText = user.fullname;
        tdEmail.innerText = user.email;
        tdAddress.innerText = user.address;
        tdPhone.innerText = user.phone;
        btnEdit.innerText = "EDIT";
        btnDelete.innerText = "DELETE";

        row.appendChild(tdCheck);
        tdCheck.appendChild(check);
        row.appendChild(tdName);
        row.appendChild(tdEmail);
        row.appendChild(tdAddress);
        row.appendChild(tdPhone);
        tdActions.appendChild(btnEdit);
        tdActions.appendChild(btnDelete);
        row.appendChild(tdActions);
        tbody.appendChild(row);

        const edit = user => {

            // Abrir Edit Modal
            openbox('editbox');

            document.querySelector("#name2").value = user.fullname;
            document.querySelector("#email2").value = user.email;
            document.querySelector("#address2").value = user.address;
            document.querySelector("#phone2").value = user.phone;
            const editAction = () => {
                const editName = document.querySelector("#name2").value;
                const editEmail = document.querySelector("#email2").value;
                const editAddress = document.querySelector("#address2").value;
                const editPhone = document.querySelector("#phone2").value;

                const editUser = {
                    ...user,
                    phone: editPhone,
                    email: editEmail,
                    address: editAddress,
                    fullname: editName,
                }

                editUsers(editUser, user.id);

                // Cerrar modal
                closebox('cerrarbox');
                removeEditListener();
            };
            const removeEditListener = () => {
                document.querySelector("#btn-modal-close").removeEventListener("click", removeEditListener)
                document.querySelector("#btn-cancel").removeEventListener("click", removeEditListener)
                document.querySelector("#btn-edit2").removeEventListener('click', editAction);
            }
            document.querySelector("#btn-modal-close").addEventListener("click", removeEventListener)
            document.querySelector("#btn-cancel").addEventListener("click", removeEditListener);
            document.querySelector("#btn-edit2").addEventListener('click', editAction);
        }
        btnEdit.addEventListener("click", () => edit(user));

        // Proceso para Eliminar Employee
        btnDelete.addEventListener('click', () => delEmployee(btnDelete, user.id));
    });
}

// Proceso para Eliminar Employee
const delEmployee = (btnDelete, userID) => {
    axios.delete(`https://5f7c70d600bd74001690ac5e.mockapi.io/users/${userID}`)
        .then(res => {
            console.log(`Usuario ELMINADO: `, userID)

            // Remover row
            const delElem = btnDelete.closest('tr');
            delElem.classList.add("faded-out");
            setTimeout(() => {
                delElem.remove();
            }, 2000);
        })
        .catch(error => console.error(error));
};

// Abrir modals
const openbox = (modalType) => {
    const modal = document.querySelector('#modal');
    const modalEdit = document.querySelector('#edit-modal');
    const backgroundModal = document.querySelector('.background-modal')

    switch (modalType) {
        case 'addbox':
            backgroundModal.style.display = "block";
            modal.style.top = "0";
            break;
        case 'editbox':
            backgroundModal.style.display = "block";
            modalEdit.style.top = "0";
            break;
    }
}

// Cerrar modals
const closebox = (modalType) => {
    const backgroundModal = document.querySelector('.background-modal');
    const modalAdd = document.querySelector('#modal');
    const modalEdit = document.querySelector('#edit-modal');

    switch (modalType) {
        case 'addbox':
            backgroundModal.style.display = "none";
            modalAdd.style.top = "-1000px";
            break;
        case 'editbox':
            backgroundModal.style.display = "none";
            modalEdit.style.top = "-1000px";
            break;
        case 'cerrarbox':
            backgroundModal.style.display = "none";
            modalAdd.style.top = "-1000px";
            modalEdit.style.top = "-1000px";
            break;
    }

}

// Cerrar al hacer click fuera del modal
window.onclick = (event) => {
    const backgroundModal = document.querySelector('.background-modal');
    const modalAdd = document.querySelector('#modal');
    const modalEdit = document.querySelector('#edit-modal');
    if (event.target === backgroundModal) {
        backgroundModal.style.display = "none";
        modalAdd.style.top = "-1000px";
        modalEdit.style.top = "-1000px";
    }
}


const filter = (users) => {
    const buscador = document.querySelector("#search");

    buscador.addEventListener('keyup', e => {
        const inputFilter = buscador.value.toLowerCase();

        const resultados = users.filter(user => {
            if (
                user.fullname.toLowerCase().includes(inputFilter)
            ) {
                return true;
            } else {
                return false;
            }
        })
        createTable(resultados);
    })
}

// filter(users);