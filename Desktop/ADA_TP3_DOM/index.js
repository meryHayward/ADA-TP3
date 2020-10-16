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

// const getUsers = async () => {
//     try {
//         const res = await axios.get(`https://5f7c70d600bd74001690ac5e.mockapi.io/users`)
//         const users = res.data;
//         console.log(res.data)
//         createTable(users);
//     } catch (err) {
//         console.error(err, `que pasa`);
//     }
// }

const getUsers = () => {
    axios.get("https://5f7c70d600bd74001690ac5e.mockapi.io/users")
        .then(res => {
            const users = res.data;
            // console.log(`no llega aca`, res.data)
            createTable(users);
            search(users);
        })
        .catch(err => alert("Hubo un error"));
}

const createTable = (users) => {
    const tbody = document.querySelector("#table-body");
    // console.log(tbody)

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

const search = (users) => {
    const inputFilter = document.querySelector("#search"); 

    inputFilter.addEventListener('keyup', e => {
        if(e.keyCode === 13){
        const buscador = inputFilter.value.toLowerCase();
        const resultados = users.filter(user => {
            if (
            user.fullname.toLowerCase().indexOf(buscador) > -1 ||
            user.email.toLowerCase().indexOf(buscador) > -1
         ) {
             return true;
         }
         return false;
         });
         console.log('esto me esta dando', resultados)
        }
    })
}

    
    //inputFilter = document.querySelector("#search").value.toLowerCase()
    // inputFilter.addEventListener('keyup', (e) => {
    //     console.log('pepito')
    // })

    // const resultados = datos.filter(item => {
    //     if (
    //         item.nombre.toLowerCase().indexOf(inputador) > -1 ||
    //         String(item.nivel).indexOf(inputador) > -1
    //     ) {
    //         return true;
    //     }
    //     return false;
    // });

/* API */
/* https://5f7c70d600bd74001690ac5e.mockapi.io/users */

//// Ejemplo del filter 
/* const onload = () => {
    const datos = [
        { nombre: "Goku", nivel: 9999 },
        { nombre: "Gohan", nivel: 150000 },
        { nombre: "Vegeta", nivel: 9955 }
    ];
    const buscador = document.querySelector("#buscador");
    buscador.addEventListener("click", () => {
        const inputador = document.querySelector("#inputador").value.toLowerCase();
        if (inputador.length < 3) return;
        const resultados = datos.filter(item => {
            if (
                item.nombre.toLowerCase().indexOf(inputador) > -1 ||
                String(item.nivel).indexOf(inputador) > -1
            ) {
                return true;
            }
            return false;
        });
        const resultador = document.querySelector("#resultador");
        let text = ``;
        for (let res of resultados) {
            text += `${res.nombre} - nivel ${res.nivel}
            `;
        }
        resultador.value = text;
    });
} */