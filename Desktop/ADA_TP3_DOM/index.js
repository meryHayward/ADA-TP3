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


const createTable = (users) => {

    const tbody = document.querySelector("#table-body");

    tbody.innerHTML = ''

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

        tdName.innerText = user.fullname;
        // console.log(`ver que onda`, user.fullname)
        tdEmail.innerText = user.email;
        // console.log(`ver que onda`, user.email)
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
        tdActions.appendChild(btnEdit);
        tdActions.appendChild(btnDelete);
        row.appendChild(tdActions);
        tbody.appendChild(row);

    })
}

const filter = (users) => {
    const buscador = document.querySelector("#search");

    buscador.addEventListener('keyup', e => {
        const inputFilter = buscador.value.toLowerCase();
         
        const resultados = users.filter(user => {
            if(
                user.fullname.toLowerCase().includes(inputFilter)
            ){
                return true;
            }else {
                return false;
            }
        })
        createTable(resultados);
    })
    }

    filter(users);

    