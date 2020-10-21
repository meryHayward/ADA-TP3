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


let users;

const getUsers = async () => {
    await axios.get("https://5f7c70d600bd74001690ac5e.mockapi.io/users")
        .then(res => {
            users = res.data;
            createTable(users);
            search()
        })
        .catch(err => alert("Hubo un error"));
}

// console.log('esto es apiResp', apiResp)

const createTable = (users) => {

    const tbody = document.querySelector("#table-body");

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


const search =  () => {
     getUsers();
    const inputFilter = document.querySelector("#search"); 
    
    inputFilter.addEventListener("keyup", e => {
        const buscador = inputFilter.value.toLowerCase();
        console.log('resultado del buscador', buscador) //funciona buscador
        const resultados = users.filter(user => {
            if(
            user.fullname.toLowerCase().includes(buscador) 
            // ||
            // user.email.toLowerCase().includes(buscador)
         ){
            return true;
         }else {
            return false;
         }
         });
         console.log(resultados);

    })
}

//Ejemplo Codepen:

// const search_input = document.getElementById('search');
// const results = document.getElementById('results');

// let search_term = '';
// let countries;

// const fetchCountries = async () => {
// 	countries = await fetch('https://restcountries.eu/rest/v2/all?fields=name;population;flag').then(
// 		res => res.json()
// 	);
// }

// const showCountries = async () => {
// 	// clearHTML
// 	results.innerHTML = '';
	
// 	// getting the data
// 	await fetchCountries();
	
// 	// creating the structure
// 	const ul = document.createElement("ul");
// 	ul.classList.add('countries');
	
// 	countries.filter(
// 		country => country.name.toLowerCase().includes(search_term.toLowerCase())
// 	).forEach(country => {
// 		const li = document.createElement('li');
// 		const country_flag = document.createElement('img');
// 		const country_name = document.createElement('h3');
// 		const country_info = document.createElement('div');
// 		const country_population = document.createElement('h2');
// 		const country_popupation_text = document.createElement('h5');
		
// 		li.classList.add('country-item');
// 		country_info.classList.add('country-info');
		
// 		country_flag.src = country.flag;
// 		country_flag.classList.add('country-flag');
		
// 		country_name.innerText = country.name;
// 		country_name.classList.add('country-name');
		
// 		country_population.innerText = numberWithCommas(country.population);
// 		country_population.classList.add('country-population');
// 		country_popupation_text.innerText = 'Population';
// 		country_popupation_text.classList.add('country-population-text');
		
// 		country_info.appendChild(country_population);
// 		country_info.appendChild(country_popupation_text);
		
// 		li.appendChild(country_flag);
// 		li.appendChild(country_name);
// 		li.appendChild(country_info);
// 		ul.appendChild(li);
// 	})
// 	results.appendChild(ul);
// }

// // display initial countries
// showCountries();

// search_input.addEventListener('input', (e) => {
// 	search_term = e.target.value;
// 	// re-display countries again based on the new search_term
// 	showCountries();
// });





    //Ejemplo de Fede

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