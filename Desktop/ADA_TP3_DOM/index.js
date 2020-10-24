const load = () => {

    ///// EMPEZAMOS CON TABLA//////
    getUsers();

}

const getUsers = async () => {
    try {
        const res = await axios.get(`https://5f7c70d600bd74001690ac5e.mockapi.io/users/`)
        const users = res.data;
        console.log(res.data)
        createTable(users);
    } catch (err) {
        console.error(err, `que pasa`);
    }
}

const createTable = (users) => {
    const tbody = document.querySelector("#table-body");
    users.forEach(user => {
        const row = document.createElement("tr");
        row.classList.add("table")
        row.setAttribute('id',`tableid${user.id}`);
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
        btnDelete.setAttribute('id', 'btn-delete');

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
        row.appendChild(tdActions);
        tdActions.appendChild(btnEdit);
        tdActions.appendChild(btnDelete);
        tbody.appendChild(row);
        console.log(tbody)

        // Proceso para Eliminar Employee
        const delEmployee = user => {   
            let empID = user.id;
            console.log(empID);
            axios.delete(`https://5f7c70d600bd74001690ac5e.mockapi.io/users/${empID}`)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    // Remover row
                    elem = btnDelete.closest('tr').id;
                    delElem = document.querySelector(`#${elem}`);
                    delElem.remove();
                    //console.log(elem);
                    //console.log(delElem);
                })
        };
        btnDelete.addEventListener('click', () => delEmployee(user));
        // Termina proceso de Eliminar Employee
    });

}



// Abrir y Cerrar Modals
const openbox = (modalType) => {
    //console.log("openbox");
    const modal = document.querySelector('#modal');
    const backgroundModal = document.querySelector('.background-modal')
    
    backgroundModal.style.display = "block";
    modal.style.top = "0";
    modal.style.right = "50";
}

const closebox = (modalType) => {
    const backgroundModal = document.querySelector('.background-modal');
    const modalAdd = document.querySelector('#modal');
    const modalDelete= document.querySelector('#modal-del');
    
    switch(modalType) {
        case 'addbox':
            //console.log("delbox");
            backgroundModal.style.display = "none";
            modalAdd.style.top = "-1000px";
            break;
        case 'delbox':
            //console.log("delbox");
            backgroundModal.style.display = "none";
            modalDelete.style.top = "-1000px";
            break;
        case 'cancelbox':
            //console.log("closebox");
            backgroundModal.style.display = "none";
            modalAdd.style.top = "-1000px";
            modalDelete.style.top = "-1000px";
            break;
    }

}

// Cerrar al hacer click fuera del modal
window.onclick = (event) => {
    const backgroundModal = document.querySelector('.background-modal');
    const modalAdd = document.querySelector('#modal');
    const modalDelete= document.querySelector('#modal-del');
    if (event.target === backgroundModal) {
        backgroundModal.style.display = "none";
        modalAdd.style.top = "-1000px";
        modalDelete.style.top = "-1000px";
    }
}